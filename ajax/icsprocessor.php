<?php 
require '../lib/class.iCalReader.php';

function isAjaxRequest() {
    return !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

if (!isAjaxRequest()) {
	echo 'Ajax requests only';
	die;
}

if (!array_key_exists('text', $_POST)) {
	echo 'Missing parameter : text';
	die;
}

$icsText =  $_POST['text'];
$ics = new ICal(explode("\n", $icsText));
$json = array();
$json['metainfo'] = array(
	'Number of events' => $ics->event_count,
	'Number of recurrent events' => $ics->recurrent_event_count,
	'Number of todos' => $ics->todo_count 
	);
$json['fullCalendar'] = array();
$events = $ics->events();
foreach ($events as $event) {
	$cell = array(title => $event['SUMMARY'], description => $event['DESCRIPTION']);
	if (array_key_exists('DTSTART', $event)) {
        $cell['start'] = convertTimeToFullCalendar($event['DTSTART']);
    }
     if (array_key_exists('DTEND', $event)) {
        $cell['end'] = convertTimeToFullCalendar($event['DTEND']);
    }
    array_push($json['fullCalendar'], $cell);
}

echo json_encode($json);



function convertTimeToFullCalendar($time) {
    return substr($time, 0, 4) . '-' . substr($time, 4, 2) . '-' . substr($time, 6, 5) . ':' . substr($time, 11, 2) . ':' . substr($time, 13, 2); 
}
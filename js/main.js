function parseFromImported() {
	var text = $('#icstext').val();
	$.ajax({
		url : 'ajax/icsprocessor.php',
		data : {text : text},
		method: 'POST',
	}).done(function(msg) {
		var json = JSON.parse(msg);
		$('#full-calendar').fullCalendar('removeEvents');
		$('#full-calendar').fullCalendar('addEventSource', json.fullCalendar);
		updateInfoPanel(json.metainfo);
	});
}

function updateInfoPanel(infoArray) {
	var infoTable = $('#infoPanel').empty().append('<table></table>').find('table');
	$.each(infoArray, function(index, value) {
		infoTable.append("<tr><td class=\"key\">" + index + "</td><td class=\"value\">" + value + "</td><tr>");
	});
}

$(document).ready(function() {
	var cal = new CalHeatMap();
	cal.init({
		start: new Date(2015, 0),
		domain: "month",
		subDomain: "day",
		data : "heatmap-data.json",
		dataType: "json",
		domainLabelFormat: "%m-%Y"											
	});
	$('#prev').click(function() {
		cal.previous();
	});
	$('#current').click(function() {
		cal.rewind();
	});
	$('#next').click(function() {
		cal.next();
	});
	
	$('#full-calendar').fullCalendar({
	    header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		events : fullCalendarData,
		eventRender : function(event, element) {
			element.qtip({
				content : (event.description ? event.description : event.title)
			});
		},
	    aspectRatio : 2
    });

	$('#parseBtn').click(function(e) {
		e.preventDefault();
		$('#importPanel').toggleClass('hidden');
		return false;
	});
});
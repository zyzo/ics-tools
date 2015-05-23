function parseFromImported() {
	var text = $('#icstext').val();
	console.log(text);
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
			right: 'year,month,agendaWeek,agendaDay'
		},
		events : fullCalendarData,
		eventRender : function(event, element) {
			element.qtip({
				content : event.description
			});
		},
	    height : 500,
	    aspectRatio : 3
    });

	$('#parseBtn').click(function(e) {
		e.preventDefault();
		$('#importPanel').toggleClass('hidden');
		return false;
	});
});
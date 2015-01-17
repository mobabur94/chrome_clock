//http://www.elated.com/articles/creating-a-javascript-clock/
function update(){
	var now = new Date();
	var hours = now.getHours();
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();
	minutes = ((minutes < 10) ? "0" : "") + minutes;
	seconds = ((seconds < 10) ? "0" : "") + seconds;
	var ampm = (hours < 12) ? "AM" : "PM";
	hours = (hours > 12) ? hours - 12 : hours;
	hours = (hours == 0) ? 12 : hours;
	var time = hours + ":" + minutes + ":" + seconds + " " + ampm;
	$("#clock").text(time);
}

function size(){
	$('#clock').css("line-height", $(window).height() + "px");
	$('#clock').css("font-size", 0.25*(Math.min($(window).height(), $(window).width())) + "px");
}

$(document).ready(function(){
	size();
	update();
	setInterval(update, 1000);
});

$(window).resize(function(){
	size();
});
function open() {
	chrome.tabs.create({
		"url": "/clock.html"
	});
};

function message(msg, color) {
	var status = $("#status");
	status.css("color", color);
	status.text(msg);
	setTimeout(function() {
		status.text("");
		status.css("color", "inherit");
	}, 750);
};

function save() {
	var items = {
		"analog": $("#analog").prop("checked"),
		"military": $("#military").prop("checked"),
		"size": $("#size").prop("value"),
		"accent": $("#accent").prop("value"),
		"foreground": $("#foreground").prop("value"),
		"background": $("#background").prop("value"),
		"font": $("#font").prop("value")
	};
	chrome.storage.sync.set(items, function() {
		message("Options Saved!", "green");
	});
};

function load() {
	chrome.storage.sync.get({
		"analog": false,
		"military": false,
		"size": 144,
		"accent": "#ff0000",
		"foreground": "#d6d6d6",
		"background": "#282828",
		"font": "sans-serif"
	}, function(items) {
		$("#analog")[0].checked = items["analog"];
		$("#military")[0].checked = items["military"];
		$("#size").val(items["size"]);
		$("#accent").val(items["accent"]);
		$("#foreground").val(items["foreground"]);
		$("#background").val(items["background"]);
		$("#font").val(items["font"]);
	});
};

$(document).ready(function() {
	load();
	$("#save").on("click", save);
	$("#open").on("click", open);
});

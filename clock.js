function rotate(element, angle, origin) {
	element.attr("transform", "rotate(" + angle + " " + origin + ")");
};

function update() {
	chrome.storage.sync.get({
		"analog": false,
		"military": false,
		"size": 144,
		"accent": "#ff0000",
		"foreground": "#d6d6d6",
		"background": "#282828",
		"font": "sans-serif"
	}, function(config) {
		var body = $("body");
		var digital = $("#digital-container");
		var analog = $("#analog-container");
		var now = new Date();
		var hours = now.getHours();
		var minutes = now.getMinutes();
		var seconds = now.getSeconds();
		if (config["analog"]) {
			digital.css("display", "none");
			analog.css("display", "block");
			analog.find("#second, #little-dot").css("fill", config["accent"]);
			analog.find("#bezel, #big-dot, #hour, #minute, .tick").css("fill", config["foreground"]);
			analog.find("#face").css("fill", config["background"]);
			rotate(analog.find("#second"), 6 * seconds, "600 600");
			rotate(analog.find("#minute"), 6 * minutes, "600 600");
			rotate(analog.find("#hour"), (30 * (hours % 12)) + ((1 / 2) * minutes), "600 600");1
		} else {
			digital.css("display", "flex");
			analog.css("display", "none");
			var suffix = "";
			minutes = ((minutes < 10) ? "0" : "") + minutes;
			seconds = ((seconds < 10) ? "0" : "") + seconds;
			if (config["military"]) {
				hours = ((hours < 10) ? "0" : "") + hours;
			} else {
				suffix = "AM";
				if (hours > 12) {
					suffix = "PM";
					hours -= 12;
				};
			};
			digital.find("#digital").text(hours + ":" + minutes + ":" + seconds + " " + suffix);
		};
		body.css({
			"min-width": config["size"] + "px",
			"min-height": ((config["analog"]) ? 1 : 2 / 3) * config["size"] + "px",
			"color": config["foreground"],
			"background": config["background"],
			"font-family": config["font"]
		});
	});
};

$(document).ready(function() {
	update();
	setInterval(update, 1000);
});

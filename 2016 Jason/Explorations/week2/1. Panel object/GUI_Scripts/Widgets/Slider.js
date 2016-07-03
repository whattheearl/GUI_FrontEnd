function Slider(sliderID, style) {
	GuiContentWidget.call(this, sliderID, style);
}

gGuiBase.Core.inheritPrototype(Slider, GuiContentWidget);

Slider.prototype.initializeWidget = function () {
	this.setHTML();
};

Slider.prototype.setHTML = function() {
	if (this.style !== GuiContentWidget.NO_STYLE) {
		this.htmlSnippet = '<div id="' + this.widgetID + '" ' + this.style + '></div>';
	} else {
		this.htmlSnippet = '<div id="' + this.widgetID + '"></div>';
	}
};

Slider.prototype.setOnSliderChange = function (onSliderChangeFunction) {
	$(this.getID()).slider({
		orientation: "horizontal",
		slide: function(event, ui) {
			onSliderChangeFunction(ui.value);
		},
		change:  function(event, ui) {
			onSliderChangeFunction(ui.value);
		}
	});
};
/*-----------------------------------------------------------------------------
//	File input button originally intended for getting images from the user
//	Author: Jason Herold/Thoof
-----------------------------------------------------------------------------*/
function FileInputButton(buttonID, style, buttonName) {
	this.buttonName = buttonName;

	GuiContentWidget.call(this, buttonID, style);
}

gGuiBase.View.inheritPrototype(FileInputButton, GuiContentWidget);

FileInputButton.prototype.initializeWidget = function () {
	/*if (this.style !== GuiContentWidget.NO_STYLE) {
		this.htmlSnippet += '<button id="' + this.widgetID + '" ' + this.style + '>' + this.buttonName + '</button>';
	} else {
		this.htmlSnippet += '<button id="' + this.widgetID + '">' + this.buttonName + '</button>';
	}*/
	

	this.htmlSnippet += '<div><input type="file" id="' + this.widgetID + '" name="files[]"/></div>'

};


//Set jquery ui button click function
FileInputButton.prototype.setOnFileSelect = function (fileSelectFunction) {
	$(this.getID()).change(function() {
		fileSelectFunction();
    });
};

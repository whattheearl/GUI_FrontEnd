/**
 * Created by MetaBlue on 6/26/16.
 */
$( document ).ready(function() {

	//Create bottom panel and tabs
	var panelID = "#panelBottom";
    var bottomPanel = new GuiPanel(panelID, GuiPanelType.BOTTOM);

	var scenesTab = new GuiPanelTab("Scenes");
	bottomPanel.addTab(scenesTab);
	
	var camerasTab = new GuiPanelTab("Cameras");
	bottomPanel.addTab(camerasTab);
	
	var instancesTab = new GuiPanelTab("Instances");
	bottomPanel.addTab(instancesTab);
	
	//Create left panel and tabs
    panelID = "#panelLeft";
    var leftPanel = new GuiPanel(panelID, GuiPanelType.LEFT);
	
	var objectsTab = new GuiPanelTab("Objects");
	var objectsTabContent = new ObjectContent("objectsContent");
	leftPanel.addTab(objectsTab);
	objectsTab.addContent(objectsTabContent);
	
	var texturesTab = new GuiPanelTab("Textures");
	leftPanel.addTab(texturesTab);
	
	//Create right panel and tabs
    panelID = "#panelRight";
    var rightPanel = new GuiPanel(panelID, GuiPanelType.RIGHT);
	
	var detailsTab = new GuiPanelTab("Details");
	rightPanel.addTab(detailsTab);
	
	gGuiBase.Core.addPanel(bottomPanel);
	gGuiBase.Core.addPanel(leftPanel);
	gGuiBase.Core.addPanel(rightPanel);
});
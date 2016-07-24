/**
 * Created by MetaBlue on 7/18/16.
 */
//  Supports the addition of gameObjects
var gGuiBase = gGuiBase || { }; //Create the singleton if it hasn't already been created

gGuiBase.TextureSupport = (function() {
    
    var gAllTextures = {};
	var gImageMap = {};
	
    // adds texture to panel
    var addTexture = function ( texName ) {
        // if added already return
        if(gAllTextures[texName] || texName == "") return;
        gAllTextures[texName] = true;
        console.log('currentscene:', gGuiBase.SceneSupport.gCurrentScene);
        loadTexturesToScene();
        // refresh texturelist in view
        var texList = gGuiBase.TextureSupport.getTexList();
		
		var imageList = gGuiBase.TextureSupport.getImageList();
        //gGuiBase.View.findWidgetByID("#texSelectList1").rebuildWithArray( texList );
		gGuiBase.View.findWidgetByID("#TextureSelectList").rebuildWithArray( imageList );
        gGuiBase.View.refreshAllTabContent();  // refresh panel
    };
	
	var addTextureToImageMap = function(texName, img) {
		gImageMap[texName] = img;
	};
	
	var getImage = function(texName) {
		return gImageMap[texName];
	};
	
	

    // loads the texture into the engine via the scene
    var loadTexturesToScene = function () {
        // add texture to scene
        gEngine.GameLoop.stop();
        gEngine.View.startScene(gGuiBase.SceneSupport.gCurrentScene);
        gGuiBase.Core.reinitializeCameraTab();
        //update the gui
    };

    // texture must be already added to texture support!
    var addTextureToGameObject = function(gameObjectName, textureName) {
        // create texture
        var newTex = new TextureRenderable(textureName);
        // get object
        var gameObject = gGuiBase.ObjectSupport.getGameObjectByID(gameObjectName);
        this.setRenderableForGameObject(gameObject, newTex);
        this.setRenderableForAllInstancesOfObject(gameObjectName, textureName);
    };

    var removeTextureFromGameObject = function(gameObjectName) {
        //todo: set colors to old colors
        var rend = new Renderable();
        // get object
        var gameObject = gGuiBase.ObjectSupport.getGameObjectByID(gameObjectName);
        // copy transform from object to new texture
        this.setRenderableForGameObject(gameObject, rend);
        this.setRenderableForAllInstancesOfObject(gameObjectName, "None");

    };

    var setRenderableForGameObject = function (gameObject, newRenderable) {
        var newTextureTransform = newRenderable.getXform();
        var gameObjectTransform = gameObject.getXform();
        //console.log(gameObject);
        gGuiBase.ObjectSupport.copyTransformOnTransforms(newTextureTransform, gameObjectTransform);
        gameObject.setRenderable(newRenderable);
        //console.log(gameObject);
    };

    // replaces all instances of gameObjects renderable with the texture named textureName (None = no texture);
    //todo does not replace old color right now
    var setRenderableForAllInstancesOfObject = function (gameObjectName, textureName) {
        var instanceNames = gGuiBase.InstanceSupport.getInstanceList();
        for (var i in instanceNames) {
            var instanceName = instanceNames[i];
            // get the instance so you can manipulate it
            var inst = gGuiBase.InstanceSupport.getInstanceByID(instanceName);
            if (inst.mName == gameObjectName) {
                // assign appropriate renderable
                var rend;
                if (textureName == "None") {
                    rend = new Renderable();
                } else {
                    rend = new TextureRenderable(textureName);
                }
                this.setRenderableForGameObject(inst, rend);
            }
        }
    } ;

    // adds new gameobject to scene and to the GUI with texture texName
    var addTextureObject = function (textName) {
        // create texture object
        var textObjName = gGuiBase.ObjectSupport.createDefaultTextObject(textName);
        // add it to scene
        var textObj = gGuiBase.ObjectSupport.getGameObjectByID(textObjName);

        gGuiBase.Core.updateObjectSelectList();
        gGuiBase.View.refreshAllTabContent();  // refresh panel
    };

    
    var removeTexture = function ( texName ) {
        delete gAllTextures[texName];
    };

    var getTexList = function () {
        var texList = [];
        for (var texName in gAllTextures) {
            texList.push(texName);
        }
        return texList;
    };
	
	var getImageList = function() {
		var imageList = [];
		for (var imageName in gImageMap) {
			if (gAllTextures[imageName] !== undefined)
				imageList.push(gImageMap[imageName].src);
		}
		return imageList;
	};
	
	var getImageName = function(imageSrc) {
		for (var imageName in gImageMap) {
			if (imageSrc === gImageMap[imageName].src)
				return imageName;
		}
		return "None";
	}


    var mPublic = {
        gAllTextures: gAllTextures,
		addTextureToImageMap: addTextureToImageMap,
		getImage: getImage,
		getImageList: getImageList,
		getImageName: getImageName,
        addTextureToGameObject: addTextureToGameObject,
        removeTextureFromGameObject: removeTextureFromGameObject,
        setRenderableForGameObject: setRenderableForGameObject,
        setRenderableForAllInstancesOfObject: setRenderableForAllInstancesOfObject,
        addTextureObject: addTextureObject,
        addTexture: addTexture,
        loadTexturesToScene: loadTexturesToScene,
        removeTexture: removeTexture,
        getTexList: getTexList,
    };
    return mPublic;
}());
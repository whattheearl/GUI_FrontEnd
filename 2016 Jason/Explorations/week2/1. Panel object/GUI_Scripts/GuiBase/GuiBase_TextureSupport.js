/**
 * Created by MetaBlue on 7/18/16.
 */
//  Supports the addition of gameObjects
var gGuiBase = gGuiBase || { }; //Create the singleton if it hasn't already been created

gGuiBase.TextureSupport = (function() {
    
    var gAllTextures = {};

    // adds texture to panel
    var addTexture = function ( texName ) {
        gAllTextures[texName] = true;
        loadTexturesToScene();
        var texList = gGuiBase.TextureSupport.getTexList();
        gGuiBase.View.findWidgetByID("#texSelectList1").rebuildWithArray( texList );
        gGuiBase.View.refreshAllTabContent();  // refresh panel
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
    var addTextureToGameObject = function(GameObjectName, textureName) {
        // create texture
        var newTextureRenderable = new TextureRenderable(textureName);
        // get object
        var gameObject = gGuiBase.ObjectSupport.getGameObjectByID(GameObjectName);
        // copy transform from object to new texture
        var newTextureTransform = newTextureRenderable.getXform();
        var gameObjectTransform = gameObject.getXform();
        gameObjectTransform.cloneTo(newTextureTransform);
        // gGuiBase.ObjectSupport.copyTransform(newTextureTransform, gameObjectTransform);

        var gameObjectRenderable = gameObject.getRenderable();
        gameObjectRenderable = newTextureRenderable;
    };

    // adds gameobject with texture to gameobject panel
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

    var mPublic = {
        gAllTextures: gAllTextures,
        addTextureToGameObject: addTextureToGameObject,
        addTextureObject: addTextureObject,
        addTexture: addTexture,
        loadTexturesToScene: loadTexturesToScene,
        removeTexture: removeTexture,
        getTexList: getTexList
    };
    return mPublic;
}());
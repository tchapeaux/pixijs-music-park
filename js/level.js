"use strict";

var Level = function(jsonfile) {
    this.ready = false;
    this.container = new PIXI.Container();
    var level = this;  // make it accessible in scope
    $.getJSON(jsonfile, "", function(data) {
        level.ready = true;
        level.json = data;
        console.log("Loaded", level.json);

        var bgTexture = new PIXI.Sprite.fromImage(level.json.map.image);
        bgTexture.position.x = 0;
        bgTexture.position.y = 0;
        level.container.addChild(bgTexture);

        var area = level.json.map.area;
        /*
        // Uncomment below for debug display
        level.ground = new PIXI.Graphics();
        level.ground.beginFill(0xFFFFFF);
        // level.ground.drawRect(area.x, area.y, area.w, area.h);
        level.ground.drawRect(0, 0, wScr, hScr);
        var nogozones = level.json.map.nogo;
        level.ground.beginFill(0x0);
        for (var i = nogozones.length - 1; i >= 0; i--) {
            var zone = nogozones[i]
            level.ground.drawRect(zone.x, zone.y, zone.w, zone.h);
        }
        level.container.addChild(level.ground);
        */
    });
}

Level.prototype.intersects = function(x, y) {
    // body...
};

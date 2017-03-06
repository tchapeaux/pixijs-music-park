"use strict";

var Level = function(jsonfile) {
    this.ready = false;
    this.container = new PIXI.Container();
    this.crowdLevel = 1;
    
    var level = this;  // make 'this' accessible in scope
    $.getJSON(jsonfile, "", function(data) {
        level.ready = true;
        level.json = data;
        console.log("Loaded", level.json);

        var bgTexture = new PIXI.Sprite.fromImage(level.json.map.image);
        bgTexture.zIndex = 0;
        bgTexture.position.x = 0;
        bgTexture.position.y = 0;
        level.container.addChild(bgTexture);

        level.teleports = level.json.map.teleports;
        level.crowdLevel = level.json.map.crowd_level;
        
        var area = level.json.map.area;

        level.area = new PIXI.Rectangle(area.x, area.y, area.w, area.h);
        // Uncomment below for debug display
        level.ground = new PIXI.Graphics();
        level.ground.beginFill(0xFFFFFF, 0.5);
        level.ground.drawRect(area.x, area.y, area.w, area.h);
        var nogozones = level.json.map.nogo;
        level.ground.beginFill(0x0, 0.5);
        for (var i = nogozones.length - 1; i >= 0; i--) {
            var zone = nogozones[i];
            level.ground.drawRect(zone.x, zone.y, zone.w, zone.h);
        }
        var greenzones = level.json.map.greenareas;
        level.ground.beginFill(0x00FF00, 0.5);
        for (var j = greenzones.length - 1; j >= 0; j--) {
            var green = greenzones[j];
            level.ground.drawRect(green.x, green.y, green.w, green.h);
        }
        var teleports = level.teleports;
        level.ground.beginFill(0x0000FF, 0.5);
        for (var k = teleports.length - 1; k >= 0; k--) {
            var tel = teleports[k];
            level.ground.drawRect(tel.x, tel.y, tel.w, tel.h);
        }
        level.container.addChild(level.ground);
    });
}

Level.prototype.is_valid_position = function(x, y, w, h) {
    var posRect = {'x': x, 'y': y, 'w': w, 'h': h};
    var areaRect = this.json.map.area;
    // check position is in area
    if (!containsRectangle(areaRect, posRect)) {
        // console.log("Invalid position: not in area");
        return false;
    }
    // check against obstacles
    for (var i = this.json.map.nogo.length - 1; i >= 0; i--) {
        var nogozone = this.json.map.nogo[i];
        if (intersectRectangles(posRect, nogozone)) {
            // console.log("Invalid position: intersects an obstacle");
            return false;
        }
    }
    // Otherwise, position is valid
    return true;
};

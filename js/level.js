"use strict";

var Level = function(jsonfile) {
    this.ready = false;
    this.container = new PIXI.Container();

    var level = this;  // make 'this' accessible in scope
    $.getJSON(jsonfile, "", function(data) {
        level.ready = true;
        level.json = data;
        console.log("Loaded", level.json);

        var bgTexture = new PIXI.Sprite.fromImage(level.json.map.image);
        bgTexture.position.x = 0;
        bgTexture.position.y = 0;
        level.container.addChild(bgTexture);

        level.teleports = level.json.map.teleports;

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
            console.log("That is one greenarea", green);
            level.ground.drawRect(green.x, green.y, green.w, green.h);
        }
        var teleports = level.teleports;
        level.ground.beginFill(0x0000FF, 0.5);
        for (var k = teleports.length - 1; k >= 0; k--) {
            var tel = teleports[k];
            console.log("That is one teleporter", tel);
            level.ground.drawRect(tel.x, tel.y, tel.w, tel.h);
        }
        level.container.addChild(level.ground);
    });
}

Level.prototype.intersects = function(x, y, w, h) {
    // body...

};

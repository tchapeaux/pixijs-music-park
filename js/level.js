"use strict";

var Level = function (jsonfile) {
    this.ready = false;
    this.container = new PIXI.Container();
    this.crowdLevel = 1;

    var level = this;  // make 'this' accessible in scope
    $.getJSON(jsonfile, "", function (data) {
        level.ready = true;
        level.json = data;
        console.log("Loaded", level.json);

        var bgTexture = new PIXI.Sprite.fromImage("resources/map/" + level.json.tilesets[0].image);
        bgTexture.zIndex = 0;
        bgTexture.position.x = 0;
        bgTexture.position.y = 0;
        level.container.addChild(bgTexture);

        level.teleports = new Array();
        level.nogo = new Array();
        level.greenareas = new Array();
        level.walking_paths = new Array();
        for (var i = 0; i < level.json.layers.length; i++) {
            var layer = level.json.layers[i];
            if (layer.name == "teleport") {
                for (var j = 0; j < layer.objects.length; j++) {
                    var obj = layer.objects[j];
                    level.teleports.push({ "x": obj.x, "y": obj.y, "width": obj.width, "height": obj.height, "to_map": obj.properties.to_map, "to_x": obj.properties.to_x, "to_y": obj.properties.to_y });
                }
            } else if (layer.name == "area") {
                for (var j = 0; j < layer.objects.length; j++) {
                    var area = layer.objects[j];
                    level.area = new PIXI.Rectangle(area.x, area.y, area.width, area.height);

                    // Uncomment below for debug display
                    level.ground = new PIXI.Graphics();
                    level.ground.beginFill(0xFFFFFF, 0.5);
                    level.ground.drawRect(area.x, area.y, area.width, area.height);
                }
            } else if (layer.name == "nogo") {
                for (var j = 0; j < layer.objects.length; j++) {
                    var obj = layer.objects[j];
                    level.nogo.push({ "x": obj.x, "y": obj.y, "width": obj.width, "height": obj.height });
                }
            } else if (layer.name == "greenarea") {
                for (var j = 0; j < layer.objects.length; j++) {
                    var obj = layer.objects[j];
                    level.greenareas.push({ "x": obj.x, "y": obj.y, "width": obj.width, "height": obj.height });
                }
            } else if (layer.name == "path") {
                for (var j = 0; j < layer.objects.length; j++) {
                    var obj = layer.objects[j];
                    level.walking_paths.push({ "start_x": obj.x, "start_y": obj.y, "points": obj.polyline, "personality": obj.properties !== undefined && obj.properties.personality !== undefined ? obj.properties.personality : "any" });
                }
            }
        }

        level.crowdLevel = level.json.properties.crowd_level;

        // Uncomment below for debug display
        level.ground = new PIXI.Graphics();
        level.ground.beginFill(0xFFFFFF, 0.5);
        level.ground.drawRect(level.area.x, level.area.y, level.area.width, level.area.height);

        var nogozones = level.nogo;
        level.ground.beginFill(0x0, 0.5);
        for (var i = nogozones.length - 1; i >= 0; i--) {
            var zone = nogozones[i];
            level.ground.drawRect(zone.x, zone.y, zone.width, zone.height);
        }
        var greenzones = level.greenareas;
        level.ground.beginFill(0x00FF00, 0.5);
        for (var j = greenzones.length - 1; j >= 0; j--) {
            var green = greenzones[j];
            level.ground.drawRect(green.x, green.y, green.width, green.height);
        }
        var teleports = level.teleports;
        level.ground.beginFill(0x0000FF, 0.5);
        for (var k = teleports.length - 1; k >= 0; k--) {
            var tel = teleports[k];
            level.ground.drawRect(tel.x, tel.y, tel.width, tel.height);
        }
        level.container.addChild(level.ground);
    });
}

Level.prototype.is_valid_position = function (x, y, w, h) {
    var posRect = new PIXI.Rectangle(x, y, w, h);
    var areaRect = this.area;
    // check position is in area
    if (!containsRectangle(areaRect, posRect)) {
        //console.log("Invalid position: not in area");
        return false;
    }
    // check against obstacles
    for (var i = this.nogo.length - 1; i >= 0; i--) {
        var nogozone = this.nogo[i];
        if (intersectRectangles(posRect, nogozone)) {
            // console.log("Invalid position: intersects an obstacle");
            return false;
        }
    }
    // Otherwise, position is valid
    return true;
};

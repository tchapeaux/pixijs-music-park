function Game() {
    this.level = new Level("resources/map/map1.json");

    stage.addChild(this.level.container);

    this.player = new PIXI.Sprite.fromImage("resources/djembeman.png");
    this.player.position.x = 10;
    this.player.position.y = hScr / 4 + 256 + 10;
    this.player.scale = new PIXI.Point(0.5, 0.5);
    stage.addChild(this.player);
}

Game.prototype.update = function(ds) {
    // get keycode from http://keycode.info/
    var direction_x = 0;
    var direction_y = 0;
    if (keysPressed.has(37) /* LEFT ARROW */) {
        direction_x = -1;
    } else if (keysPressed.has(39) /* RIGHT ARROW*/) {
        direction_x = 1;
    }
    if (keysPressed.has(38) /* UP ARROW*/) {
        direction_y -= 1;
    } else if (keysPressed.has(40) /* DOWN ARROW*/) {
        direction_y += 1;
    }
    this.player.position.x += 100 * direction_x * ds;
    this.player.position.y += 100 * direction_y * ds;


}

function Game() {
    var farTexture = PIXI.Texture.fromImage("resources/bg-far-2.png");
    this.far = new PIXI.extras.TilingSprite(farTexture, wScr, 256);
    this.far.position.x = 0;
    this.far.position.y = 0;
    this.far.tilePosition.x = 0;
    this.far.tilePosition.y = 0;
    stage.addChild(this.far);

    var midTexture = PIXI.Texture.fromImage("resources/bg-mid-2.png");
    this.mid = new PIXI.extras.TilingSprite(midTexture, wScr, 256);
    this.mid.position.x = 0;
    this.mid.position.y = hScr / 4;
    this.mid.tilePosition.x = 0;
    this.mid.tilePosition.y = 0;
    stage.addChild(this.mid);

    this.ground = new PIXI.Graphics();
    this.ground.beginFill(0xFFFFFF);
    this.ground.drawRect(0, hScr / 4 + 256, wScr, hScr);
    stage.addChild(this.ground);

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
    this.far.tilePosition.x -= 0.128 * direction_x * ds;
    this.mid.tilePosition.x -= 0.64 * direction_x * ds;

    this.player.position.x += 100 * direction_x * ds;
    this.player.position.y += 100 * direction_y * ds;


}

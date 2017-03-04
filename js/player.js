var Player = function() {
    Entity.call(this);
    this.name = "Player";
    this.sprite = new PIXI.Sprite.fromImage("resources/djembeman.png");
    this.hitbox = new PIXI.Rectangle(0, 0, 10, 10);
    this.sprite.scale = new PIXI.Point(0.5, 0.5);
}

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.computemoves = function(ds) {
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
    this.velocity.x = this.base_speed * direction_x * ds;
    this.velocity.y = this.base_speed * direction_y * ds;

    // todo : put that in a general entity function that deals with level collisions too
    this.set_position(this.position.x + this.velocity.x, this.position.y + this.velocity.y);
}

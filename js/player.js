"use strict";

var player_play_states = ["idle", "playing"];
var player_walk_states = ["idle", "walking"];

var Player = function() {
    Entity.call(this);
    this.name = "Player";
    this.play_state = "idle";
    this.walk_state = "idle";
    this.sprite_idle = new PIXI.Sprite.fromImage("resources/djembeman.png");
    this.sprite_playing = new PIXI.Sprite.fromImage("resources/djembeman_playing.png");
    this.sprite = this.sprite_idle;
    this.hitbox = new PIXI.Rectangle(15, 35, 25, 10);
    this.sprite.scale = new PIXI.Point(0.5, 0.5);
}

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.togglePlayState = function() {
    game.remove_entity(this);
    this.play_state = (this.play_state == "idle") ? "playing" : "idle";
    this.sprite = (this.play_state == "idle") ? this.sprite_idle : this.sprite_playing;
    game.add_entity(this);
};

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
    if (keysPressed.has(83 /* S */)) {
        this.base_speed = 500;
    }
    else {
        this.base_speed = 100;
    }

    this.velocity.x = this.base_speed * direction_x * ds;
    this.velocity.y = this.base_speed * direction_y * ds;
}

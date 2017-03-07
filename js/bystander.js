"use strict";

var personalities = ["none", "shy", "straight", "lost"];
var personalities_proportion = [40, 10, 35, 5];
var personalities_proportioned_tab = [];

// get a random personality according from the proportioned/probability tab
function getBystanderPersonality() {
    if (personalities_proportioned_tab.length == 0) {
        for (var i = 0; i < personalities.length; i++) {
            var curr_pers = personalities[i];
            var curr_prop = personalities_proportion[i];
            for (var j = 0; j < curr_prop; j++) {
                personalities_proportioned_tab.push(curr_pers);
            }
        }
    }
    return personalities_proportioned_tab[Math.floor(Math.random() * personalities_proportioned_tab.length)];
}

function Bystander(start_x, start_y, personality, path, starting_point) {
    Entity.call(this);
    this.ghost = true;
    this.sprite = new PIXI.Sprite.fromImage("resources/bystander.png");
    this.hitbox = new PIXI.Rectangle(15, 35, 25, 10);
    this.sprite.scale = new PIXI.Point(0.5, 0.5);

    this.personality = personality;

    this.satisfaction = 0;
    this.min_satisfaction = 100; // minimum statisfaction level to stop being such a cry baby
    this.listening_to_music = false;

    this.base_speed = 30 + (Math.random()) * 40;

    this.set_position(start_x, start_y);

    if(path != null)
    {
        this.behavior = new BystanderFollowPathStrategy(this, path, starting_point);
    }else{
        this.behavior = new BystanderRandomWalkingStrategy(this);
    }
}

Bystander.prototype = Object.create(Entity.prototype);
Bystander.prototype.constructor = Bystander;

Bystander.prototype.computemoves = function(ds) {
    this.behavior.compute(ds);
}

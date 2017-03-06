"use strict";

function Bystander(start_x, start_y, path, starting_point) {
    Entity.call(this);
    this.ghost = true;
    this.sprite = new PIXI.Sprite.fromImage("resources/bystander.png");
    this.hitbox = new PIXI.Rectangle(15, 35, 25, 10);
    this.sprite.scale = new PIXI.Point(0.5, 0.5);
    
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

var Teleport = function(x, y, w, h, jsonpath) {
    Entity.call(this);
    this.hitbox = new PIXI.Rectangle(0, 0, w, h);
    this.jsonpath = jsonpath
    this.set_position(x, y);
}

Teleport.prototype = Object.create(Entity.prototype);
Teleport.prototype.constructor = Teleport;

// action to take if one entity collides with another
Teleport.prototype.collision_action = function(entity) {
    if(entity === game.player)
    {
        console.log("Loading map", this.jsonpath);
        game.loadmap(this.jsonpath);
    }
}

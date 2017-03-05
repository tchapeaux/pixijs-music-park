var Teleport = function(x, y, w, h, jsonpath, to_x, to_y) {
    Entity.call(this);
    this.hitbox = new PIXI.Rectangle(0, 0, w, h);
    this.jsonpath = jsonpath
    this.ghost = true;
    this.to_x = to_x;
    this.to_y = to_y;
    this.set_position(x, y);
}

Teleport.prototype = Object.create(Entity.prototype);
Teleport.prototype.constructor = Teleport;

// action to take if one entity collides with another
Teleport.prototype.collision_action = function(entity) {
    if(entity === game.player)
    {
        // Mark Teleporter as activated
        game.nextteleport = this;
    }
}

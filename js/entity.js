"use strict";

var Entity = function() {
    this.sprite = null;
    this.position = new PIXI.Point(0, 0);
    this.velocity = new PIXI.Point(0, 0);
    this.hitbox = new PIXI.Rectangle(0, 0, 1, 1);
    this.base_speed = 100;
    this.should_delete = false;
    this.ghost = false;
}

Entity.prototype.set_position = function(x, y){
    var is_valid_pos = this.would_fit(x, y);
    if (!is_valid_pos) {
        // todo : not just cancel move but check what position would fit given actual position and velocity
        return;  // cancel move
    }
    this.position.x = x;
    this.position.y = y;
    if(this.sprite != null){
        this.sprite.position.x = x;
        this.sprite.position.y = y;
        this.sprite.zIndex = this.getZIndex();
    }
}

Entity.prototype.set_center = function(x, y){
    this.set_position(x - this.hitbox.left - this.hitbox.width / 2, y - this.hitbox.top - this.hitbox.height / 2);
}

// just to know if the valid position is okay for this entity
Entity.prototype.would_fit = function(x, y){
    var hb = this.hitbox;
    return this.ghost === true || game.level.is_valid_position(
        x + hb.left,
        y + hb.top,
        hb.width,
        hb.height
    );
}

Entity.prototype.update = function(ds) {
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.computemoves(ds);
    this.set_position(this.position.x + this.velocity.x, this.position.y + this.velocity.y);
}

// update position of entity
Entity.prototype.computemoves = function(ds) {
    // default: do nothing
}

Entity.prototype.getCenter = function() {
    return new PIXI.Point(this.position.x + this.hitbox.left + this.hitbox.width / 2, this.position.y + this.hitbox.top + this.hitbox.height / 2);
}

// move entity to given position in a straight line (might not be able to)
Entity.prototype.move_to = function(gotopoint, ds) {
    var center = this.getCenter();
    //~ console.log(center);
    //~ console.log(gotopoint);
    var l = getDistanceBetween(center, gotopoint);
    var newvec = new PIXI.Point(gotopoint.x - center.x, gotopoint.y - center.y);
    var norm = normalizeVector(newvec, l);
    if (this.base_speed * ds > l)
    {
        this.velocity.x = gotopoint.x - center.x;
        this.velocity.y = gotopoint.y - center.y;
    }
    else
    {
        this.velocity.x = norm.x * this.base_speed * ds;
        this.velocity.y = norm.y * this.base_speed * ds;
    }

    //~ console.log(this.velocity);
}

// check if current entity collides with another
Entity.prototype.collide_with = function(ent) {
    if (ent == this) {
        console.log("WARNING - entity checked for collision against itself")
        return false;
    }

    // basic rectangle collision between both hitboxes
    var hitboxThis = {
        'x': this.position.x + this.hitbox.left,
        'y': this.position.y + this.hitbox.top,
        'width': this.hitbox.width,
        'height': this.hitbox.height
    };
    var hitboxEnt = {
        'x': ent.position.x + ent.hitbox.left,
        'y': ent.position.y + ent.hitbox.top,
        'width': ent.hitbox.width,
        'height': ent.hitbox.height
    };
    return intersectRectangles(hitboxThis, hitboxEnt);
}

// action to take if one entity collides with another
Entity.prototype.collision_action = function(entity) {
    // default: do nothing (to be re-implemented by subclasses)
}

Entity.prototype.getZIndex = function() {
    return this.position.y + this.hitbox.top + this.hitbox.height;
}

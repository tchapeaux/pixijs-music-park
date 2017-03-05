var Entity = function() {
    this.sprite = null;
    this.position = new PIXI.Point(0, 0);
    this.velocity = new PIXI.Point(0, 0);
    this.hitbox = new PIXI.Rectangle(0, 0, 1, 1);
    this.base_speed = 100;
    this.should_delete = false;
}

Entity.prototype.set_position = function(x, y){
    var hb = this.hitbox;
    var is_valid_pos = game.level.is_valid_position(
        x + hb.left,
        y + hb.top,
        hb.width,
        hb.height
    );
    if (!is_valid_pos) {
        return;  // cancel move
    }
    this.position.x = x;
    this.position.y = y;
    if(this.sprite != null){
        this.sprite.position.x = x;
        this.sprite.position.y = y;
    }
}

Entity.prototype.update = function(ds) {
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.computemoves(ds);
}

// update position of entity
Entity.prototype.computemoves = function(ds) {
    // default: do nothing
}


// check if current entity collides with another
Entity.prototype.collide_with = function(ent) {
    if (ent == this) {
        console.log("WARNING - entity checked for collision against itself")
        return false;
    }

    // basic rectangle collision between both hitboxes
    hitboxThis = {
        'x': this.position.x + this.hitbox.left,
        'y': this.position.y + this.hitbox.top,
        'w': this.hitbox.width,
        'h': this.hitbox.height
    };
    hitboxEnt = {
        'x': ent.position.x + ent.hitbox.left,
        'y': ent.position.y + ent.hitbox.top,
        'w': ent.hitbox.width,
        'h': ent.hitbox.height
    };
    return intersectRectangles(hitboxThis, hitboxEnt);
}

// action to take if one entity collides with another
Entity.prototype.collision_action = function(entity) {
    // default: do nothing (to be re-implemented by subclasses)
}

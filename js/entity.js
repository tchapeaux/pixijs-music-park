var Entity = function() {
	this.sprite = null;
	this.position = new PIXI.Point(0, 0);
	this.velocity = new PIXI.Point(0, 0);
	this.hitbox = new PIXI.Rectangle(0, 0, 1, 1);
	this.base_speed = 100;
	this.should_delete = false;
}

Entity.prototype.set_position = function(x, y){
	this.name = null;
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

Entity.prototype.computemoves = function(ds) {
	
	// default one do nothing
}


// check if current entity collides with another
Entity.prototype.collide_with = function(ent) {
            if (ent == this)
                return false;

            var test1 = this.position.x + this.hitbox.left < (ent.position.x + ent.hitbox.left + ent.hitbox.width);
            var test2 = (this.position.x + this.position.left + this.position.width) > ent.position.x + ent.hitbox.left;
            var test3 = this.position.y + this.position.top < (ent.position.y + ent.hitbox.top + ent.hitbox.height);
            var test4 = (this.position.y + this.position.top + this.position.height) > ent.position.y + ent.hitbox.top;
            // basic rectangle collision
            if (
                    test1 && test2 && test3 && test4
                )
                return true;
            else
                return false;
}

// action to take if one entity collides with another
Entity.prototype.collision_action = function(entity) {
	
	// default one do nothing
}
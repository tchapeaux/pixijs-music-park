"use strict";

var BystanderRandomWalkingStrategy = function(caller) {
    this.owner = caller;
    this.target = null;
    this.timer_wait = 0;
    this.time_to_wait = Math.random() * 2; // time to wait after reaching the target to decide on next one, in second
}

BystanderRandomWalkingStrategy.prototype.get_target = function() {
    // For now : find a random point near them
    var new_x = this.owner.position.x + (-0.5 + Math.random()) * 200;
    var new_y = this.owner.position.y + (-0.5 + Math.random()) * 200;
    return new PIXI.Point(new_x, new_y);
}

BystanderRandomWalkingStrategy.prototype.compute = function(ds) {
    if (this.target === null) {
        // if time is right, will move
        if(this.timer_wait >= this.time_to_wait){
            this.target = this.get_target();
            this.timer_wait = 0;
        }else{
            this.timer_wait += ds;
        }
    }else
    {
        if(this.owner.getCenter().x == this.target.x && this.owner.getCenter().y == this.target.y)
        {
            // target reached
            this.target = null;
        }else {
            this.owner.move_to(this.target, ds);
            // cancel if can't go to such position
            if(!this.owner.would_fit(this.owner.velocity.x + this.owner.position.x, this.owner.velocity.y + this.owner.position.y))
            {
                this.target = null;
            }
        }
    }
}


var BystanderFollowPathStrategy = function(caller, path, starting_point) {
    this.path = path;
    this.owner = caller;
    this.currpoint_index = starting_point;
    this.owner.set_center(this.path.start_x + this.path.points[this.currpoint_index].x, this.path.start_y + this.path.points[this.currpoint_index].y);
    this.target = this.get_target();
}

BystanderFollowPathStrategy.prototype.get_target = function() {
    // For now : find a random point near them
    this.currpoint_index++;
    if(this.currpoint_index == this.path.points.length)
    {
        this.owner.set_center(this.path.start_x + this.path.points[0].x, this.path.start_y + this.path.points[0].y);
        this.currpoint_index = 0;
    }
    var new_x = this.path.start_x + this.path.points[this.currpoint_index].x;
    var new_y = this.path.start_y + this.path.points[this.currpoint_index].y;
    return new PIXI.Point(new_x, new_y);
}

BystanderFollowPathStrategy.prototype.compute = function(ds) {
    if (this.target === null) {
        console.log("Warning : no target point !");
    }else
    {
        if(this.owner.getCenter().x == this.target.x && this.owner.getCenter().y == this.target.y)
        {
            // target reached
            this.target = this.get_target();
        }else {
            this.owner.move_to(this.target, ds);
            // can't go to such position, cancel the whole behavior
            if(!this.owner.would_fit(this.owner.velocity.x + this.owner.position.x, this.owner.velocity.y + this.owner.position.y))
            {
                this.target = null;
                this.owner.behavior = new BystanderRandomWalkingStrategy(this.owner);
            }
        }
    }
}

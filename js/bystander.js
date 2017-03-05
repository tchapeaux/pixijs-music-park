function Bystander(start_x, start_y) {
    Entity.call(this);
    this.sprite = new PIXI.Sprite.fromImage("resources/bystander.png");
    this.hitbox = new PIXI.Rectangle(0, 0, 10, 10);
    this.sprite.scale = new PIXI.Point(0.5, 0.5);
    this.set_position(start_x, start_y);

    this.listening_to_music = false;
    this.target = null;
}

Bystander.prototype = Object.create(Entity.prototype);
Bystander.prototype.constructor = Bystander;

Bystander.prototype.get_target = function() {
    // For now : find a random point near them
    var new_x = this.position.x + (-0.5 + Math.random()) * 100;
    var new_y = this.position.y + (-0.5 + Math.random()) * 100;
    this.target = new PIXI.Point(new_x, new_y);
}

Bystander.prototype.computemoves = function(ds) {
    if (this.target === null) {
        this.target = this.get_target();
    }
}

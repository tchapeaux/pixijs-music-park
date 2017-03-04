function Game() {
    this.entities = [];
    this.level = null;

    this.player = new Player();
    this.player.set_position(10, hScr / 4 + 256 + 10);

    this.loadmap("resources/map/map1.json");
}

Game.prototype.add_entity = function(ent){
    this.entities.push(ent);
    if(ent.sprite != null)
        stage.addChild(ent.sprite);
}

Game.prototype.loadmap = function(map){
    if(this.level != null)
    {
        stage.removeChild(this.level.container);
    }
    for(var i = 0; i < this.entities.length; i++)
    {
        if(ent.sprite != null)
            stage.removeChild(ent.sprite);
    }
    this.entities = [];
    this.level = new Level(map);
    stage.addChild(this.level.container);

    console.log(this.level);
    console.log(this.level.teleports);
    /*
    for(var i = 0; i < this.level.teleports.length; i++)
    {
        this.add_entity(new Teleport(this.level.teleports[i].x, this.level.teleports[i].y,  this.level.teleports[i].w, this.level.teleports[i].h));
    }
    */
    this.add_entity(this.player);
}

Game.prototype.update = function(ds) {
    var currentcount = this.entities.length;
    // regular update && entities delete
    for(var i=0; i < currentcount; i++)
    {
        var ent = this.entities[i];
        if (ent.should_delete)
        {
            this.entities.splice(i, 1);
            currentcount--;
            i--;
            continue;
        }
        ent.update(ds);
        // collisions between entities
        for(var j=i + 1; j < currentcount; j++)
        {
            if(ent.collide_with(this.entities[j]))
            {
                ent.collision_action(this.entities[j]);
                this.entities[j].collision_action(ent);
            }
        }
    }
}

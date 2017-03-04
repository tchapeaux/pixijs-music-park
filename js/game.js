function Game() {
    this.entities = [];
    this.level = null;
    this.level_loaded = false;  // handle asynchronous JSON loading

    this.player = new Player();
    this.loadmap("resources/map/map1.json");
}

Game.prototype.add_entity = function(ent){
    this.entities.push(ent);
    if(ent.sprite != null)
        stage.addChild(ent.sprite);
}

Game.prototype.loadmap = function(map){
    // Clear previous state
    if(this.level != null)
    {
        stage.removeChild(this.level.container);
    }
    for(var i = 0; i < this.entities.length; i++)
    {
        ent = this.entities[i];
        if(ent.sprite != null)
            stage.removeChild(ent.sprite);
    }
    this.entities = [];

    // Load level and place player
    this.level = new Level(map);
    stage.addChild(this.level.container);
    this.player.set_position(10, hScr / 4 + 256 + 10);
    this.add_entity(this.player);

    // Rest of loading map is done in loadmap_finish (after the JSON has loaded)
}

Game.prototype.loadmap_finish = function() {
    console.log("level", this.level);
    console.log("level teleports", this.level.teleports);
    /*
    for(var i = 0; i < this.level.teleports.length; i++)
    {
        this.add_entity(new Teleport(this.level.teleports[i].x, this.level.teleports[i].y,  this.level.teleports[i].w, this.level.teleports[i].h));
    }
    */
    this.level_loaded = true;
}

Game.prototype.update = function(ds) {
    // Wait for level to be fully loaded (JSON asynchronous call)
    if (this.level_loaded === false) {
        if (this.level.ready === true) {
            this.loadmap_finish();
        } else {
            console.log("Waiting for level loading");
        }
    } else {
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
}

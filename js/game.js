function Game() {
    this.entities = [];
    this.level = null;
    this.level_loaded = false;  // handle asynchronous JSON loading

    this.player = new Player();
    this.loadmap("resources/map/map1.json");

    this.musicband = new MusicBand();
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
        if (!ent instanceof Player) {
            ent.should_delete = true;
        }
        if(ent.sprite != null) {
            stage.removeChild(ent.sprite);
        }
    }
    this.entities = [];

    // Load level and place player
    this.level = new Level(map);
    this.level_loaded = false;
    stage.addChild(this.level.container);
    this.add_entity(this.player);

    // Rest of loading map is done in loadmap_finish (after the JSON has loaded)
}

Game.prototype.loadmap_finish = function() {
    // Finish initialization of level when JSON has loaded
    for(var i = 0; i < this.level.teleports.length; i++)
    {
        var tel = this.level.teleports[i];
        this.add_entity(new Teleport(tel.x, tel.y, tel.w, tel.h, tel.to_map));
    }
    this.player.set_position(30, hScr / 4 + 256 + 10);

    this.crowd = new Crowd();

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
                var otherEnt = this.entities[j];
                if(ent.collide_with(otherEnt))
                {
                    ent.collision_action(otherEnt);
                    otherEnt.collision_action(ent);
                }
            }
        }

        // Check for teleporter activations
        for (var k = this.entities.length - 1; k >= 0; k--) {
            var ent = this.entities[k];
            if (ent instanceof Teleport) {
                if (ent.activated === true) {
                    this.loadmap(ent.jsonpath);
                    break;
                }
            }
        }

        this.crowd.update(ds);
        this.musicband.update(ds);
    }
}

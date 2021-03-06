"use strict";

function Game() {
    this.entities = [];
    this.level = null;
    this.level_loaded = false;  // handle asynchronous JSON loading

    this.player = new Player();
    this.loadmap("resources/map/map1.json");

    this.nextteleport = null;

    this.musicband = new MusicBand();
}

Game.prototype.add_entity = function(ent){
    this.entities.push(ent);
    if(ent.sprite != null)
        stage.addChild(ent.sprite);
}

Game.prototype.remove_entity = function(ent) {
    array_remove(this.entities, ent);
    if (ent.sprite != null) {
        stage.removeChild(ent.sprite);
    }
};

Game.prototype.loadmap = function(map){
    // Clear previous state
    if(this.level != null)
    {
        stage.removeChild(this.level.container);
    }
    for(var i = 0; i < this.entities.length; i++)
    {
        var ent = this.entities[i];
        if (!ent instanceof Player) {
            ent.should_delete = true;
        }
    }
    this.entities = [];
    stage.removeChildren();
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
        var objtel = new Teleport(tel.x, tel.y, tel.width, tel.height, tel.to_map, tel.to_x, tel.to_y);
        console.log(objtel);
        this.add_entity(objtel);
    }
    if(this.nextteleport == null)
        this.player.set_position(30, hScr / 4 + 256 + 10);
    else
    {
        this.player.set_position(this.nextteleport.to_x == "" ? this.player.position.x : this.nextteleport.to_x, this.nextteleport.to_y == "" ? this.player.position.y : this.nextteleport.to_y);
    }
    this.nextteleport = null;

    this.crowd = new Crowd();

    this.level_loaded = true;
    for(var i=0; i < (10 * this.level.crowdLevel); i++){
        if(game.level.walking_paths.length == 0){
            var x = 30;
            var y = hScr / 4 + 256 + 10;
            var personality = getBystanderPersonality();
            var bs = new Bystander(x, y, personality);
            bs.ghost = false;
            this.add_entity(bs);
        } else {
            // get a personality for bystander
            var personality = getBystanderPersonality();
            // pick a path according to personality
            // first get all the possible paths
            var personality_paths = [];
            for (var j = 0; j < game.level.walking_paths.length; j++) {
                var currpath = game.level.walking_paths[j];
                if (currpath.personality == "any" || currpath.personality.indexOf(personality) != -1) {
                    personality_paths.push(currpath);
                }
            }
            // then pick a random one in that list
            var indexpath = Math.floor(Math.random() * personality_paths.length);
            var path = personality_paths[indexpath];
            // finally, pick a random point on that path as a starting point
            var indexpoint = Math.floor(Math.random() * (path.points.length - 1))
            this.add_entity(new Bystander(0, 0, personality, path, indexpoint));
        }
    }
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
                if(ent.sprite != null) {
                    stage.removeChild(ent.sprite);
                }
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

        if(this.nextteleport != null)
        {
            this.loadmap(this.nextteleport.jsonpath);
            return;
        }

        this.crowd.update(ds);
        this.musicband.update(ds);

        //update zindex positionning
        stage.children.sort(function(a,b) {
            a.zIndex = a.zIndex || 0;
            b.zIndex = b.zIndex || 0;
            return a.zIndex - b.zIndex;
        });
    }
}

Game.prototype.keyUp = function(keycode) {
    // body...
};

Game.prototype.keyDown = function(keycode) {
    if (keycode == 32 /* SPACE */) {
        this.player.togglePlayState();
    }
};

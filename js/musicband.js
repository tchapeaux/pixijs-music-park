"use strict";

function MusicBand() {
    // Define music tracks. They will be started in update() loop when they are loaded
    // Volume set to 0 at they are supposed to play silently before being triggered
    this.music_tracks = {};
    this.music_tracks.guitar = new Howl({
        src: ['resources/audio/gravityfall_jam_guitar.ogg'],
        volume: 0,
        loop: false,
    });
    this.music_tracks.drums = new Howl({
        src: ['resources/audio/gravityfall_jam_drums.ogg'],
        volume: 0,
        loop: false,
    });
    this.music_tracks.ukulele_flute = new Howl({
        src: ['resources/audio/gravityfall_jam_ukulele_flute.ogg'],
        volume: 0,
        loop: false,
    });
    this.music_tracks.voices = new Howl({
        src: ['resources/audio/gravityfall_jam_voices.ogg'],
        volume: 0,
        loop: false,
    });
}

MusicBand.prototype.toggleMusicTrack = function(track) {
    // Currently: just enable it (TODO real toggle)
    track.volume(1);
    var from_vol = track.volume();
    var to_vol = 1 - from_vol;
    track.fade(from_vol, to_vol, 1000);
}

MusicBand.prototype.update = function(ds) {
    // DEBUG mode for now: control with keyboard
    if (keysPressed.has(65 /* A */)) {
        this.toggleMusicTrack(this.music_tracks.drums);
    }
    if (keysPressed.has(90 /* Z */)) {
        this.toggleMusicTrack(this.music_tracks.guitar);
    }
    if (keysPressed.has(69 /* E */)) {
        this.toggleMusicTrack(this.music_tracks.ukulele_flute);
    }
    if (keysPressed.has(82 /* R */)) {
        this.toggleMusicTrack(this.music_tracks.voices);
    }

    // Track synchronization
    // wait for all to be loaded and not playing to launch them simultaneously
    if (
        (this.music_tracks.drums.state() == "loaded") &&
        (this.music_tracks.guitar.state() == "loaded") &&
        (this.music_tracks.ukulele_flute.state() == "loaded") &&
        (this.music_tracks.voices.state() == "loaded") &&
        (!this.music_tracks.drums.playing()) &&
        (!this.music_tracks.guitar.playing()) &&
        (!this.music_tracks.ukulele_flute.playing()) &&
        (!this.music_tracks.voices.playing()) &&
        true
       )
    {
        console.log("Restarting tracks");
        this.music_tracks.drums.play()
        this.music_tracks.guitar.play()
        this.music_tracks.ukulele_flute.play()
        this.music_tracks.voices.play()
    }
}

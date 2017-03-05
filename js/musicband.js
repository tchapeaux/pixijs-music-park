function MusicBand() {
    this.music_tracks = {};
    this.music_tracks.guitar = new Howl({
        src: ['resources/audio_raw/gravityfall_jam_guitar.ogg'],
        volume: 0,
        loop: true
    });
    this.music_tracks.drums = new Howl({
        src: ['resources/audio_raw/gravityfall_jam_drums.ogg'],
        volume: 0,
        loop: true
    });
    this.music_tracks.ukulele_flute = new Howl({
        src: ['resources/audio_raw/gravityfall_jam_ukulele_flute.ogg'],
        volume: 0,
        loop: true
    });
    this.music_tracks.voices = new Howl({
        src: ['resources/audio_raw/gravityfall_jam_voices.ogg'],
        volume: 0,
        loop: true
    });
    // Launch all sounds at level 0
    this.music_tracks.guitar.play();
    this.music_tracks.drums.play();
    this.music_tracks.ukulele_flute.play();
    this.music_tracks.voices.play();
}

MusicBand.prototype.toggleMusicTrack = function(track) {
    // Currently: just enable it (TODO real toggle)
    track.volume(1);
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
}

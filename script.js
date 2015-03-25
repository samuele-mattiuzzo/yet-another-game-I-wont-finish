window.onload = function() {
    // init canvases contents
    initHorizon();

    // loads the game
    var game = new Game();
    game.load();
    
    // starts the loop
    game.start();
};


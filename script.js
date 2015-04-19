// global
var game;

window.onload = function() {
    // init canvases contents
    initHorizon();

    // loads the game
    game = new Game();
    game.load();
    
    // starts the loop
    game.start();
};


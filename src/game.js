var PLAYER_ALIVE = true;


function Game() {

    this.player = new Player();
    this.story = new Story();

    this.handlePlayerChoice = function(el, self){
        self.player.handleAction(el.value);
        self.story.stopProgress();
    };

    this.load = function() {
        var self = this;
        btn_1.addEventListener("click",
            function(){self.handlePlayerChoice(this, self);});
        btn_2.addEventListener("click",
            function(){self.handlePlayerChoice(this, self);});
        btn_3.addEventListener("click",
            function(){self.handlePlayerChoice(this, self);});
        btn_4.addEventListener("click",
            function(){self.handlePlayerChoice(this, self);});
    };

    this.start = function(){
        this.story.startStory();
        this.player.lifeLoop();
        this.updateHud();
    };

    this.end = function() {};

    this.updateHud = function(){};
}
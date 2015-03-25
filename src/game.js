function Game() {

    this.player = new Player();

    this.handlePlayerChoice = function(el){
        console.log(el.value);
    };

    this.load = function() {
        var self = this;
        btn_1.addEventListener("click", function(){self.handlePlayerChoice(this);});
        btn_2.addEventListener("click", function(){self.handlePlayerChoice(this);});
        btn_3.addEventListener("click", function(){self.handlePlayerChoice(this);});
        btn_4.addEventListener("click", function(){self.handlePlayerChoice(this);});
    };

    this.start = function(){
        var story = new Story();
        story.startStory();
    };
}
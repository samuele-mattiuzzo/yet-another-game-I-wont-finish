function Player() {
    this.name = 'Player';

    //levels (0-100)
    this.air = 100;
    this.power = 100;
    this.signal = 0;

    //rates (0-100)
    this.breathing_speed = 30;
    this.power_consumption = 0;
    this.last_power_consumption = 0;  // how much power was consumed
    this.last_breathing_check = 0;  // how many seconds ago
    this.last_power_check = 0;

    //stats (0-100)
    this.panic = 0;
    this.sadness = 0;
    this.wisdom = 80;
    this.hope = 100;
    this.confusion = 100;

    this.stats_names = ['panic', 'sadness', 'wisdom', 'hope', 'confusion'];

    //checks
    this.checkBreathing = function() {
        // breathing is influenced negatively by panic and confusion
        // positively by wisdom(enforces calm)
        var air_delta = (this.panic + this.confusion) * 45 / this.wisdom * 65;
        if (this.breathing_speed <= this.last_breathing_check) {
            // air consumed
            this.last_breathing_check = 0;
            this.air -= air_delta;

            // update rates (loose a 10% breath gap)
            this.breathing_speed -= this.breathing_speed * 0.1;
        }
    };
    
    this.checkPower = function() {
        if (this.last_power_consumption > 0) {
            this.power_consumption += this.last_power_consumption;
            this.last_power_consumption = 0;
        }
        if (this.last_power_check >= 10){
            this.power -= this.power_consumption;
            this.last_power_check = 0;
            this.power_consumption = 0;
        }
    };
    
    this.lifeLoop = function(){
        var self = this;
        (function loopChecks(){
            if (!TIMER_IN_PROGRESS) {
                self.checkBreathing();
                self.checkPower();
                self.last_power_check += 1;
                self.last_breathing_check += 1;
            }
            if (self.air > 0) {
                setTimeout(loopChecks, SEC);
            } else {
                PLAYER_ALIVE = false;
            }
        })();
    };

    this.handleAction = function(value) {
        var choice = this._getChoice(value),
            self = this;

        this.stats_names.forEach(function(stat) {
            if (choice.get(stat)){
                self[stat] = self[stat] + choice[stat];
            }
        });
        this.handleSideEffects();
        // change just before readNext if diverts from normal pathing
        if (choice.get('link_to')) {
            game.story.next_read = choice['link_to'];
        }
        game.story.stopProgress();
    };

    this.handleSideEffects = function() {
        // eg: check how the values combined increase / decrease rates
    };

    /* helpers */
    this._getChapter = function(){
        return STORY[game.story.current_read];
    };

    this._getChoice = function(choice){
        var chapter = this._getChapter();
        return chapter.get('choice')[choice];
    };
}

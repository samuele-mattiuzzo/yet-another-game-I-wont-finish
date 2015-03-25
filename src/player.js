function Player() {
    this.name = 'Player';

    //levels (0-100)
    this.air = 100;
    this.power = 100;
    this.signal = 0;

    //rates (0-100)
    this.breathing_speed = 2;
    this.power_consumption = 0;
    this.last_power_consumption = 0;  // how much power was consumed
    this.last_breathing_check = 0;  // how many seconds ago

    //stats (0-100)
    this.panic = 0;
    this.sadness = 0;
    this.wisdom = 80;
    this.hope = 100;
    this.confusion = 100;

    //checks
    this.checkBreathing = function() {};
    
    this.checkPower = function() {};
    
    this.lifeLoop = function(){
        this.checkBreathing();
        this.checkPower();
    };

    this.handleAction = function(value) {
        var attr = value.split("|")[0],
            val = parseInt(value.split("|")[1], 10);
        var curr = this[attr];
        this[attr] = curr+val;
        console.log(attr + ": " + this[attr]);
    };

    this.handleSideEffects = function() {
        // eg: check how the values combined increase / decrease rates
    };

}

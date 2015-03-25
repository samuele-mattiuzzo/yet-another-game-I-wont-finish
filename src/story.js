var TIMER_LENGTH = 10,
    timer = document.getElementById('timer'),
    text = document.getElementById('text'),
    btn_1 = document.getElementById('1'),
    btn_2 = document.getElementById('2'),
    btn_3 = document.getElementById('3'),
    btn_4 = document.getElementById('4');


function Story() {
    this.current_level = 1;
    this.max_levels = 5;
    this.current_read = 1;
    this.max_reads_per_level = 10;

    this.loadStory = function() {};

    this.readNext = function() {
        if (this.current_read == this.max_reads_per_level) {
            this.nextChapter();
        }
        this.current_read += 1;
    };
    
    this.nextChapter = function() {
        this.current_level += 1;
        this.current_read = 1;
    };
    
    this.startProgress = function() {
        var counter = 100,
            delta = (TIMER_LENGTH * 100 / counter);
        (function pbLoop() {
            counter -= delta;
            timer.value = counter;
            if (counter > 0) {
                setTimeout(pbLoop, 1000);
            }
        })();
    };
}
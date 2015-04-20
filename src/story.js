var TIMER_LENGTH = 10,
    READ_SPEED = 5,
    SEC = 1000,
    TIMER_IN_PROGRESS = false,
    timer = document.getElementById('timer'),
    text = document.getElementById('text'),
    btn_1 = document.getElementById('1'),
    btn_2 = document.getElementById('2'),
    btn_3 = document.getElementById('3'),
    btn_4 = document.getElementById('4'),
    controls = document.getElementById('controls');


function Story() {
    this.current_read = 1;
    this.next_read = 1;

    this.in_progress = false;


    this.setButtons = function(choices) {
        this.resetButtons();
        controls.style.display = 'block';
        for(var i=1; i<=4; i++) {
            if(choices.get(i)){
                window['btn_'+i].fadingInnerHTML(choices[i]['text']);
            } else {
                window['btn_'+i].style.display = 'none';
            }
        }
    };

    this.resetButtons = function(choices) {
        for(var i=1; i<=4; i++) {
            window['btn_'+i].innerHTML = '';
            window['btn_'+i].style.display = 'block';
        }
        controls.style.display = 'none';
    };
    
    this.readNext = function() {
        // normal pathing
        this.current_read = this.next_read;
        var chapter = STORY[this.current_read];
        this.next_read = chapter.get('link_to');

        if(chapter.get('ending')) {
            /*handle ending*/
            game.end();
        }

        var choices = chapter.get('choices');
        text.fadingInnerHTML(chapter.get('text'));

        if (choices) {
            this.setButtons(choices);
            this.startProgress();
        } else {
            this.resetButtons();
            var self = this;
            setTimeout(function(){ self.readNext(); }, SEC * READ_SPEED);
        }
    };

    this.nextChapter = function() {};
    
    this.stopProgress = function() { this.in_progress = false; TIMER_IN_PROGRESS = false; };

    this.startProgress = function() {
        var counter = 100,
            delta = (TIMER_LENGTH * 100 / counter),
            self = this;
        if (this.in_progress === false) {
            this.in_progress = true;
            TIMER_IN_PROGRESS = true;
            (function pbLoop() {
                counter -= delta;
                timer.value = counter;
                if (counter > 0 && self.in_progress === true) {
                    setTimeout(pbLoop, SEC);
                } else {
                    self.stopProgress();
                    self.readNext();
                }
            })();
        }
    };

    this.startStory = function() {
        this.readNext();
    };
}
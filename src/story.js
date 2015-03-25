var TIMER_LENGTH = 10,
    READ_SPEED = 5,
    SEC = 1000,
    timer = document.getElementById('timer'),
    text = document.getElementById('text'),
    btn_1 = document.getElementById('1'),
    btn_2 = document.getElementById('2'),
    btn_3 = document.getElementById('3'),
    btn_4 = document.getElementById('4');


function Story() {
    this.current_level = 1;
    this.max_levels = 5;
    
    this.current_read = 0;
    this.max_reads = 5;

    this.readNext = function() {
        if (this.current_level == this.max_levels){
            return;
        }

        if (this.current_read == this.max_reads) {
            this.nextChapter();
        }

        this.current_read += 1;
        var choices = STORY[this.current_level][this.current_read]['choices'];
        text.innerHTML = STORY[this.current_level][this.current_read]['text'];

        if (choices !== false) {
            btn_1.innerHTML = choices[1].text;
            btn_1.value = choices[1].value;
            btn_2.innerHTML = choices[2].text;
            btn_2.value = choices[2].value;
            btn_3.innerHTML = choices[3].text;
            btn_3.value = choices[3].value;
            btn_4.innerHTML = choices[4].text;
            btn_4.value = choices[4].value;
            this.startProgress();
        } else {
            setTimeout(this.readNext, SEC * READ_SPEED);
        }
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
                setTimeout(pbLoop, SEC);
            } else {
                this.readNext();
            }
        })();
    };

    this.startStory = function() {
        this.readNext();
    };
}
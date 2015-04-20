// example
// obj.get('a') yields false if obj.a doesn't exist
Object.prototype.get = function(key) {
    return (key in this) ? this[key] : false;
};

var fadeIn = function(element) {

};

// adds fadeIn to innerHTML
// example
// element.fadingInnerHTML('text')
Object.prototype.fadingInnerHTML = function(text) {
    this.innerHTML = '';
    this.style.display = 'block';
    var op = 0.1,  // initial opacity
        self = this;
    var timer = setInterval(function () {
        if (op >= 1){ clearInterval(timer); }
        self.style.opacity = op;
        self.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 15);
    this.innerHTML = text;
};
var MAX_DEPTH = 128,
    MAX_STARS = 64,
    LOOP_SPEED = 70;

var horizon, horizon_ctx,
    space, space_ctx,
    game, game_ctx;

var stars = new Array(MAX_STARS);

window.onload = function() {
  horizon = document.getElementById("the-horizon");
  space   = document.getElementById("the-space");

  if( horizon && horizon.getContext &&
      space && space.getContext) {
    // canvases are ok
    horizon_ctx = horizon.getContext("2d");
    space_ctx   = space.getContext("2d");

    // init canvases contents
    initHorizon();
   }
};

/* Returns a random number in the range [minVal,maxVal] */
function randomRange(minVal,maxVal) {
  return Math.floor(Math.random() * (maxVal - minVal - 1)) + minVal;
}

function initSpace() {
  for( var i = 0; i < stars.length; i++ ) {
    stars[i] = {
      x: randomRange(-25,25),
      y: randomRange(-25,25),
      z: randomRange(1, MAX_DEPTH)
     };
  }
}

function initHorizon() {

  var bg = new Image();
  bg.onload = function() {
    horizon_ctx.drawImage(bg, 0, 225, 1000, 150);
    initSpace();
    setInterval(spaceLoop, LOOP_SPEED);
  };
  horizon_ctx.fillStyle = "rgb(0, 0, 0)";
  horizon_ctx.fillRect(0, 0, horizon.width, horizon.height);
  bg.src = "assets/horizon.jpg";
}

function spaceLoop() {
  var halfWidth  = space.width / 2,
      halfHeight = space.height / 2,
      eraseAlpha = 1;

  space_ctx.fillStyle = "rgba(255, 255, 255, " + eraseAlpha + ")";
  space_ctx.clearRect(0, 0, space.width, space.height)
  space_ctx.beginPath();

  for( var i = 0; i < stars.length; i++ ) {
    stars[i].z -= 0.2;

    if( stars[i].z <= 0 ) {
      stars[i].x = randomRange(-25,25);
      stars[i].y = randomRange(-25,25);
      stars[i].z = MAX_DEPTH;
    }

    var k  = 128.0 / stars[i].z;
    var px = stars[i].x * k + halfWidth;
    var py = stars[i].y * k + halfHeight;

    if( px >= 0 && px <= 1000 && py >= 0 && py <= 600 ) {
      var size = (1 - stars[i].z / 32.0) * 5;
      var shade = parseInt((1 - stars[i].z / 32.0) * 255, 10);
      space_ctx.fillStyle = "rgb(" + shade + "," + shade + "," + shade + ")";
      space_ctx.fillRect(px, py, size, size);
    }
  }
}

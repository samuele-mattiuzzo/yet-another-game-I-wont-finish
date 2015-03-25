var MAX_DEPTH = 128,
    MAX_STARS = 32,
    LOOP_SPEED = 80,
    GAME_WIDTH = 1000,
    GAME_HEIGHT = 600;

var horizon, horizon_ctx,
    space, space_ctx;

var stars = new Array(MAX_STARS);

function initHorizon() {
  // inits the horizon and starts the space loop
  horizon = document.getElementById("the-horizon");
  space   = document.getElementById("the-space");

  if( horizon && horizon.getContext &&
      space && space.getContext) {
    
    // canvases are ok
    horizon_ctx = horizon.getContext("2d");
    space_ctx   = space.getContext("2d");
      
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
}

function initSpace() {
  // inits the stars
  for( var i = 0; i < stars.length; i++ ) {
    stars[i] = {
      x: randomRange(-25,25),
      y: randomRange(-25,25),
      z: randomRange(1, MAX_DEPTH)
     };
  }
}

function spaceLoop() {
  // loops infinite stars
  var halfWidth  = space.width / 2,
      halfHeight = space.height / 2,
      eraseAlpha = 1;

  space_ctx.fillStyle = "rgba(255, 255, 255, " + eraseAlpha + ")";
  space_ctx.clearRect(0, 0, space.width, space.height);
  space_ctx.beginPath();

  for( var i = 0; i < stars.length; i++ ) {
    stars[i].z -= 0.1;

    if( stars[i].z <= 0 ) {
      stars[i].x = randomRange(-25, 25);
      stars[i].y = randomRange(-25, 25);
      stars[i].z = MAX_DEPTH;
    }

    var k  = MAX_DEPTH / stars[i].z,
        px = stars[i].x * k + halfWidth,
        py = stars[i].y * k + halfHeight;

    if( px >= 0 && px <= GAME_WIDTH && py >= 0 && py <= GAME_HEIGHT ) {
      var size = (1 - stars[i].z / 32.0) * 5,
          shade = parseInt((1 - stars[i].z / 32.0) * 255, 10);
      space_ctx.fillStyle = "rgb(" + shade + "," + shade + "," + shade + ")";
      space_ctx.fillRect(px, py, size, size);
    }
  }
}

/* Returns a random number in the range [minVal,maxVal] */
function randomRange(minVal,maxVal) {
  return Math.floor(Math.random() * (maxVal - minVal - 1)) + minVal;
}

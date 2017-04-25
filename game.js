var Game = { };

Game.fps = 50;

// herni objekty
Game.objects = [];
    
// vykresli kazdy herni objekt
Game.draw = function() {
  for(var i = 0; i < Game.objects.length; i++) {
      Game.objects[i].draw();
  }
}

// proved update stavu hry
Game.update = function() {
  for(var i = 0; i < Game.objects.length; i++) {
      Game.objects[i].update();
  }
}

// vypis logovaci hlasku
Game.log = function(text) {
    Game.logArea.value = text + '\r\n'+Game.logArea.value;
}

Game.start = function() {
    Game.log('Hra spustena');
    Game.canvas.addEventListener("click", Game.onClick, true);
    Game.document.addEventListener("keypress", Game.onKeypress, true);
}

Game.onClick = function(event) {
    Game.log('click ' + event.x + ', ' + event.y);
}

Game.onKeypress = function(event) {
    Game.log('key pressed ' + event.keyCode);
}

Game.run = (function() {
  var loops = 0, skipTicks = 1000 / Game.fps,
      maxFrameSkip = 10,
      nextGameTick = (new Date).getTime();
  
  return function() {
    loops = 0;
    
    while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {
      Game.update();
      nextGameTick += skipTicks;
      loops++;
    }
    
    Game.draw();
  };
})(); 

(function() {
  var onEachFrame;
  if (window.webkitRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); webkitRequestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  
  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(Game.run);
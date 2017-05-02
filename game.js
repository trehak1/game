var Game = { };

Game.fps = 50;

// herni objekty
Game.objects = [];
    
// vykresli kazdy herni objekt
Game.draw = function() {
  for(var i = 0; i < Game.objects.length; i++) {
      var obj = Game.objects[i];
      Game.board.draw(obj.color, obj.x, obj.y);
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
    var x = Game.board.prepoctiNaHerniSouradnice(event.offsetX);
    var y = Game.board.prepoctiNaHerniSouradnice(event.offsetY);
    Game.log('click ' + x + ', ' + y);
    Game.objects[0] = new Bomba(3000, x, y);
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
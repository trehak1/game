var Game = { };

Game.fps = 50;
Game.running = false;

// herni objekty
Game.objects = [];
    
// vykresli kazdy herni objekt
Game.draw = function() {
  if(!Game.running) {
    return;
  }
  Game.board.cleanUp();
  for(var key in Game.objects) {
      var obj = Game.objects[key];
      if(obj.drawable) {
        var img = obj.image;
        Game.board.drawImage(img, obj.x, obj.y);
      }
  }
}

// proved update stavu hry
Game.update = function() {
  if(!Game.running) {
    return;
  }
  for(var key in Game.objects) {
      Game.objects[key].update();
  }
}

// vypis logovaci hlasku
Game.log = function(text) {
    Game.logArea.value = text + '\r\n'+Game.logArea.value;
}

Game.start = function() {
    Game.canvas.addEventListener("click", Game.onClick, true);
    Game.document.addEventListener("keypress", Game.onKeypress, true);
    Board.canvas = canvas;
    Game.board = Board;
    Game.running = true;
    var panacek = new Panacek(0, 0);
    Game.addObject(panacek);
    Game.panacek = panacek;
    Game.log('Hra spustena');
}

Game.togglePause = function() {
    Game.running = !Game.running;
}

Game.onClick = function(event) {
    var x = Board.prepoctiNaHerniSouradnice(event.offsetX);
    var y = Board.prepoctiNaHerniSouradnice(event.offsetY);
    var bomba = new Bomba(1000, x, y);
    Game.addObject(bomba);
}

Game.removeObject = function(obj) {
  delete Game.objects[obj.id];
}

Game.addObject = function(obj) {
    obj.id = id();
    Game.objects[obj.id] = obj;
}

Game.onKeypress = function(event) {
    Game.log('key pressed ' + event.keyCode);

    if(event.keyCode == 119) {
        Game.panacek.y = Game.panacek.y - 1;
    }
    if(event.keyCode == 97) {
        Game.panacek.x = Game.panacek.x - 1;
    }
    if(event.keyCode == 115) {
        Game.panacek.y = Game.panacek.y + 1;
    }
    if(event.keyCode == 100) {
        Game.panacek.x = Game.panacek.x + 1;
    }

}

function id() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 8; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

MainLoop.setUpdate(Game.update).setDraw(Game.draw).start();
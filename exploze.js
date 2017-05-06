function Exploze(sila, x, y) {
      
    this.x = x;
    this.y = y;
    this.sila = sila;
    this.lastUpdated = Date.now();

    Game.addObject(new Plamen(sila,x,y, Plamen.prototype.spreadUp));
    Game.addObject(new Plamen(sila,x,y, Plamen.prototype.spreadDown));
    Game.addObject(new Plamen(sila,x,y, Plamen.prototype.spreadLeft));
    Game.addObject(new Plamen(sila,x,y, Plamen.prototype.spreadRight));


    this.update = function() {
        
    }


}

Exploze.prototype.rychlost = 50; 
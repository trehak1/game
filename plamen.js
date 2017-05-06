function Plamen(sila, x, y, spreadFunction) {
    
    this.x = x;
    this.y = y;
    this.sila = sila;
    this.created = Date.now();
    this.lastUpdate = this.created;
    this.spreadFunction = spreadFunction;

    this.update = function() {
        var now = Date.now();
        if(now-this.created > this.ttl) {
            Game.removeObject(this);
        }
        if(now-this.lastUpdate > this.speed) {
            if(sila > 0) {
                this.spreadFunction(this);
            }
        }
        this.lastUpdate = now;
    }

}

Plamen.prototype.speed = 20;
Plamen.prototype.ttl = 100;
Plamen.prototype.drawable = true;
Plamen.prototype.image = new Image();
Plamen.prototype.image.src = './graphics/plamen.png';
Plamen.prototype.spreadLeft = function(original) {
    Game.addObject(new Plamen(original.sila-1, original.x-1, original.y, original.spreadFunction));
}
Plamen.prototype.spreadRight = function(original) {
    Game.addObject(new Plamen(original.sila-1, original.x+1, original.y, original.spreadFunction));
}
Plamen.prototype.spreadUp = function(original) {
    Game.addObject(new Plamen(original.sila-1, original.x, original.y-1, original.spreadFunction));
}
Plamen.prototype.spreadDown = function(original) {
    Game.addObject(new Plamen(original.sila-1, original.x, original.y+1, original.spreadFunction));
}
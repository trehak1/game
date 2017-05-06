function Bomba(detonacniInterval, x, y) {
    this.x = x;
    this.y = y;
    this.detonacniInterval = detonacniInterval;
    this.polozena = Date.now();
}

Bomba.prototype.mamVybuchnout = function() {
    var tedJe = Date.now();
    return (this.polozena + this.detonacniInterval) <= tedJe;
}

Bomba.prototype.update = function() {
    if(this.mamVybuchnout() == true) {
        Game.log('Jsem bomba na '+this.x+', '+this.y+' a mam vybuchnout');
        Game.removeObject(this);
        Game.addObject(new Exploze(this.sila, this.x, this.y));
    }
}

Bomba.prototype.image = new Image();
Bomba.prototype.image.src = './graphics/bomba.png';
Bomba.prototype.sila = 4;
Bomba.prototype.drawable = true;
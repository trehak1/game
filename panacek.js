function Panacek(x, y) {
    this.x = x;
    this.y = y;
}

Panacek.prototype.update = function() {
    
}

Panacek.prototype.image = new Image();
Panacek.prototype.image.src = './graphics/panacek.png';
Panacek.prototype.drawable = true;
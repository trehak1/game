function Bomba(detonacniInterval, x, y) {
    
    this.x = x;
    this.y = y;
    this.detonacniInterval = detonacniInterval;
    this.polozena = Date.now();

    this.mamVybuchnout = function() {
        var tedJe = Date.now();
        return (this.polozena + this.detonacniInterval)
            <= tedJe;
    }

    this.update = function() {
        if(this.mamVybuchnout() == true) {
            Game.log('Jsem bomba na '+this.x+', '+this.y+' a mam vybuchnout');
            Game.objects = [];
        } else {
            Game.log('Neskodna bomba');
        }
    }

    this.draw = function() {
        var ctx = Game.canvas.getContext("2d");
        ctx.fillRect(this.x*20,this.y*20,20,20);
    }


}
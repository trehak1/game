var Board = {};

Board.velikostPole = 30;
Board.drawPlot = true;

Board.prepoctiNaHerniSouradnice = function(offset) {
    return Math.floor(offset / Board.velikostPole);
}

Board.prepoctiNaKresliciSouradnice = function(herniSouradnice) {
    return herniSouradnice * Board.velikostPole;
}

Board.cleanUp = function() {
    var ctx = Board.canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(Board.drawPlot) {
        for(var x = 0; x < Board.canvas.width+1; x += Board.velikostPole) {
            Board.drawLine(x,0,x, Board.canvas.height);
        }  
        for(var y = 0; y < Board.canvas.height+1; y += Board.velikostPole) {
            Board.drawLine(0,y,Board.canvas.width, y);
        }
    }
}

Board.drawLine = function(fromX, fromY, toX, toY) {
    var ctx = Board.canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(fromX,fromY);
    ctx.lineTo(toX,toY);
    ctx.stroke();
}

Board.draw = function(barva, herniX, herniY) {
    var ctx = Board.canvas.getContext("2d");
    var kresliciX = Board.prepoctiNaKresliciSouradnice(herniX);
    var kresliciY = Board.prepoctiNaKresliciSouradnice(herniY);
    ctx.fillStyle = barva;
    ctx.fillRect(kresliciX, kresliciY,Board.velikostPole,Board.velikostPole);
}

Board.drawImage = function(image, herniX, herniY) {
    var ctx = Board.canvas.getContext("2d");
    var kresliciX = Board.prepoctiNaKresliciSouradnice(herniX);
    var kresliciY = Board.prepoctiNaKresliciSouradnice(herniY);

    var overlapWidth = image.width - Board.velikostPole;
    if(overlapWidth > 0) {
        kresliciX -= overlapWidth/2;
    }

    var overlapHeight = image.height - Board.velikostPole;
    if(overlapHeight > 0) {
        kresliciY -= overlapHeight/2;
    }

    ctx.drawImage(image, kresliciX, kresliciY);
}
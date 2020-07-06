function Game(options) {
  this.snake = options.snake;
  this.food = undefined;
  this.rows = options.rows;
  this.columns = options.columns;
  this.ctx = options.ctx;
  this.foodSelected = undefined;
  this.foods = [
    {
      url : 'comidas/cereja.png',
      columns : 4,
      rows : 4,
    },
    {
      url : 'comidas/maca_verde.png',
      columns : 5,
      rows : 5,
    },
    {
      url : 'comidas/maca.png',
      columns : 4,
      rows : 4,
    },
    {
      url : 'comidas/pao.png',
      columns : 4,
      rows : 4,
    },
    {
      url : 'comidas/pera.png',
      columns : 4,
      rows : 4,
    },
    {
      url : 'comidas/uva.png',
      columns : 5,
      rows : 5,
    },
  ];
}

Game.prototype._drawBoard = function () {
  for (var columnIndex = 0; columnIndex < this.columns; columnIndex++) {
    for (var rowIndex = 0; rowIndex < this.rows; rowIndex++) {
      this.ctx.fillStyle = '#FED9A4';
      this.ctx.fillRect(columnIndex * 10, rowIndex * 10, 10, 10);
    }
  }
  if (this.food) {
    this._drawFood();
  }
}

Game.prototype._drawSnake = function () {
  this.snake.body.forEach(function (position, index) {
    this.ctx.fillStyle = '#F18A06';
    this.ctx.fillRect(position.column * 10, position.row * 10, 10, 10);
  }.bind(this));
}

Game.prototype.start = function() {
  this._assignControlsToKeys();
  this._generateFood();
  this.snake.move();
  this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
}


var lastY;
var lastX;
var delay =0;
Game.prototype._assignControlsToKeys = function () {
  document.ontouchmove = function (e){
     var currentY = e.touches[0].clientY;
     var currentX = e.touches[0].clientX;
     delay++;

     if(delay > 4) {
       if (currentY > lastY) {
         this.snake.goDown();
         delay = 0;
       } else if (currentY < lastY) {
         this.snake.goUp();
         delay = 0;
       } else if (currentX > lastX) {
         this.snake.goRight();
         delay = 0;
       } else if (currentX < lastX) {
         this.snake.goLeft();
         delay = 0;
       }
     }

      lastX =currentX;
      lastY = currentY;
  }.bind(this);


  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 38: //arrow up
        this.snake.goUp();
        break;
      case 40: //arror down
        this.snake.goDown();
        break;
      case 37: //arror left
        this.snake.goLeft();
        break;
      case 39: //arrow right
        this.snake.goRight();
        break; 
    }
  }.bind(this);
}

Game.prototype._generateFood = function () {
  do {
    const column = Math.floor(Math.random() * this.columns);
    const row = Math.floor(Math.random() * this.rows)

    var foodNumber = getRandomInt(0, this.foods.length);
    this.foodSelected = foodNumber;

    this.food = {
      row: row,
      column: column,
      endColumn : column + this.foods[foodNumber].columns,
      endRow : row + this.foods[foodNumber].rows,
    };
  } while ( this.snake.collidesWith(this.food) );
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

Game.prototype._drawFood = function () {

  var image = new Image();
  image.src = this.foods[this.foodSelected].url;

  this.ctx.drawImage(image,this.food.column * 10, this.food.row * 10);

  this.ctx.fillStyle = 'transparent';
  this.ctx.fillRect(this.food.column * 10, this.food.row * 10, 8, 8);
}


Game.prototype._update = function () {
  this._drawBoard();
  this._drawSnake();

  if ( this.snake.hasEatenFood(this.food) ) {
    this.snake.grow();
    this._generateFood();
    this._drawFood();
  }
  if ( this.snake.hasEatenItSelf() ) {
    this.snake.stop();
    this.stop();

    //açoes apos perder

    document.location.reload();
    alert('gameover');

  }
  this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
}

Game.prototype.stop = function () {
  if (this.intervalGame) {
    clearInterval(this.intervalGame)
    this.intervalGame = undefined;
  }
}
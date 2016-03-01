var Enemy = function(x, y, rand) {
    // this enters in the coordinates of the bugs and the speed

    this.x = x;
    this.y = y;
    this.rand = rand;


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    var speed = ((this.rand) * dt * 400) + 5.5;
    this.x = this.x + speed;

    // This makes the bugs appear again when they get to the end
    if (this.x > 500) {
        this.x = -40;
    }
    // Since this is so difficult the have a precise collision ... I create a "bug box" around each bug
    if (player.x < (this.x + 10) && player.x > (this.x - 10) && player.y > (this.y - 11) && player.y < (this.y + 11)) {
        player.x = startx;
        player.y = starty;
        console.log("collision");

    }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Starting position of the player
var startx = 200;
var starty = 410;


var Player = function() {
    this.x = startx;
    this.y = starty;

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.sprite = 'images/char-boy.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks


// Move around the player and stop him from going off the grid
Player.prototype.handleInput = function(keyname) {

    var rightmove = 100;
    var upmove = 87;


    if (keyname === 'left') {
        if (this.x === 0) {
            this.x += rightmove;
        }
        this.x -= rightmove;
    } else if (keyname === 'right') {
        if (this.x === 400) {
            this.x -= rightmove;
        }

        this.x += rightmove;

        // if the player gets to the top ... he wins
    } else if (keyname === 'up') {
        if (this.y < 80) {
            this.y = starty;
            this.x = startx;
            window.alert(" Hey!!!  You are a winner!");


        }
        this.y -= upmove;

    } else if (keyname === 'down') {
        if (this.y === 400) {
            this.y -= upmove;
        }
        this.y += upmove;
    }

};


Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game



Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


// create an array for the bugs and then create the positions and speed
var allEnemies = [];

for (var i = 1; i < 4; i++) {

    var rand = Math.random();

    allEnemies.push(new Enemy(1, -20 + 82 * i, rand));
}

var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    // push the key button values   
    var keyname = allowedKeys[e.keyCode];
    player.handleInput(keyname);
});
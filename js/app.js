// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = 100;
};

//get a random speed for the Enemy
Enemy.prototype.variableSpeed = function() {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    this.speed = getRandomInt(1,3);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    Enemy.variableSpeed;
    this.x = this.x + (this.speed * dt);
        if (this.x > 505) {
            this.reset();
        }
    this.verifyCollisions();
};

//moves the enemy to an starting position
Enemy.prototype.reset = function (){
    this.x = 20;
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//detects a Collision between the player and all the enemies.
//If the collision occurs, the player goes to her starting position
//If the players reaches the water, the enemies stop and die.
Enemy.prototype.verifyCollisions = function () {
    var playerBox = {x:player.x, y:player.y, width:70, height:70};
    var enemyBox = {x:this.x, y:this.y, width:70, height:70};

    if (playerBox.x < enemyBox.x + enemyBox.width &&
        playerBox.x + playerBox.width > enemyBox.x &&
        playerBox.y < enemyBox.y + enemyBox.height &&
        playerBox.height + playerBox.y > enemyBox.y) {
            player.reset();
    }
    if (player.reachWater()) {
            this.sprite = 'images/enemy-bugdead.png';
            this.speed = 0;
    }
};

// player
var Player = function() {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-cat-girl.png';
    this.lifes = 4;
};

//draws the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//verify that the player is inside the board or canvas
Player.prototype.update = function() {
    if (this.x >  499 || this.x < 0)
        this.reset();
    if (this.y > 400 || this.y < 0)
        this.reset();
};

//puts the player in the starting position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
    this.lifes -= 1;
    //console.log(this.lifes);
    //if (this.lifes <= 0) {
    //    console.log("End of the game");
    //}
};

//verify if the player reaches the water, using the y position.
Player.prototype.reachWater = function() {
    if (this.y < 20) {
        return true;
    }
};

//checks the pressed key to move the player in the correct direction
Player.prototype.handleInput = function(location) {
    switch (location) {
        case 'up':
            this.y -= 100;
            break;
        case 'down' :
            this.y += 100;
            break;
        case 'left':
            this.x -= 100;
            break;
        case 'right':
            this.x += 100;
            break;
      }
};

//Gems
var Gems = function(x,y) {
    this.sprite = 'images/Gem Orange.png';
    this.x = x;
    this.y = y;
};

//Verify when the gems had a change
Gems.prototype.update = function() {
    this.verifyCatching();
};

//draws the gems
Gems.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//verify when the player touches a gem
//if the player touches the gem, the gem will turn into a shiny star.
Gems.prototype.verifyCatching = function () {
    var playerBox = {x:player.x, y:player.y, width:70, height:70};
    var gemBox = {x:this.x, y:this.y, width:70, height:70};

    if (playerBox.x < gemBox.x + gemBox.width &&
        playerBox.x + playerBox.width > gemBox.x &&
        playerBox.y < gemBox.y + gemBox.height &&
        playerBox.height + playerBox.y > gemBox.y) {
            this.sprite = 'images/Star.png';
    }
};

//resets the gems to a position
Gems.prototype.reset = function () {
    this.x = 0;
    this.y = 0;
};

//catches the keyup event
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//creation of enemies
var allEnemies = [new Enemy()];
allEnemies.push(new Enemy(80,60));
allEnemies.push(new Enemy(10,145));
allEnemies.push(new Enemy(160,225));

//creation of the player
var player = new Player();

//creation of the gems
var allGems = [new Gems()];
allGems.push(new Gems(5,60));
allGems.push(new Gems(200,225));
allGems.push(new Gems(400,145));

var kiwi;
var foodBowl;

var game = new Phaser.Game(window.innerWidth, window.innerHeight, 
                             Phaser.AUTO, 'sweetGame', {
                 preload: preload, create: create, update: update
             });

// variables yo
var happinessText; //Phaser.text object that displays the text
var foodBowlText;
// variables yo

function preload(){
	// load all sprites and assets here
  // game.load.image('logo', '/images/logo.png');  
}

function create(){
  // add them to the page
  // game.add.sprite(10, 100, 'logo');

  game.stage.backgroundColor = '#000'; //set background colour
  foodBowl = 70
  kiwi_sprite = game.add.sprite(32, 180, 'kiwi_sprite', 'Kiwi-idle.png');

  feedButton = game.add.button(game.world.centerX - 95, 180, 'kiwi_sprite', addFood, this, 'Kiwi-idle.png', 'Kiwi-dead.png', 'Kiwi-angry.png');


  happinessText = game.add.text(16, 16, 'happiness: ' + 50, { fontSize: '32px', fill: '#e7e7e7' }); //create text object, and place on stage
  foodBowlText = game.add.text(16, 64, 'food bowl: ' + foodBowl, { fontSize: '32px', fill: '#e7e7e7' }); //create text object, and place on stage
  kiwi = new Pet();
}

function addFood(){
  foodBowl = 100;
  waterBowl = 100;
}


function update(){

  // add them to the page
  // game.add.sprite(10, 100, 'logo');
  // game.stage.backgroundColor = '#e7e7e7';

  // each tick update happines by 10 and write to text on screen
  var actionLoop = (10 > (Math.random() * (1000 - 1) + 1));

  if (actionLoop){
    console.log("actionLoop");
    kiwi.update();
    if (kiwi.hasPoop()){
      // add poop to screen
    }
    foodBowl = kiwi.eat(foodBowl)
    happinessText.text = 'happiness: ' + kiwi.happiness;
    foodBowlText.text = 'food bowl: ' + foodBowl;
    waterBowlText.text = 'water bowl: ' + waterBowl;
  }

  if (kiwi.happiness < 45) { 
    kiwi_sprite.frameName = 'Kiwi-dead.png';
  }
}

function Pet(){
  this.petType = 'kiwi';
  this.petState = 'egg';
  this.happiness = 50;
  this.hunger = 0;
  this.thirst = 0;
  this.age = 0;
  this.poop = 0;
  this.getType = function(){
    return this.petType;
  }

  this.hasPoop(){
    if (this.poop > 30){
      this.poop = 0;
      return true;
    }

    return false;
  }

  this.update = function(){
    this.happiness -= 5;
    this.hunger += 10;

  }

  this.eat = function(food){
    var feed = 0;

    if (food == 0){
      this.hunger += 10
      this.thirsty += 5
      this.happiness -= 30;
      return food;
    }

    if (food < 10) {
      feed = food;
      food -= food
    } else {
      feed = 10
      food = food - 10;
    }

    if (this.hunger < feed) {
      feed = feed - this.hunger
      this.hunger = 0;
      this.happiness += 40;
      this.thirsty += 5;
    } else {
      this.hunger -= feed
      this.happiness += 10;
      this.thirsty += 5;
      this.poop += 10;
    }

    return food;
  }
}
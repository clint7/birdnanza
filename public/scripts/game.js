var kiwi;
var foodBowl;
var waterBowl;

var happinessText;
var foodBowlText;
var waterBowlText;

var feedButton;
var waterButton;

var kiwi_sprite;


var game = new Phaser.Game(window.innerWidth, window.innerHeight, 
                             Phaser.AUTO, 'sweetGame', {
                 preload: preload, create: create, update: update
             });



function preload(){
	// load all sprites and assets here
  // game.load.image('logo', '/images/logo.png');  
  game.load.atlasJSONHash('kiwi_sprite', '../img/kiwi_sprite.png', '../img/kiwi_sprite.json');
}

function create(){
  // add them to the page
  // game.add.sprite(10, 100, 'logo');

  game.stage.backgroundColor = '#000'; //set background colour
  foodBowl = 10
  waterBowl = 10


  happinessText = game.add.text(16, 16, 'happiness: ' + 50, { fontSize: '16px', fill: '#e7e7e7' }); //create text object, and place on stage
  foodBowlText = game.add.text(16, 32, 'food bowl: ' + foodBowl, { fontSize: '16px', fill: '#e7e7e7' }); //create text object, and place on stage
  waterBowlText = game.add.text(16, 48, 'water bowl: ' + waterBowl, { fontSize: '16px', fill: '#e7e7e7' }); //create text object, and place on stage
  kiwi = new Pet();
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
    foodBowl = kiwi.eat(foodBowl)
    waterBowl = kiwi.eat(waterBowl)

    happinessText.text = 'happiness: ' + kiwi.happiness;
    foodBowlText.text = 'food bowl: ' + foodBowl;
    waterBowlText.text = 'water bowl: ' + waterBowl;
  }

  if (kiwi.happiness < 45) { 
    kiwi_sprite = game.sprite(32, 180, 'kiwi_sprite', 'Kiwi-dead.png');
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

  this.drink = function(water){
      var drink = 0;

      if (water == 0){
        this.thirsty += 5
        this.happiness -= 30;
        return water;
      }

      if (water < 10) {
        drink = water;
        water -= water
      } else {
        drink = 10
        water = water - 10;
      }

      if (this.thirsty < drink) {
        drink = drink - this.thirsty
        this.happiness += 40;
      } else {
        this.thirsty -= drink
        this.happiness += 10;
        this.poop += 5;
      }

      return water;
    }

  // this.drink = function(water){
  //   if (water < 10) {
  //     drink = thirst;
  //     thirst = thirst - drink
  //   } else {
  //     drink = 10
  //     thirst = thirst - 10;
  //   }

  //   if (thirst < 10) {
  //     drink = drink - thirst
  //     thirst = 0;
  //   } else {
  //     thirst = thirst - 10
  //     water = water - 10;
  //   return water;
  // }
}
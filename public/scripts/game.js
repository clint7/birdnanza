var kiwi;
var foodBowl;
var waterBowl;

var happinessText;
var foodBowlText;
var waterBowlText;
var ageText;

var feedButton;
var waterButton;
var playButton;

var waterBowl;

var ticks;

var backgound;
var kiwi_sprite;
var smoke;
var worm;



var game = new Phaser.Game(window.innerWidth, window.innerHeight, 
                             Phaser.AUTO, 'sweetGame', {
                 preload: preload, create: create, update: update
             });

function preload(){

  game.load.image('background', '../img/birdnanza_bg.png');

  // game.load.atlasJSONHash('water_bowl', '../img/water_bowl.png', '../img/water_bowl.json');


  game.load.atlasJSONHash('kiwi_sprite', '../img/kiwi_sprite.png', '../img/kiwi_sprite.json');
  game.load.atlasJSONHash('smoke', '../img/smoke.png', '../img/smoke.json');
  game.load.atlasJSONHash('buttons', '../img/buttons.png', '../img/buttons.json');
  game.load.atlasJSONHash('worm', '../img/worm.png', '../img/worm.json');

  ticks = "eat";
}

function create(){
  // add them to the page
  // game.add.sprite(10, 100, 'logo');

  background = game.add.sprite(0, -200, 'background');
  // background.height = game.height;

  game.stage.backgroundColor = '#000'; //set background colour
  foodBowl = 70;
  waterBowl = 70;


  kiwi_sprite = game.add.sprite(game.world.centerX - 245, 350, 'kiwi_sprite', 'Kiwi-idle.png');
  worm_sprite = game.add.sprite(game.world.centerX + 95, 440, 'worm', 'worm-1.png');

  walk = worm_sprite.animations.add('walking', ['worm-1.png', 'worm-2.png'], 5, true, false);
  worm_sprite.animations.play('walking');


  // smoke = game.add.sprite(64, 180, 'smoke', 'Smoke1.png');
  // smoke.animations.add('blow');
  // smoke.animations.play('blow', 20, false);




  feedButton = game.add.button(10, 180, 'buttons', addFood, this, 'feed.png', 'feed.png', 'feed.png');
  waterButton = game.add.button(10, 280, 'buttons', addWater, this, 'water.png', 'water.png', 'water.png');


  happinessText = game.add.text(16, 16, 'happiness: ' + 50, { fontSize: '32px', fill: '#e7e7e7' }); 
  foodBowlText = game.add.text(16, 64, 'food bowl: ' + foodBowl, { fontSize: '32px', fill: '#e7e7e7' }); 
  waterBowlText = game.add.text(16, 120, 'water bowl: ' + foodBowl, { fontSize: '32px', fill: '#e7e7e7' }); 
  ageText = game.add.text(16, 150, 'Age: ', { fontSize: '32px', fill: '#e7e7e7' }); 


  kiwi = new Pet();
}

function addFood(){
  foodBowl = 100;
}

function addWater(){
  waterBowl = 100;
}

function update(){

  if (kiwi.petState == "dead") {
    return;
  }

  // each tick update happens by 10 and write to text on screen
  var actionLoop = (10 > (Math.random() * (1000 - 1) + 1));

  if (actionLoop){
    console.log("actionLoop");

    kiwi.update();

    if (kiwi.hasPoop()){
      // add poop to screen
    }

    switch(ticks) {
    case 'eat':
        var grow = (10 > (Math.random() * (10 - 1) + 1));
        if (grow) {
          kiwi.growUp();
        }
        foodBowl = kiwi.eat(foodBowl)
        ticks = 'drink';
        break;
    case 'drink':
        waterBowl = kiwi.drink(waterBowl)
        ticks = 'other'
        break;
    case 'other':
        ticks = 'eat'
        break;
        //some thing else happens here // sleeps maybe? wakes up on next actionLoop?
    }

    if (kiwi.happiness > 100){
      kiwi.happiness = 100;
    }

    happinessText.text = 'happiness: ' + kiwi.happiness;
    foodBowlText.text = 'food bowl: ' + foodBowl;
    waterBowlText.text = 'water bowl: ' + waterBowl;
    ageText.text = 'age: ' + kiwi.age;
  }

  if (kiwi.happiness < 5) { 
    kiwi_sprite.frameName = 'Kiwi-dead.png';
    kiwi.petState = 'dead'
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

  this.hasPoop = function() {
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

  this.growUp = function(){
    //do growing stuff here
    //check to see if state needs to change
    this.age += 1;
  }
}
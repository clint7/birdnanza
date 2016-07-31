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

var ticks;

var backgound;
// var kiwi_sprite;
var water_bowl_sprite;

//worm vars
var worms = [];

var game = new Phaser.Game(window.innerWidth, window.innerHeight, 
                             Phaser.AUTO, 'sweetGame', {
                 preload: preload, create: create, update: update
             });

function preload(){

  game.load.image('background', '../img/birdnanza_bg.png');

  // game.load.atlasJSONHash('water_bowl', '../img/water_bowl.png', '../img/water_bowl.json');

  game.load.atlasJSONHash('bowl', '../img/bowl.png', '../img/bowl.json');
  game.load.atlasJSONHash('kiwi_sprite', '../img/kiwi_sprite.png', '../img/kiwi_sprite.json');
  game.load.atlasJSONHash('smoke', '../img/smoke.png', '../img/smoke.json');
  game.load.atlasJSONHash('butts', '../img/buttons1.png', '../img/buttons1.json');
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

  // kiwi_sprite = game.add.sprite(game.world.centerX - 245, 350, 'kiwi_sprite', 'Kiwi-idle.png');
  
  // worm_sprite = game.add.sprite(game.world.centerX + 95, 520, 'worm', 'worm-1.png');
  kiwi = new Pet(game.add.sprite(game.world.centerX - 245, 520, 'kiwi_sprite', 'Kiwi-idle.png'));
  water_bowl_sprite = game.add.sprite(20, 440, 'bowl', 'Bowl-1.png')
  // worms.push(new Worm(worm_sprite));
  // worm_sprite.anchor.setTo(.5, .5);
  

  // worm_sprite.animations.add('walking', ['worm-1.png', 'worm-2.png'], 3, true, false);
  // worm_sprite.animations.add('stoped', ['worm-1.png', 'worm-1.png'], 3, true, false);


  // smoke.animations.play('blow', 20, false);

  feedButton = game.add.button(10, 180, 'butts', addFood, this, 'Feed-btn-normal.png', 'Feed-btn-normal.png', 'Feed-btn-pressed.png')
  feedButton.scale.setTo(.5, .5)
  waterButton = game.add.button(10, 250, 'butts', addWater, this, 'Drink-btn-normal.png', 'Drink-btn-normal.png', 'Drink-btn-pressed.png')
  waterButton.scale.setTo(.5, .5)
  playButton = game.add.button(10, 320, 'butts', addPlay, this, 'Play-btn-normal.png', 'Play-btn-normal.png', 'Play-btn-pressed.png')
  playButton.scale.setTo(.5, .5)


  worms.push(new Worm(game.add.sprite(game.world.centerX + 30, 520, 'worm', 'worm-1.png')));
  worms.push(new Worm(game.add.sprite(game.world.centerX - 60, 520, 'worm', 'worm-1.png')));


  // feedButton = game.add.button(10, 180, 'buttons', addFood, this, 'Feed-btn-normal.png', 'Feed-btn-normal.png', 'Feed-btn-pressed.png');
  // waterButton = game.add.button(10, 280, 'buttons', addWater, this, 'Drink-btn-pressed.png', 'Drink-btn-normal.png', 'Drink-btn-pressed.png');

  happinessText = game.add.text(game.width - 330, 10, 'happiness: ' + 50, { fontSize: '32px', fill: '#e7e7e7' }); 
  foodBowlText = game.add.text(game.width - 330, 64, 'food bowl: ' + foodBowl, { fontSize: '32px', fill: '#e7e7e7' }); 
  waterBowlText = game.add.text(game.width - 330, 120, 'water bowl: ' + foodBowl, { fontSize: '32px', fill: '#e7e7e7' }); 
  ageText = game.add.text(game.width - 330, 150, 'Age: ', { fontSize: '32px', fill: '#e7e7e7' }); 

// kiwi_sprite = game.add.sprite(game.world.centerX - 245, 350, 'kiwi_sprite', 'Kiwi-idle.png');
 

}

function addFood(){
  foodBowl = 100;

  for (var i = 0; worms.length < 3; i++) {
    randomSpawn = Math.round((Math.random() * (60 - 1) + 1));
    worms.push(new Worm(game.add.sprite(game.world.centerX - 30 + randomSpawn, 520, 'worm', 'worm-1.png')));
  }
}

function addWater(){
  waterBowl = 100;
}

function addPlay(){
  //add play stuff
}

function update(){

  if (kiwi.petState == "dead") {
    return;
  }

  //worm movement
  for (var i = worms.length - 1; i >= 0; i--) {
    doWorm(worms[i])
  }
  // doWorm();

  doPetMove(kiwi);


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
        if (foodBowl < 65 && worms.length > 2){
          killWorm();
        }

        if (foodBowl < 35 && worms.length > 1){
          killWorm();
        }

        if (foodBowl < 5 && worms.length > 0){
          killWorm();
        }

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


  //update kiwi on happiness
  if (kiwi.happiness < 5) { 
    kiwi.sprite.frameName = 'Kiwi-dead.png';
    kiwi.petState = 'dead'
  }

  // update water bowl on how much water is left
  if (waterBowl < 20){
    water_bowl_sprite.frameName = 'Bowl-1.png'
  } else if (waterBowl > 20 &&  waterBowl < 60) {
    water_bowl_sprite.frameName = 'Bowl-2.png'
  } else if (waterBowl > 61) {
    water_bowl_sprite.frameName = 'Bowl-3.png'
  }
}

function doPetMove(pet){
  var actionLoop = (10 > (Math.random() * (1000 - 1) + 1));
  if(!pet.shouldMove){
    if (pet.leftRight > 2){
      if (pet.sprite.scale.x < 0){
        pet.sprite.scale.x *= -1;
      }
      if (pet.sprite.x < window.screen.availWidth - 60){
        pet.sprite.x += 1
      } else {
        pet.leftRight = 1;
      }
    } else {
      if (pet.sprite.scale.x > 0){
        pet.sprite.scale.x *= -1;
      }
      if (pet.sprite.x > 15){
        pet.sprite.x -= 1
      } else {
        pet.leftRight = 3;
      }
    }
  }

  if (actionLoop){
    if (kiwi.shouldMove) {
      kiwi.shouldMove = false;
      kiwi.leftRight = Math.round((Math.random() * (4 - 1) + 1));
      // kiwi.sprite.animations.play('walking');
    } else {
      kiwi.shouldMove = true;
      // worm.sprite.animations.play('stoped');
    }
  }
}

function doWorm(worm){
  var actionLoop = (10 > (Math.random() * (1000 - 1) + 1));
  if(!worm.wormMove){
    if (worm.leftRight > 2){
      if (worm.sprite.scale.x > 0){
        worm.sprite.scale.x *= -1;
      }
      if (worm.sprite.x < window.screen.availWidth - 60){
        worm.sprite.x += 1
      } else {
        worm.leftRight = 1;
      }
    } else {
      if (worm.sprite.scale.x < 0){
        worm.sprite.scale.x *= -1;
      }
      if (worm.sprite.x > 15){
        worm.sprite.x -= 1
      } else {
        worm.leftRight = 3;
      }
    }
  }

  if (actionLoop){
    if (worm.wormMove) {
      worm.wormMove = false;
      worm.leftRight = Math.round((Math.random() * (4 - 1) + 1));
      worm.sprite.animations.play('walking');
    } else {
      worm.wormMove = true;
      worm.sprite.animations.play('stoped');
    }
  }

}

function killWorm(){
  var deadWorm = worms[0]
  worms.splice(0, 1);
  var smoke = game.add.sprite(deadWorm.sprite.x, deadWorm.sprite.y, 'smoke', 'Smoke1.png');
  var smokeAm = smoke.animations.add('eat_worm', ['Smoke1.png','Smoke2.png','Smoke3.png','Smoke4.png','Smoke5.png','Smoke6.png'], 7, false, true);
  smoke.anchor.setTo(.5, .5);
  smokeAm.killOnComplete = true;
  deadWorm.sprite.destroy()
  smoke.animations.play('eat_worm');
}

function Worm(sprite){
  this.wormMove = true;
  this.leftRight = 0;
  this.sprite = sprite;
  this.sprite.anchor.setTo(.5, .5);
  this.sprite.scale.setTo(.6, .6)
  this.sprite.animations.add('walking', ['worm-1.png', 'worm-2.png'], 3, true, false);
  this.sprite.animations.add('stoped', ['worm-1.png', 'worm-1.png'], 3, true, false);
}

function Pet(sprite){
  this.petType = 'kiwi';
  this.petState = 'egg';
  this.happiness = 50;
  this.hunger = 0;
  this.thirst = 0;
  this.age = 0;
  this.poop = 0;
  this.shouldMove = false;
  this.leftRight = 0;
  this.sprite = sprite
  this.sprite.scale.x = 0.7
  this.sprite.scale.y = 0.7
  this.sprite.anchor.setTo(.5, .5);
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
    if (this.age > 5 && this.age < 10){
      this.state = "young"
      this.sprite.scale.setTo(.8, .8)
      return
    }

    if (this.age > 10 && this.age < 15){
      this.state = "middle"
      this.sprite.scale.setTo(.9, .9)
      return
    }

    if (this.age > 15 && this.age < 20){
      this.state = "old"
      this.sprite.scale.setTo(1, 1)
      return
    }

    if (this.age > 20){
      this.state = "letgo"
      return
    }
  }
}
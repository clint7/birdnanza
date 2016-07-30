var game = new Phaser.Game(window.innerWidth, window.innerHeight, 
                             Phaser.AUTO, 'sweetGame', {
                 preload: preload, create: create, update: update
             });

function preload(){
	// load all sprites and assets here
      // game.load.image('logo', '/images/logo.png');  
}

function create(){


  	// add them to the page
      // game.add.sprite(10, 100, 'logo');
      // game.stage.backgroundColor = '#e7e7e7';
}

function update(){
    // add them to the page
      // game.add.sprite(10, 100, 'logo');
      // game.stage.backgroundColor = '#e7e7e7';
}

function Pet(){
  this.petType = 'kiwi';
  this.petState = 'egg';
  this.happyness = 50;
  this.hunger = 0;
  this.thirsty = 0;
  this.age = 0;
  this.poop = 0;
  this.getType = function(){
    return this.petType;
  } 

  this.eat = function(food){
    if (food < 10) {
      feed = food;
      food = food - feed
    } else {
      feed = 10
      food = food - 10;
    }

    if (hunger < 10) {
      feed = feed - hunger
      hunger = 0;
    } else {
      hunger = hunger - 10
      food = food - 10;
    }

    return food;
  }

  this.drink = function(water){

  }
}
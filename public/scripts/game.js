var game = new Phaser.Game(window.innerWidth, window.innerHeight, 
                             Phaser.AUTO, 'sweetGame', {
                 preload: preload, create: create, update: update
             });

// variables yo
var happinessText; //Phaser.text object that displays the text
var happiness = 50; //variable for bird happiness
// variables yo

function preload(){
	// load all sprites and assets here
  // game.load.image('logo', '/images/logo.png');  
}

function create(){
  // add them to the page
  // game.add.sprite(10, 100, 'logo');

  game.stage.backgroundColor = '#000'; //set background colour

  happinessText = game.add.text(16, 16, 'happiness: ' + happiness, { fontSize: '32px', fill: '#e7e7e7' }); //create text object, and place on stage
}

function update(){
  // add them to the page
  // game.add.sprite(10, 100, 'logo');
  // game.stage.backgroundColor = '#e7e7e7';

  // each tick update happines by 10 and write to text on screen
  happiness += 10;
  happinessText.text = 'happiness: ' + happiness;
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
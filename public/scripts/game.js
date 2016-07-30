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
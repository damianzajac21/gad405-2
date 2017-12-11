const mainState = {
//first state
preload: function () {
  game.load.image('bird', 'assets/bird.png');
  game.load.image('pipe', 'assets/pipe.png');
  game.load.audio('flap', 'assets/jump.mp3');
  //loads files
},
//preloads stuff
create: function () {
  this.bird = game.add.sprite(80, 240, 'bird');
  //add bird - sprite is a moving thing
  this.bird.anchor.set(0.5);
  //anchor
  this.birdSpeed = 125;
  //tells how fast pipes should move
  this.birdFlapPower = 300;

  game.physics.arcade.enable(this.bird);
  //enables physics to the bird
  this.bird.body.gravity.y = 800;
  //sets gravity in vertical direction

  this.pipes = game.add.group();
  //add a group of pipes
  this.pipeHole = 120;
  //pipeHole is a space between top and bottom pipes

  this.flapSound = game.add.audio('flap');
  //adds audio
  this.addPipe();
  //adds a pipe

  game.input.onDown.add(this.flap, this);
  //gets function when a button is pressed down
  game.time.events.loop(2000, this.addPipe, this);
  //every two seconds call addPipe function
}, //creates stuff

flap: function() {
  this.flapSound.play();
  this.bird.body.velocity.y = -this.birdFlapPower;
}, //allows the bird to flap

addPipe: function () {
  const pipeHolePosition = 200;
  //size of the pipe hole
  const upperPipe = game.add.sprite(320, pipeHolePosition - 480, 'pipe', 0, this.pipes);

  game.physics.arcade.enable(upperPipe);
  //this tells the browser that this pipe is also part of the physics
  upperPipe.body.velocity.x = -this.birdSpeed;
  //applies speed to the pipe
  upperPipe.events.onOutOfBounds.add(function(pipe) { pipe.destroy(); });

  const lowerPipe = game.add.sprite(320, pipeHolePosition + this.pipeHole, 'pipe', 0, this.pipes);
  game.physics.arcade.enable(lowerPipe);
  lowerPipe.body.velocity.x = -this.birdSpeed;
  lowerPipe.events.onOutOfBounds.add(function(pipe) { pipe.destroy(); });
},
update: function () {
  game.physics.arcade.collide(this.bird, this.pipes, this.die, null, this);
  //this makes the bird die when it collides with the pipes
  if (this.bird.y > game.height) {
    this.die();
  }
},
//updates stuff
die: function () {
  game.state.start('main');
}
};

const game = new Phaser.Game(350, 490);
game.state.add('main', mainState);
game.state.start('main');

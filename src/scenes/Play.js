class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load uzis
        this.load.atlas('flares', './assets/uzi3.png', './assets/flares.json');
        this.load.json('emitter', './assets/emitter.json'); // see './particle editor.js'
        // load images/tile sprite
        this.load.image('gn', './assets/generationnow2.png');
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('rich', './assets/rich10.png');
        this.load.image('gate', './assets/gate8.png');
        this.load.image('projec', './assets/projec7.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('back', './assets/back.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
          // place tile sprite
          this.starfield = this.add.tileSprite(0, 0, 640, 480, 'back').setOrigin(0, 0);
          this.names = [ "Baby Pluto","Lo Mein", "Silly Watch", "POP","You Better Move","Homecoming","Im Sorry","Celebration Station","Bigger Than Life","Chrome Heart Tags","Bust Me","Prices","Urgency","Venetia","Secure the Bag","P2","Futsal Shuffle 2020","That Way" ];
          // white rectangle borders#31144C
          this.add.rectangle(5, 5, 630, 32, 0x31144C).setOrigin(0, 0);
          this.add.rectangle(5, 443, 630, 32,  0x31144C).setOrigin(0, 0);
          this.add.rectangle(5, 5, 32, 455,  0x31144C).setOrigin(0, 0);
          this.add.rectangle(603, 5, 32, 455,  0x31144C).setOrigin(0, 0);
          // green UI background
          this.add.rectangle(37, 42, 566, 64, 0x7D18D6).setOrigin(0, 0);
  
          // add rocket (p1)
          this.p1Rocket = new Rocket(this, game.config.width/2,390, 'projec').setScale(0.5, 0.5).setOrigin(0, 0);
  
          // add spaceship (x3)
          this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'rich', 0, 30).setOrigin(0, 0);
          this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'gn', 0, 20).setOrigin(0, 0);
          this.ship03 = new Spaceship(this, game.config.width, 260, 'gate', 0, 10).setOrigin(0, 0);
  
          // define keyboard keys
          this.song = 1;
          keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
          keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
          keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
          keyPrev = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
          keyNext= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
          keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
          this.input.mouse.capture = true;
          game.input.mousePointer.x;
          this.anims.create({
              key: 'explode',
              frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
              frameRate: 30
          });
          //makes our particle for uzi
          this.uzis = this.add.particles('flares').createEmitter({"active":true,"blendMode":0,"collideBottom":true,"collideLeft":true,"collideRight":true,"collideTop":true,"deathCallback":null,"deathCallbackScope":null,"emitCallback":null,"emitCallbackScope":null,"follow":null,"frequency":0,"gravityX":0,"gravityY":5000,"maxParticles":200,"name":"","on":true,"particleBringToTop":true,"radial":true,"timeScale":1,"trackVisible":false,"visible":true,"accelerationX":0,"accelerationY":0,"angle":{"min":-110,"max":-70},"alpha":1,"bounce":0,"delay":0,"lifespan":{"min":500,"max":900},"maxVelocityX":10000,"maxVelocityY":100,"moveToX":0,"moveToY":0,"quantity":1,"rotate":0,"scaleX":1,"scaleY":1,"tint":0,"x":0,"y":0,"speed":400});
          this.explosion = this.add.particles('spark0').createEmitter({
              x: 1000,
              y: 3000,
              speed: { min: -800, max: 800 },
              angle: { min: 0, max: 360 },
              scale: { start: 1, end: 0 },
              blendMode: 'SCREEN',
              //active: false,
              lifespan: 600,
              gravityY: 800,
              quantity:10
  
          });
          this.played = false;
          this.explosion.explode();
          this.p1Score = 0;
                  // score display
                  let scoreConfig = {
                      fontFamily: 'Courier',
                      fontSize: '28px',
                      backgroundColor: '#FD40FE',
                      color: '#000000',
                      align: 'right',
                      padding: {
                          top: 5,
                          bottom: 5,
                      },
                      fixedWidth: 100
                  }
                  let track1 = {
                    fontFamily: 'Courier',
                    fontSize: '18px',
                    backgroundColor: '#FD40FE',
                    color: '#000000',
                    align: 'right',
                    padding: {
                        top: 4,
                        bottom: 4,
                    },
                    fixedWidth: 100
                }
                let track2 = {
                    fontFamily: 'Courier',
                    fontSize: '18px',
                    backgroundColor: '#FD40FE',
                    color: '#000000',
                    align: 'right',
                    padding: {
                        top: 4,
                        bottom: 4,
                    },
                    fixedWidth: 210
                }
                  this.add.text(175, 54, "Track:", track1);
                  this.add.text(175, 74, "Name:",track1);
                  this.songtitle = this.add.text(375, 74, this.names[this.song], track2);
                  this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);
                  this.track = this.add.text(400, 54,this.song , track1);
                  // game over flag
                  //this.gameOver = false;
                  scoreConfig.fixedWidth = 0;
                 /* this.clock = this.time.delayedCall(60000, () => {
                  this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
                  this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
                  }, null, this);*/
            }
    
    update() {
        if (this.played==false )
    {
        this.song1 = this.sound.add(this.song.toString(), {volume: 0.8});
        this.song1.play();
        this.played= true;
    }
    if(this.song1.isPlaying==false)
    {
        this.song = this.song+1;
        if(this.song<= 0)
        {
            this.song = 18;
        }
        if(this.song>= 19)
        {
            this.song = 1;
        }
        this.song1.stop();
        this.song1 = this.sound.add(this.song.toString(), {volume: 0.8});
        this.song1.play();
    }
    if(Phaser.Input.Keyboard.JustDown(keyPrev))
    {
        
        
        this.song = this.song-1;
        if(this.song<= 0)
        {
            this.song = 18;
        }
        if(this.song>= 19)
        {
            this.song = 1;
        }
        this.song1.stop();
        this.song1 = this.sound.add(this.song.toString(), {volume: 0.8});
        this.song1.play();
    }
    if(Phaser.Input.Keyboard.JustDown(keyNext))
    {
        
        
        this.song = this.song+1;
        if(this.song<= 0)
        {
            this.song = 18;
        }
        if(this.song>= 19)
        {
            this.song = 1;
        }
        this.song1.stop();
        this.song1 = this.sound.add(this.song.toString(), {volume: 0.8});
        this.song1.play();
    }
        this.uzis.setPosition(this.p1Rocket.x+70, this.p1Rocket.y+93);
        this.uzis.setTint(0x31144C);
        if(this.p1Rocket.isFiring)
        {
            this.uzis.setVisible(true);
        }
        else{
            this.uzis.setVisible(false); 
        }
        if (this.gameOver && (Phaser.Input.Keyboard.JustDown(keyF))) {
            this.scene.restart(this.p1Score);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
       
        // scroll starfield
        this.starfield.tilePositionX -= 4;
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
        } 
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        this.track.text = this.song;
        this.songtitle.text = this.names[this.song-1];
    }
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }
    shipExplode(ship) {
        ship.alpha = 0;                         // temporarily hide ship
        // create explosion sprite at ship's position
        this.explosion.setPosition(ship.x,ship.y);
        this.explosion.explode();
        ship.reset();  
        ship.alpha = 1; 
        /*let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });*/
        // score increment and repaint
        this.p1Score += ship.points;

        this.scoreLeft.text = this.p1Score;   
        var space  = Math.round(Math.random()*8)+20;
        this.sound.play(space.toString(), {volume: 0.7});          
    }
}
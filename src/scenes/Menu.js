class Menu extends Phaser.Scene {
  
  constructor() {
        super("menuScene");
         var timer1 = 0;
    }
    preload() {
        //load backround
        this.load.image('round', './assets/backround5.png');
        // load audio

        this.load.audio('sfx_select', './assets/ooh.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }
    create() {
        
        // display menu text
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#C00BE2',
            color: '#3EBEFD',
            align: 'right',
            padding: {
                top: 2,
                bottom: 2,
            },
            fixedWidth: 0
        }
        let centerX = game.config.width/2;
        this.add.image(320, 240, 'round');
        this.add.text(centerX, 15, 'Use ←→ arrows to move & (F) to Fire', menuConfig).setOrigin(0.5);
        this.add.text(centerX, 465, 'Press ← for Easy or → for Hard', menuConfig).setOrigin(0.5);  
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);       
        /*this.add.text(20, 20, "Rocket Patrol Menu");
        
        // launch the next scene
        this.scene.start("playScene");*/
    }
    update() {
        
        //use to make text blink
        //console.log (this.timer1);
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          timer = 0;
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
      }
}
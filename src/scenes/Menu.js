class Menu extends Phaser.Scene {
  
    constructor() {
          super("menuScene");
           var timer1 = 0;
      }
      preload() {
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(190, 270, 320, 50);
        
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
  
        assetText.setOrigin(0.5, 0.5);
        
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(200, 280, 300 * value, 30);
        });
        
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });
  
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
          //load backround
          this.load.image('round', './assets/backround5.png');
          // load audio
          this.load.audio('boom', './assets/fire1.wav');
          this.load.audio('boom1', './assets/reset.wav');
          //tracks
          this.load.audio('1', './assets/babypluto.wav');
          this.load.audio('2', './assets/lomein.wav');
          this.load.audio('3', './assets/sillywatch.wav');
          this.load.audio('4', './assets/pop.wav');
          this.load.audio('5', './assets/youbettermove.wav');
          this.load.audio('6', './assets/homecoming.wav');
          this.load.audio('7', './assets/imsorry.wav');
          this.load.audio('8', './assets/celebrationstation.wav');
          this.load.audio('9', './assets/biggerthanlife.wav');
          this.load.audio('10', './assets/chromehearttags.wav');
          this.load.audio('11', './assets/bustme.wav');
          this.load.audio('12', './assets/prices.wav');
          this.load.audio('13', './assets/urgency.wav');
          this.load.audio('14', './assets/venetia.wav');
          this.load.audio('15', './assets/secure.wav');
          this.load.audio('16', './assets/p2.wav');
          this.load.audio('17', './assets/futsalshuffle.wav');
          this.load.audio('18', './assets/thatway.wav');
          this.load.audio('20', './assets/yah.wav');
          this.load.audio('21', './assets/yah2.wav');
          this.load.audio('22', './assets/yah3.wav');
          this.load.audio('23', './assets/yeah.wav');
          this.load.audio('24', './assets/yeah2.wav');
          this.load.audio('25', './assets/yuh.wav');
          this.load.audio('26', './assets/yuh2.wav');
          this.load.audio('27', './assets/yuh3.wav');
          this.load.audio('28', './assets/yuh4.wav');
          this.load.audio('sfx_select', './assets/ooh.wav');
          this.load.atlas('flares', './assets/uzi3.png', './assets/flares.json');
          this.load.json('emitter', './assets/emitter.json'); // see './particle editor.js'
          // load images/tile sprite
          this.load.image('spark0', './assets/DirtySprite.png');
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
          this.add.text(centerX, 15, 'Use ←→ arrows to change songs,', menuConfig).setOrigin(0.5);
          this.add.text(centerX, 45, 'A & D to move, & (S) to Fire', menuConfig).setOrigin(0.5);
          this.add.text(centerX, 465, 'Q to start and B to return to Menu', menuConfig).setOrigin(0.5);  
          
          // define keys
          keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
          keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);       
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
              spaceshipSpeed: 6   
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");    
          }
          /*if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            timer = 0;
            // hard mode
            game.settings = {
              spaceshipSpeed: 4,
              gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");    
          }*/
        }
  }
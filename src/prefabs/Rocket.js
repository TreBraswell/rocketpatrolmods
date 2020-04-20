// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.input.mouse.capture = true;
        scene.add.existing(this);   // add to existing, displayList, updateList
        this.isFiring = false;      // track rocket's firing status
        
        this.sfxRocket = scene.sound.add('boom', {volume: 0.7});
        this.sfxRocket1 = scene.sound.add('boom1', {volume: 0.7});
        this.fire = false;
    }

    update() {
        
        // left/right movement
        if(!this.isFiring ||this.isFiring) {
            if(keyLEFT.isDown && this.x >=47 ) {
                this.x -= 2;
            } else if (keyRIGHT.isDown && this.x <= 578) {
                this.x += 2;
            }
        }
        // fire button
        if ((Phaser.Input.Keyboard.JustDown(keyF)) && !this.isFiring) {
            this.isFiring = true;
            
            this.sfxRocket.play();  // play sfx
        }
        // if fired, move up
        if(this.isFiring && this.y >= 108) {
            this.y -= 2;
        }
        // reset on miss
        if(this.y <= 108) {
            this.sfxRocket1.play();
            this.reset();
        }
    }
    reset(){
        this.isFiring = false;
        this.y=390;
    }
}
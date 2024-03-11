class Sounds {
    constructor(){
        this.paddleSrc = 'audio/paddle.mp3';
        this.brickSrc = 'audio/brick.mp3';
        this.wallSrc = 'audio/wall.mp3';
        this.roundoverSrc = 'audio/roundover.mp3'

        this.paddleSound = new Audio(this.paddleSrc);
        this.brickSound = new Audio(this.brickSrc);
        this.WallSound = new Audio(this.wallSrc);
        this.roundoverSound = new Audio(this.roundoverSrc);

        this.paddleSound.onerror = this.handleSoundError;
        this.brickSound.onerror = this.handleSoundError;
        this.WallSound.onerror = this.handleSoundError;
        this.roundoverSound.onerror = this.handleSoundError;
    }

    handleSoundError(error){
        console.log('Failed to load sound: ', error.target.src)
    }
    playPaddle(){
        this.paddleSound.play();
    }

    playBrick(){
        this.brickSound.play();
    }

    playWall(){
        this.WallSound.play();
    }

    playRoundOver(){
        this.roundoverSound.play();
    }

}

let sound = new Sounds();
export {sound};

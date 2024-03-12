class Sounds {
    constructor(){
        this.paddleSrc = 'audio/paddle.mp3';
        this.brickSrc = 'audio/brick.mp3';
        this.wallSrc = 'audio/wall.mp3';
        this.roundoverSrc = 'audio/roundover.mp3'
        this.gameOverSrc = 'audio/gameOver.wav'
        this.gameWinSrc = 'audio/gameWin.wav'

        this.paddleSound = new Audio(this.paddleSrc);
        this.brickSound = new Audio(this.brickSrc);
        this.WallSound = new Audio(this.wallSrc);
        this.roundoverSound = new Audio(this.roundoverSrc);
        this.gameOverSound = new Audio(this.gameOverSrc)
        this.gameWinSound = new Audio(this.gameWinSrc);

        this.paddleSound.onerror = this.handleSoundError;
        this.brickSound.onerror = this.handleSoundError;
        this.WallSound.onerror = this.handleSoundError;
        this.roundoverSound.onerror = this.handleSoundError;
        this.gameOverSound.onerror = this.handleSoundError;
        this.gameWinSound.onerror = this.handleSoundError;
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

    playGameOver(){
        this.gameOverSound.play();
    }

    playGameWin(){
        this.gameWinSound.play();
    }
}

let sound = new Sounds();
export {sound};

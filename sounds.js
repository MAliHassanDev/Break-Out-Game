class Sounds {
    constructor(){
        this.paddleSrc = 'audio/paddle.mp3';
        this.brickSrc = 'audio/brick.mp3';
        this.wallSrc = 'audio/wall.mp3';

        this.paddleSound = new Audio(this.paddleSrc);
        this.brickSound = new Audio(this.brickSrc);
        this.WallSound = new Audio(this.wallSrc);


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

}

let sound = new Sounds();
export {sound};

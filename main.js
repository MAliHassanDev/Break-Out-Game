  import { collision } from "./collisionDetection.js";
  import { brickContainer } from "./bricks.js";
  import { sound } from "./sounds.js";
  
  //  create the main Class

  class Figure {
    constructor(element){
      this.intitalPositionX = element.getBoundingClientRect().left; 
      this.initialPositionY = element.getBoundingClientRect().top;
      this.height = element.offsetHeight;
      this.width = element.offsetWidth;
      this.positionX = element.offsetLeft;
      this.positionY = element.offsetTop;
      this.border = parseInt(getComputedStyle(element).getPropertyValue('border-width'))
    }
    getHeight(){
      return this.height;
    }

    getWidth(){
      return this.width;
    }

    setPositionX(positionX){
      this.positionX = positionX;
    }

    getPositionX(){
      return this.positionX;
    }

    setPositionY(positionY){
      this.positionY = positionY;
    }

    getPositionY(){
      return this.positionY;
    }
    getBorder(){
      return this.border;
    }

    getInitialPositionX(){
      return this.intitalPositionX;
    }

    getInitialPositionY(){
      return this.initialPositionY;
    }
  }

  //  create board subclass

  class GameBoard extends Figure{
    constructor(element){
      super(element);
      this.leftWall = 0;
      this.rightWall = this.width - this.getBorder()*2;
      this.topWall = 0;
      this.bottomWall = this.height - this.getBorder()*2; 
      this.score = 0;
      this.lives = 3;
    }

    getTopWall(){
      return this.topWall;
    }

    getLeftWall(){
      return this.leftWall;
    }

    getRightWall(){
      return this.rightWall;
    }

    getBottomWall(){
      return this.bottomWall;
    }

    setScore(value){
      this.score = value;
    }
    getScore(){
      return this.score;
    }

    setLives(value){
      this.lives = value;
    }
    getLives(){
      return this.lives;
    }
  }

  //  create the ball sub class

  class Ball extends Figure{
    constructor(element){
      super(element);
      this.speed = 5;
      this.radius = element.offsetWidth/2;
      this.topCollide = false;
      this.rightCollide = false;
      this.bottomColide = false;
      this.leftCollide = false;
      this.floorCollide = false;
      this.collideWithEdge = false;
      this.currentPositionX = this.positionX;
      this.currentPositionY = this.positionY;
    }

    getRadius(){
      return this.radius;
    }

    setTopCollide(boolean){
      this.topCollide = boolean;
    }
    getTopCollide(){
      return this.topCollide;
    }

    setBottomCollide(boolean){
      this.bottomColide = boolean;
    }
    getBottomCollide(){
      return this.bottomColide;
    }

    setLeftCollide(boolean){
      this.leftCollide = boolean;
    }
    getLeftCollide(){
      return this.leftCollide;
    }

    setRightCollide(boolean){
      this.rightCollide = boolean;
    }
    getRightCollide(){
      return this.rightCollide;
    }

    setCurrentPositionX(position){
      this.currentPositionX = position;
    }
    getCurrentPositionX(){
      return this.currentPositionX;
    }

    setCurrentPositionY(position){
      this.currentPositionY = position; 
    }
    getCurrentPositionY(){
      return this.currentPositionY;
    }

    setFloorCollide(boolean){
      this.floorCollide = boolean;
    }
    getFloorCollide(){
      return this.floorCollide;
    }
    getspeed(){
      return this.speed;
    }

    getCollideWithEdge(){
      return this.collideWithEdge;
    }

    setCollideWithEdge(boolean){
      this.collideWithEdge = boolean;
    }

    moveDown(){
      this.topCollide = true;
      this.bottomColide = false;
    }

    moveUp(){
      this.bottomColide = true;
      this.topCollide = false;
    }

    moveLeft(){
      this.rightCollide = true;
      this.leftCollide = false;
    }
    
    moveRight(){
      this.leftCollide = true;
      this.rightCollide = false;
    }
    
  }

 
  // create the paddle subClass 

  class Paddle extends Figure {
    constructor(element){
      super(element);
      this.speed = 50;
      this.sideCollide = false;
    }

    setSideCollide(boolean){
      this.sideCollide = boolean;
    }
    getSideCollide(boolean){
      return this.sideCollide;
    }
  }








  function resetBricks(){
    let hiddenBricks = document.querySelectorAll('.brickHidden');
    console.log(hiddenBricks)
    hiddenBricks.forEach(brick => {
      brick.setAttribute('data-brick','brick')
      brick.classList.remove('brickHidden');
    })

    bricks = document.querySelectorAll('[data-brick]');
  }




  // restart the game if user clicks on the restart button
  function restartGame(){
    
    document.body.style.cursor = 'all';
    document.querySelector('[data-gameOver_Section]').classList.add('hidden');
    gameBoard.addEventListener('click', startGame)
    resetBallPaddlePosition();

    // reset the sore and lives
    board.setScore(0);
    board.setLives(3);
    document.querySelector('[data-scoreValue]').innerHTML = board.getScore();
    document.querySelector('[data-lives]').innerHTML = board.getLives();

    // display the start message
    document.querySelector('[data-startIcon]').classList.remove('hidden');
    document.querySelector('[data-start_text]').classList.remove('hidden');

    // hide the lives and score
    document.querySelector('[data-score]').style.opacity = '0';
    document.querySelector('[data-livesWrapper]').style.opacity = '0'

    resetBricks();
  }

  // gameOver

  function gameOver() {

    ball.setFloorCollide(true)
    document.querySelector('[data-gameOver_Section]').classList.remove('hidden');
    document.querySelector('[data-finalScore]').innerHTML = board.getScore();
    document.body.style.cursor = 'all';

    document.querySelector('[data-playAgain]').addEventListener('click', restartGame)
  }


  function resetBallPaddlePosition(){
    // reset ball position
    let ballInitialPositionY =  parseInt(ball.getInitialPositionY() - board.getPositionY() - board.getBorder());
    let ballInitialPositionX = parseInt(ball.getInitialPositionX() - board.getPositionX() - board.getBorder());

    ballElement.style.top = `${ballInitialPositionY}px`
    ballElement.style.left = `${ballInitialPositionX}px`

    ball.setPositionX(ballInitialPositionX);
    ball.setPositionY(ballInitialPositionY);
    ball.setCurrentPositionY(ballInitialPositionY);
    ball.setCurrentPositionX(ballInitialPositionX);
  

    // reset paddle position
    let paddleInitialPositionX = parseInt(paddle.getInitialPositionX() - board.getPositionX() - board.getBorder())
    paddle.setPositionX(paddleInitialPositionX);

    paddleElement.style.left = paddle.getPositionX() +'px';

    ball.setBottomCollide(false);
    ball.setTopCollide(false);
    
  }



  // Roud Over 

  function roundOver(){

    ball.setFloorCollide(true);
    sound.playRoundOver()
    
    document.body.style.cursor = 'auto'
    document.removeEventListener('mousemove' ,updatePaddlePosition);
    
    // again add event listener to  Game bordboard
    

    // deduct one live
    board.setLives(board.getLives() - 1);

    if(board.getLives() > 0){

      document.querySelector('[data-lives]').innerHTML = board.getLives();
      setTimeout( ()=>{
        gameBoard.addEventListener('click', startGame)

        document.querySelector('[data-startIcon]').classList.remove('hidden');
        document.querySelector('[data-start_text]').classList.add('hidden')

        resetBallPaddlePosition();
      },2000)
    
    }else{
      sound.playGameOver();
      document.querySelector('[data-gameover_text]').innerHTML = 'Try Again!'
      document.querySelector('[data-lives]').innerHTML = board.getLives();
      gameOver();
    }
    

  }

  // update the score 

  function updateScore(){
    board.setScore(board.getScore() + 100)
    document.querySelector('[data-scoreValue]').innerHTML = board.getScore();
  }

  // remove the brick after collision

  function removeBrick(brick){
    brick.removeAttribute('data-brick');
    brick.classList.add('brickHidden')

    // update the bricks arraay
    bricks = document.querySelectorAll('[data-brick]');
    if(bricks.length === 0){
      sound.playGameWin();
      ballElement.style.opacity = '0'
      document.querySelector('[data-gameover_text]').innerHTML = 'Well done!'
      gameOver();
    }
  }


  // change ball direction X 
  
  function changeBallDirectionX(){
    if(ball.getLeftCollide()){
      ball.setRightCollide(true);
      ball.setLeftCollide(false)
    }else{
      ball.setLeftCollide(true);
      ball.setRightCollide(false)
    }
  }


  // changeball direction Y

  function changeBallDirectionY(){
    if(ball.getTopCollide()){
      ball.setTopCollide(false);
      ball.setBottomCollide(true)
    }else {
      ball.setTopCollide(true);
      ball.setBottomCollide(false)
    }
  }



  //  render the game
  function render(){

    // paddle 
    paddleElement.style.left = paddle.getPositionX() + 'px';
    
    // ball 
    ballElement.style.top = ball.getPositionY() + 'px';
    ballElement.style.left = ball.getPositionX() + 'px';


  }

//  udate the current ball position
  function updateBallPositon(){


    // vertical movemrnt
    let verticalMovement = 0;

    if(!ball.getTopCollide() && ball.getBottomCollide()) {
      verticalMovement = -ball.getspeed();
    } else if(ball.getTopCollide() && !ball.getBottomCollide()){
      verticalMovement = ball.getspeed();
    } else verticalMovement = -ball.getspeed();

    ball.setCurrentPositionY(ball.getCurrentPositionY() + verticalMovement);
    ball.setPositionY(ball.getCurrentPositionY());

    // horizantal moverment
    let horizantalMovement = 0;

    if(!ball.getRightCollide() && ball.getLeftCollide()){
      horizantalMovement = ball.getspeed();
    } else if(ball.getRightCollide() && !ball.getLeftCollide()){
      horizantalMovement = -ball.getspeed();
    } else horizantalMovement = ball.getspeed();
    
    ball.setCurrentPositionX(ball.getCurrentPositionX() + horizantalMovement);
    ball.setPositionX(ball.getCurrentPositionX());
  }


  // animate the game in loop
  function animate(){
    if(ball.getFloorCollide()) return;

    render();
    updateBallPositon();

    //  chkeck for collisions 
    if(collision.withWalls()) sound.playWall();
    
    // check for collision with paddle
    if(!paddle.getSideCollide()){

      if(collision.withPaddle()){
        sound.playPaddle();
        paddle.setSideCollide(true);
        changeBallDirectionY();
      }

      if(ball.getCollideWithEdge()){
        sound.playPaddle();
        paddle.setSideCollide(true);
        changeBallDirectionY();
        changeBallDirectionX();
      }
    }

    
    // check for collision with bricks
    bricks.forEach(child => {
      let brick = new Figure(child);
      if(collision.withBricks(brick)){
        paddle.setSideCollide(false);
        sound.playBrick()
        updateScore();
        removeBrick(child);
        console.log(brick.getHeight())
      }
    })

    // check for collision with floor 

    if(collision.withFloor()){
      roundOver();
    }

    requestAnimationFrame(animate);
  }

  
  // update the paddle position
  function updatePaddlePosition(e){
    
    let clientX = (e.clientX - board.positionX -board.border);
    
    let paddleMovementStartPoint = paddle.getWidth()/2;
    let paddleMovenentEndPoint = board.width - board.border*2 - paddle.getWidth()/2;
    
    if(clientX <= paddleMovementStartPoint) clientX = paddleMovementStartPoint;
    else if(clientX >= paddleMovenentEndPoint) clientX = paddleMovenentEndPoint; 
    paddle.setPositionX(clientX-paddle.getWidth()/2)
  }
 



  function startGame(e){

    e.preventDefault();
    document.querySelector('[data-startIcon]').classList.add('hidden');
    
    ball.setFloorCollide(false)

    // display the score and lives
    ballElement.style.opacity = '1'
    document.querySelector('[data-score]').style.opacity = '1';
    document.querySelector('[data-livesWrapper]').style.opacity = '1'

    document.body.style.cursor = 'none'
    gameBoard.removeEventListener('click', startGame);

    document.addEventListener('mousemove' ,updatePaddlePosition)

    requestAnimationFrame(animate);
  }












  
  // select all bricks 
  let bricks = document.querySelectorAll('[data-brick]');

  
  // Define ball object
 const ballElement = document.querySelector('[data-ball');
 let ball = new Ball(ballElement);

 

  // Define paddle object 
  let paddleElement = document.querySelector('[data-paddle]');
  let paddle = new Paddle(paddleElement);


  // define gameBoard object
  const gameBoard = document.querySelector('[data-board]');
  let board = new GameBoard(gameBoard);

  // start the game if user clicks
  gameBoard.addEventListener('click', startGame)


  export {ball,paddle,board}

  // git added a new comment































 















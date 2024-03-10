  import { collision } from "./collisionDetection.js";
  import {brickContainer}  from "./bricks.js"
  //  create the main Class

  class Figure {
    constructor(element){
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
  }

  //  create board subclass

  class GameBoard extends Figure{
    constructor(element){
      super(element);
      this.leftWall = 0;
      this.rightWall = this.width - this.getBorder()*2;
      this.topWall = 0;
      this.bottomWall = this.height - this.getBorder()*2; 
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

  }

  //  create the ball sub class

  class Ball extends Figure{
    constructor(element){
      super(element);
      this.speed = 2;
      this.radius = element.offsetWidth/2;
      this.topCollide = false;
      this.rightCollide = false;
      this.bottomColide = false;
      this.leftCollide = false;
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

    getspeed(){
      return this.speed;
    }
  }

 
  // create the paddle subClass 

  class Paddle extends Figure {
    constructor(element){
      super(element);
      this.speed = 50;
      this.sideCollide = false;
      this.currentPosition = element.offsetLeft + this.getWidth()/2;
    }

    setSideCollide(boolean){
      this.sideCollide = boolean;
    }
    getSideCollide(boolean){
      return this.sideCollide;
    }

    setCurrentPositionX(position){
      this.currentPosition = position;
    }
    getCurrentPositionX(){
      return this.currentPosition;
    }
  }


  // remove the brick after collision

  function removeBrick(brick){
    brick.removeAttribute('data-brick');
    brick.classList.add('hidden')

    // update the bricks arraay
    bricks = document.querySelectorAll('[data-brick]');
  }

  // changeball direction

  function changeBallDirection(){
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
    paddleElement.style.left = paddle.getCurrentPositionX()-paddle.getWidth()/2 + 'px';
    
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
  function animate(gamever){

    render();
    updateBallPositon();

    //  chkeck for collisions 
    collision.withWalls();
    
    // check for collision with paddle
    if(!paddle.getSideCollide()){

      if(collision.withPaddle()){
        paddle.setSideCollide(true);
        changeBallDirection();
      }
    }

    // check for collision with bricks
    bricks.forEach(child => {
      let brick = new Figure(child);
      if(collision.withBricks(brick)){
        paddle.setSideCollide(false);
        changeBallDirection();
        removeBrick(child);
      }
    })



    requestAnimationFrame(animate);
  }

  
  // update the paddle position
  function updatePaddlePosition(e){
    
    let clientX = (e.clientX - board.positionX -board.border);
    
    let boardStart = paddle.getWidth()/2;
    let boardEnd = board.width - board.border*2 - paddle.getWidth()/2;
    
    if(clientX <= boardStart) clientX = boardStart;
    else if(clientX >= boardEnd) clientX = boardEnd; 
    paddle.setCurrentPositionX(clientX);
    paddle.setPositionX(clientX-paddle.getWidth()/2)
  }
 



  function startGame(e){
    e.preventDefault();
    document.querySelector('[data-startIcon]').classList.add('hidden');

    document.body.style.cursor = 'none';
    gameBoard.removeEventListener('click', startGame);

    document.addEventListener('mousemove' ,updatePaddlePosition)

    requestAnimationFrame(animate);
  }












  
  // define collision object 

  
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







  document.querySelector('[data-text]').innerHTML = `ballX ${ball.getPositionX()+ball.getWidth()},  RightWall: ${board.getRightWall()},  boardWidth: ${board.getWidth()}`



































  // function checkForCollision(brick){
    
  //   if(ball.cordX+ball.fHeight >= brick.cordX && ball.cordX <= brick.cordX+brick.fWidth && ball.cordY+ball.fHeight >= brick.cordY && ball.cordY <= brick.cordY+brick.fHeight){
  //     ballElement.style.backgroundColor = 'red';
  //     return true;
  //   } 
  //   return false;
  // }
  

  // function defineBricks(){
  //   const brickContainer = document.querySelector('[data-brick-container]');
  //   [...brickContainer.children].forEach(child=>{
  //     let brick = new Figure(child);
  //     if(checkForCollision(brick)){
  //      child.removeAttribute('data-brick');
  //      child.classList.add('hidden');
  //     }
  //   });
  // }






// })();

















// // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// // create bricks 
// let brickContainers;
// let brickCollision;
// (function(){
//     brickCollision = false;
//     brickContainers = document.querySelector('.bricks-container');
//     const colors = ['#C9BC0C','#C81CA9','#988558','#ED0F0F','#2DF20F','#23ACDA','#F86203','#CBCBCB']
//     const numRows = 8;
//     const numColumns = 12;
//     for(let i=0;i<numRows;i++){
//       let color = colors[i]
//       for(let j=0;j<numColumns;j++){
//         const brick = document.createElement('li');
//         brick.classList.add('brick');
//         brick.setAttribute('data-brick', 'brick');
//         brick.style.backgroundColor = color;
//         brickContainers.appendChild(brick);
//       }
//     }
// })();


// // Defeine gameboard object
// const board = document.getElementById('Board');
// const gameBoard = {
//   height: board.offsetHeight,
//   width: board.offsetWidth,
//   border: 40,
//   boardArea: function(element){
//     return this.width - this.border - element;
//   }
// };

// // create walls object 

// const walls = {
//   top: 0,
//   bottom: gameBoard.height-gameBoard.border,
//   left: 10,
//   right: gameBoard.boardArea(20)
// }



// // create ball Class
   
//   class BALL{
//     constructor(element,size,radius,speed,positionX,positionY,directionX,
//       directionY,topCollide,bottomCollide,leftCollide,rightCollide){
//       this.element = element;
//       this.size = size;
//       this.radius = radius;
//       this.speed = speed;
//       this.positionX = positionX;
//       this.positionY = positionY;
//       this.directionX = this.speed;
//       this.directionY = this.speed;
//       this.topCollide = topCollide;
//       this.rightCollide = rightCollide;
//       this.leftCollide =  leftCollide;
//       this.bottomCollide = bottomCollide;
//     }

//     moveUp(){
//       this.positionY -= this.directionY;
//       this.render()
//     }

//     moveRight(){
//       this.positionX += this.directionX;
//       this.render();
//     }

//     moveBottom(){
//       this.positionY += this.directionY;
//       this.render();
//     }

//     moveLeft(){
//       this.positionX -= this.directionX;
//       this.render();
//     }

//     bounceX(){
//        if(this.rightCollide === true ){
//         this.leftCollide = true;
//         this.rightCollide = false;
//         this.bottomCollide = true;
//         this.topCollide = false;
//         this.directionX = this.speed+2;
//         brickCollision = false;
//        } else {
//         this.rightCollide = true; 
//         this.leftCollide = false;
//         this.topCollide = false;
//         this.bottomCollide = true;
//         this.directionX = this.speed+2;
//         brickCollision = false;
//        }
//     }

//     bounceY(){
//       if(this.topCollide === false && this.bottomCollide === false){
//         this.bottomCollide = true;
//       } else if(this.topCollide === true){
//         this.bottomCollide = true;
//         this.topCollide = false;
//         brickCollision = false;
//         this.directionY = this.speed;
//       } else{
//         this.topCollide = true;
//         this.bottomCollide = false;
//         this.directionY = this.speed;
//         brickCollision = false;
//       }
     
//     }

//     render(){
//       this.element.style.top = `${this.positionY}px`
//       this.element.style.left = `${this.positionX}px`
//     }
//   }

// // create ball object 

// const ballElement = document.getElementById('ball_');
// const ball = new BALL(ballElement,ballElement.offsetHeight,ballElement.offsetWidth/2,4,
//   ballElement.offsetLeft,ballElement.offsetTop,false,false,false,false);
 



// //  create paddle class

// class PADDLE {
//   constructor(element,positionX,positionY,size,height,boardArea,speed,sideCollide){
//     this.element = element;
//     this.positionX = positionX;
//     this.positionY = positionY;
//     this.size = size;
//     this.height = height;
//     this.boardArea = boardArea;
//     this.speed = speed;
//     this.sideCollide = sideCollide;
//   }

//   moveRight(){
//     if(this.positionX < this.boardArea) {
//       if(this.positionX + this.speed > this.boardArea) this.positionX += this.boardArea-this.positionX;
//       else this.positionX += this.speed;
//     }
//     this.render();
//   }

//   moveLeft(){
//     if(this.positionX>0){
//       if(this.positionX - this.speed < 0) this.positionX -= this.positionX;
//       else this.positionX -= this.speed;
//     }
//     this.render();
//   }

//   render(){
//     this.element.style.left = `${this.positionX}px`;
//   }
// }

// // create paddle object

// const paddleElement = document.getElementById('paddle_');
// let paddle = new PADDLE(paddleElement,paddleElement.offsetLeft,paddleElement.offsetTop,paddleElement.offsetWidth,
//   paddleElement.offsetHeight,gameBoard.boardArea(paddleElement.offsetWidth),50,false);





// //  create bricks class

// class Bricks {
//   constructor(element){
//     this.height = element.offsetHeight;
//     this.width = element.offsetWidth;
//     this.positionX = element.offsetLeft;
//     this.positionY = element.offsetTop;
//   }
// }


// // create collision detector Class

// class CollisionDectector{
//   constructor(walls,paddle,ball){
//     this.walls = walls;
//     this.paddle = paddle;
//     this.ball = ball;
//   }

//   wallsCollision(){
//     if(ball.positionY < walls.top) {
//       ball.topCollide = true;
//       ball.bottomCollide = false;
//       paddle.sideCollide = false;
//       brickCollision = false;
//     }

//     if(ball.positionX <= walls.left){
//       ball.leftCollide = true;
//       ball.rightCollide = false;
//       paddle.sideCollide = false;
//       brickCollision = false;
//     } else if(ball.positionX >= walls.right ){
//       ball.rightCollide = true;
//       ball.leftCollide - false;
//       paddle.sideCollide = false;
//       brickCollision = false;
//     }
//   }

//   baselineCollision(){
//     if(ball.positionY >= walls.bottom) return true;
//   }


//   ballPaddleCollision(){
//     if(ball.positionX + (ball.size-ball.radius) > paddle.positionX && ball.positionX-ball.radius < paddle.positionX+paddle.size
//     && ball.positionY+ball.size >= paddle.positionY && ball.positionY <= paddle.positionY+paddle.height){

//       if(ball.positionY+ball.size === paddle.positionY && ball.positionX-(ball.radius/2) > paddle.positionX && ball.positionX+(ball.radius/2) < paddle.positionX+paddle.size && paddle.sideCollide === false) {
//         ball.bounceY();
//       }else if(ball.positionY+ball.size != paddle.positionY && paddle.sideCollide === false ){
//         paddle.sideCollide = true;
//         ball.bounceX();
//       }
//     }
//   }

  
// }

// // define collisionDetector object

// let collisionDectector = new CollisionDectector(ball,paddle,walls);



// // define the bricks objects

// const bricksElement = document.querySelectorAll('.brick')

// // Update the Direction of the ball after collision

// function updateBallPosition(){

//   // if top or bottom edge of  ball is colliding  
//   if(ball.topCollide) ball.moveBottom();
//   else ball.moveUp();


//   // if Right or left Edge of ball is colliding 
//   if(ball.rightCollide){
//     ball.moveLeft();
//   }else if(!ball.rightCollide && !ball.leftCollide){
//     ball.moveRight();
//   }else ball.moveRight();


// }



// //  checks for brick ball coliision
// function checkForCollision(brick){
    
//   if(ball.positionX+ball.size >= brick.positionX && ball.positionX <= brick.positionX+brick.width && ball.positionY+ball.size >= brick.positionY && ball.positionY <= brick.positionY+brick.height){
//     if(ball.positionX+ball.size <= brick.positionX || ball.positionX >= brick.positionX+brick.width){
//       ball.bounceX();
//     }else {
//       ball.topCollide = true;
//       ball.bottomCollide = false;
//     }
//     brickCollision = true;
//   } else {
//     brickCollision = false;
//     console.log(brickCollision);
//   }
  
//   return brickCollision;
// }

// //  define bricks
// function defineBricks(){
//   const bricks = document.querySelectorAll('[data-brick]');
//   bricks.forEach(child=>{
//     let brick = new Bricks(child);
//     if(!brickCollision){
//       if(checkForCollision(brick)){
//         child.removeAttribute('data-brick');
//         child.style.backgroundColor = 'transparent'
//         child.style.border = 'none'
//        }
//     }
//   });
// }


// // after game is over 
// function gameOver(){
//   document.removeEventListener('keydown', startPaddleMovement);

// }

// function gameLoop(start){
//   if(!start) return;
//   defineBricks();
//   collisionDectector.wallsCollision()
//   collisionDectector.ballPaddleCollision();
//   if(collisionDectector.baselineCollision()){
//     gameOver();
//     return;
//   }

//   updateBallPosition();
//   requestAnimationFrame(gameLoop);

//   textContainer.innerHTML = brickCollision;
// }

// function startPaddleMovement(e){
//   e.preventDefault();
//   if(e.key === 'ArrowRight'){
//     paddle.moveRight();
//   } else if(e.key === 'ArrowLeft'){
//     paddle.moveLeft();
//   }
// }

// function startGame(startButton){
//   startButton.style.pointerEvents = 'none';
//   board.style.cursor = 'none';

//   // chek if right or left key is pressed
//   document.addEventListener('keydown', startPaddleMovement);

//   // start the game
//   gameLoop(true);
// }



//  // for Test purposes
//  const textContainer = document.getElementById('text');
//  const text2Container = document.getElementById('text2');
 
//  // ----------------------------------------------















// //  Start the game when Start Button is clicked
// (function(){
//   const startButton = document.getElementById('startGame');
//   startButton.addEventListener('click', ()=>{
//     startGame(startButton);
//   });
// })();

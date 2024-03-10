import {ball,paddle,board} from './main.js'


class CollisionDetection{


    withWalls(){
        if(ball.getPositionY() <= board.getTopWall()){
            ball.setTopCollide(true);
            ball.setBottomCollide(false);
            paddle.setSideCollide(false)
        } 
        
        if(ball.getPositionX()+ball.getWidth() >= board.getRightWall()) {
            ball.setRightCollide(true); 
            ball.setLeftCollide(false);
            paddle.setSideCollide(false)
        }

        if(ball.getPositionX() <= board.getLeftWall()){
            ball.setLeftCollide(true);
            ball.setRightCollide(false);
            paddle.setSideCollide(false)
        }
    }

    withPaddle(){
        document.querySelector('[data-text]').innerHTML = `ballX ${ball.getPositionX()+ball.getWidth()},  RightWall: ${board.getRightWall()},  boardWidth: ${board.getWidth()}`
        if(ball.getPositionX()+ball.getWidth() >= paddle.getPositionX()  && ball.getPositionX() <= paddle.getPositionX()+paddle.getWidth()
         && ball.getPositionY()+ball.getHeight() >= paddle.getPositionY() && ball.getPositionY()+ball.getHeight() <= paddle.getPositionY()+paddle.getHeight()){
            return true;
        }
    }

    withBricks(brick){
        if(ball.getPositionX()+ball.getWidth() >= brick.getPositionX()  && ball.getPositionX() <= brick.getPositionX()+brick.getWidth()
         && ball.getPositionY()+ball.getHeight() >= brick.getPositionY() && ball.getPositionY() <= brick.getPositionY()+brick.getHeight()){
            return true;
        }
    }


}

let collision = new CollisionDetection();

export {collision}
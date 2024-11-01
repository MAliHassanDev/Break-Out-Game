import {ball,paddle,board} from './main.js'


class CollisionDetection{
    withWalls(){
        if(ball.getPositionY() <= board.getTopWall()){
            ball.setTopCollide(true);
            ball.setBottomCollide(false);
            paddle.setSideCollide(false)
            ball.setCollideWithEdge(false)
            return true;
        } else if(ball.getPositionX()+ball.getWidth() >= board.getRightWall()) {
            ball.setRightCollide(true); 
            ball.setLeftCollide(false);
            paddle.setSideCollide(false)
            ball.setCollideWithEdge(false)
            return true;
        } else if(ball.getPositionX() <= board.getLeftWall()){
            ball.setLeftCollide(true);
            ball.setRightCollide(false);
            paddle.setSideCollide(false)
            ball.setCollideWithEdge(false)
            return true;
        }
    }

    withPaddle(){
        if(ball.getPositionX()+ball.getWidth() >= paddle.getPositionX()  && ball.getPositionX() <= paddle.getPositionX()+paddle.getWidth()
         && ball.getPositionY()+ball.getHeight() >= paddle.getPositionY() && ball.getPositionY()+ball.getHeight() <= paddle.getPositionY()+paddle.getHeight()){
            
            // check if ball is collding with the side of paddles
            if(ball.getPositionX()+ball.getWidth() <= paddle.getPositionX()+ball.getRadius() || ball.getPositionX() >= paddle.getPositionX()+paddle.getWidth()-ball.getRadius() ){
                ball.setCollideWithEdge(true)
            }else {
                return true;
            }
        }
    }

    withBricks(brick){
        if(ball.getPositionX()+ball.getWidth() >= brick.getPositionX()  && ball.getPositionX() <= brick.getPositionX()+brick.getWidth()
         && ball.getPositionY()+ball.getHeight() >= brick.getPositionY() && ball.getPositionY() <= brick.getPositionY()+brick.getHeight()){
            
            if(ball.getPositionY() >= brick.getPositionY()+brick.getHeight()/3){
                ball.moveDown()
            }else{
                ball.moveUp();
            }

            if(ball.getPositionX()+ball.getWidth()/2 <= brick.getPositionX()){
                ball.moveLeft();
            }else if(ball.getPositionX()+ball.getWidth()/2 >= brick.getPositionX()+brick.getWidth()){
                ball.moveRight();
            }

            return true;
        }
    }

    withFloor(){
        if(ball.getPositionY() >= board.getBottomWall()+board.getBorder()){
            return true
        }
    }
}

let collision = new CollisionDetection();

export {collision}
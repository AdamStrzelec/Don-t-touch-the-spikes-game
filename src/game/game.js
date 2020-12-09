import Bird from '../bird/bird';
import { birdDirections } from '../birdDirectins';

export default class Game {
    #bird;
    #isGameInProgress;
    #isGameOver;
    #boardWidth;
    #boardHeight;

    constructor(boardWidth, boardHeight){
        this.#bird = new Bird(boardWidth/2-20, boardHeight/2-30);
        this.#isGameInProgress = true;
        this.#isGameOver = false;
        this.#boardWidth = boardWidth;
        this.#boardHeight = boardHeight;
    }

    handleTouchEvent(){
        if(this.#isGameInProgress){
            this.jumpBird()
        }else{
            //to do
        }
    }

    moveBird(){
        this.#bird.moveBird();
        if(this.#bird.positionX<=30){
            this.#bird.flightDirection = birdDirections.right;   
        }
        if(this.#bird.positionX>=this.#boardWidth-this.#bird.width-30){
            this.#bird.flightDirection = birdDirections.left;
        }
        
    }
    jumpBird(){
        this.#bird.jumpBird();
    }

    set isGameInProgress(isGameInProgress){
        this.#isGameInProgress = isGameInProgress;
    }

    get isGameInProgress(){
        return this.#isGameInProgress
    }

    set isGameOver(isGameOver){
        this.#isGameOver = isGameOver;
    }

    get isGameOver(){
        return this.#isGameOver;
    }

    get birdPositionX(){
        return this.#bird.positionX;
    }
    get birdPositionY(){
        return this.#bird.positionY;
    }
    get birdDirection(){
        return this.#bird.flightDirection;
    }
    get birdWidth(){
        return this.#bird.width;
    }
    get birdHeight(){
        return this.#bird.height;
    }
}

import Bird from '../bird/bird';
import Spikes from '../spikes/spikes';
import { birdDirections } from '../../birdDirectins';

export default class Game {
    #bird;
    #leftWallSpikes;
    #rightWallSpikes;
    #isGameInProgress;
    #isGameOver;
    #boardWidth;
    #boardHeight;

    constructor(boardWidth, boardHeight){
        this.#bird = new Bird(boardWidth/2-20, boardHeight/2-30);
        this.#leftWallSpikes = new Spikes('left', boardWidth, boardHeight, 'right', 11);
        this.#rightWallSpikes = new Spikes('right', boardWidth, boardHeight, 'right', 11);
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

    renderGame(){
        this.#bird.moveBird();
        this.#leftWallSpikes.moveSpikes();
        this.#rightWallSpikes.moveSpikes();
        if(this.#bird.positionX<=30){
            this.#bird.flightDirection = birdDirections.right; 
            this.#rightWallSpikes.drawSlots(4);
            this.#rightWallSpikes.showSpikes();
            this.#leftWallSpikes.hideSpikes();
        }
        if(this.#bird.positionX>=this.#boardWidth-this.#bird.width-30){
            this.#bird.flightDirection = birdDirections.left;
            this.#leftWallSpikes.drawSlots(4)
            this.#leftWallSpikes.showSpikes();
            this.#rightWallSpikes.hideSpikes();
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
    get leftWallSpikes(){
        return this.#leftWallSpikes.spikesSlotsArray;
    }
    get rightWallSpikes(){
        return this.#rightWallSpikes.spikesSlotsArray;
    }
}

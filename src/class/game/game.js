import Bird from '../bird/bird';
import Spikes from '../spikes/spikes';
import Candy from '../candy/candy';
import { birdDirections } from '../../birdDirectins';

export default class Game {
    #bird;
    #leftWallSpikes;
    #rightWallSpikes;
    #candy;
    #isGameInProgress;
    #isGameOver;
    #boardWidth;
    #boardHeight;

    constructor(boardWidth, boardHeight){
        this.#bird = new Bird(boardWidth/2-20, boardHeight/2-30);
        this.#leftWallSpikes = new Spikes('left', boardWidth, boardHeight, 'right', 11);
        this.#rightWallSpikes = new Spikes('right', boardWidth, boardHeight, 'right', 11);
        this.#candy = null;
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
        if(!this.#isGameOver){
            this.#bird.moveBird();
        }
        if(this.#candy){
            if(this.#candy.detectCollision(this.#bird.width, this.#bird.height, this.#bird.positionX, this.#bird.positionY)){
                this.#candy = null;
            }
        }
        this.#leftWallSpikes.moveSpikes();
        this.#rightWallSpikes.moveSpikes();

        if(this.birdTouchedLeftWall()){
            if(this.#leftWallSpikes.detectCollision(this.#bird.positionY, this.#bird.height)){
                this.#isGameOver = true;
            }else{
                this.#bird.flightDirection = birdDirections.right; 
                this.#rightWallSpikes.drawSlots(5);
                this.#rightWallSpikes.showSpikes();
                this.#leftWallSpikes.hideSpikes();
                if(!this.#candy)this.#candy = new Candy(this.#bird.flightDirection, this.#boardWidth, this.#boardHeight);
            }
        }
        if(this.birdTouchedRightWall()){
            if(this.#rightWallSpikes.detectCollision(this.#bird.positionY, this.#bird.height)){
                this.#isGameOver = true;
            }else{
                this.#bird.flightDirection = birdDirections.left;
                this.#leftWallSpikes.drawSlots(5)
                this.#leftWallSpikes.showSpikes();
                this.#rightWallSpikes.hideSpikes();
                if(!this.#candy)this.#candy = new Candy(this.#bird.flightDirection, this.#boardWidth, this.#boardHeight);
            }
        }
        if(this.birdTouchedTopWall()){
            this.#isGameOver = true;
        }
        if(this.birdTouchedBottomWall()){
            this.#isGameOver = true;
        }
        
    }
    jumpBird(){
        this.#bird.jumpBird();
    }
    birdTouchedLeftWall(){
        return this.#bird.positionX<=30;
    }
    birdTouchedRightWall(){
        return this.#bird.positionX>=this.#boardWidth-this.#bird.width-30;
    }
    birdTouchedTopWall(){
        return this.#bird.positionY<=55;
    }
    birdTouchedBottomWall(){
        return this.#bird.positionY>=this.#boardHeight-55-this.#bird.height;
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
    get candy(){
        return this.#candy;
    }
    get candyParams(){
        return this.#candy.params;
    }
}

import { birdDirections } from '../../birdDirectins';

export default class Candy{

    #positionX;
    #positionY;
    #width;
    #height;
    
    constructor(birdFlightDirection, boardWidth, boardHeight){
        this.#positionX = birdFlightDirection === birdDirections.left ? 75 : boardWidth - 75 - 20;
        this.#positionY = 75 + Math.floor(Math.random()*(boardHeight-160));
        this.#width = 25;
        this.#height = 15;

    }

    detectCollision(birdWidth, birdHeight, birdPositionX, birdPositionY){
        if(birdPositionX < this.#positionX + this.#width &&
            birdPositionX + birdWidth > this.#positionX &&
            birdPositionY < this.#positionY + this.#height &&
            birdPositionY + birdHeight > this.#positionY){
                this.saveCandiesInMemory();
                return true;
        }else{
            return false;
        }
        
    }

    saveCandiesInMemory(){
        let candiesCount = localStorage.getItem('candy');
        if(candiesCount){
            candiesCount++;
            localStorage.setItem('candy', candiesCount);
        }else{
            localStorage.setItem('candy', 1);
        }
    }

    get params(){
        return {
            positionX: this.#positionX,
            positionY: this.#positionY,
            width: this.#width,
            height: this.#height
        }
    }
}
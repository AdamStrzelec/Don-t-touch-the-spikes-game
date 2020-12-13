import { colors } from '../../backgroundColors';

export default class LevelsManager{
    #points;
    #backgroundColor;
    #spikesCount;
    #birdSpeed;
    #colorLevel;

    constructor(points){
        this.#points = points;
        this.#birdSpeed = 5;
        this.#colorLevel = 0;
        this.#spikesCount = 4;
    }
    get birdSpeed(){
        if(this.#points%15===0 && this.#points!==0 && this.#birdSpeed<=8){
            this.#birdSpeed+=0.5;
        }
        return this.#birdSpeed;
    }
    get spikesCount(){
        if(this.#points%10===0 && this.#points!==0 && this.#spikesCount<=8){
            this.#spikesCount++;
        }
        return this.#spikesCount;
    }

    get backgroundColor(){
        this.#backgroundColor = colors[this.#colorLevel];
        return this.#backgroundColor;
    }

    set points(points){
        this.#points = points;
        if(this.#points%5===0){
            this.#colorLevel++;
        }
    }
}
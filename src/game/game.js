
export default class Game {
    #bird;
    #isGameInProgress;
    #isGameOver;

    constructor(bird){
        this.#bird = bird;
        this.#isGameInProgress = false;
        this.#isGameOver = false;
    }

    handleGameEvent(){
        if(this.#isGameInProgress){
            //bird jump
        }else{
            this.isGameInProgress(true);
        }
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

}

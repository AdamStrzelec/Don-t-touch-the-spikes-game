export default class Bird{
    #flightDirection;
    #positionX;
    #positionY;
    #birdWidth;
    #fallingSpeed;
    #jumpSpeed;

    constructor(positionX, positionY){
        this.#positionX = positionX;
        this.#positionY = positionY;
        this.#fallingSpeed = 0.4;
        this.#jumpSpeed = -10;
    }

    set positionX(posX){
        this.#positionX = posX;
    }

    get positionX(){
        return this.#positionX;
    }

    set positionY(posY){
        this.#positionY = posY;
    }

    get positionY(){
        return this.#positionY;
    }
}
import { birdDirections } from '../birdDirectins';

export default class Bird{
    #flightDirection;
    #positionX;
    #positionY;
    #width;
    #height;
    #fallingSpeed;
    #positionXSpeed;
    #jumpSpeed;

    constructor(positionX, positionY){
        this.#flightDirection = birdDirections.right;
        this.#positionX = positionX;
        this.#positionY = positionY;
        this.#fallingSpeed = 0;
        this.#jumpSpeed = -10;
        this.#positionXSpeed = 5;
        this.#width = 40;
        this.#height = 30;
    }

    moveBird(){
        if(this.#fallingSpeed<15){
            this.#fallingSpeed+=0.4;
        }else{
            this.#fallingSpeed+=0;
        }
        this.positionY = this.#positionY + this.#fallingSpeed;

        if(this.#flightDirection===birdDirections.right){
            this.positionX+=this.#positionXSpeed;
        }else{
            this.positionX-=this.#positionXSpeed;
        }
        
    }

    jumpBird(){
        this.#fallingSpeed = this.#jumpSpeed;
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

    set flightDirection(direction){
        this.#flightDirection = direction;
    }

    get flightDirection(){
        return this.#flightDirection;
    }

    set width(width){
        this.#width = width;
    }

    get width(){
        return this.#width;
    }

    set height(height){
        this.#height = height;
    }

    get height(){
        return this.#height;
    }
}
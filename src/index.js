import './main.css';
import Game from './game/game';
import { birdDirections } from './birdDirectins';

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const birdRight = new Image();
birdRight.src = "../src/images/bird_right.PNG";
const birdLeft = new Image();
birdLeft.src = "../src/images/bird_left.PNG";


class AnimationFrame {
    constructor( fps = 60, animate ) {
        this.requestID = 0;
        this.fps = fps;
        this.animate = animate;
    }

    start() {
        let then = performance.now();
        const interval = 1000 / this.fps;
        const tolerance = 0.1;

        const animateLoop = now => {
            this.requestID = requestAnimationFrame( animateLoop );
            const delta = now - then;

            if ( delta >= interval - tolerance ) {
                then = now - ( delta % interval );
                this.animate( delta );
            }
        };
        this.requestID = requestAnimationFrame( animateLoop );
    }

    stop() {
        cancelAnimationFrame( this.requestID );
    }

}

const game = new Game(canvas.width, canvas.height);

canvas.addEventListener("click", () => {
    game.handleTouchEvent();
})

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //draw walls
    ctx.fillRect(0, 0, 30, canvas.height)
    ctx.fillRect(canvas.width-30, 0, 30, canvas.height)
    ctx.fillRect(0, 0, canvas.width, 30);
    ctx.fillRect(0, canvas.height-30, canvas.width, 30);

    //draw bird
    if(game.birdDirection===birdDirections.right){
        ctx.drawImage(birdRight, game.birdPositionX, game.birdPositionY, game.birdWidth, game.birdHeight);
    }else{
        ctx.drawImage(birdLeft, game.birdPositionX, game.birdPositionY, game.birdWidth, game.birdHeight);
    }
    game.moveBird();
}

const animLoop = new AnimationFrame(60, draw);

animLoop.start();


import './main.css';
import Game from './game/game';
import Bird from './bird/bird';

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");


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
const bird = new Bird(20, 50);
const game = new Game(bird);


function draw(){

}

const animLoop = new AnimationFrame(60, draw);

animLoop.start();


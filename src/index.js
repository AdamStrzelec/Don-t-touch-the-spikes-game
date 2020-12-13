import './main.css';
import Game from './class/game/game';
import { birdDirections } from './birdDirectins';

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const birdRight = new Image();
birdRight.src = "../src/images/bird_right.PNG";
const birdLeft = new Image();
birdLeft.src = "../src/images/bird_left.PNG";
const candy = new Image();
candy.src = "../src/images/candy.PNG";


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

ctx.font = "bold 65px Arial";
ctx.textAlign = "center";

canvas.addEventListener("click", () => {
    game.handleTouchEvent();
})
canvas.addEventListener("touch", ()=>{
    game.handleTouchEvent();
})

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvas.style.backgroundColor = game.backgroundColor;
    ctx.fillStyle = "#F8F9F9";
    if(game.points<10){
        ctx.fillText('0'+game.points, canvas.width/2, canvas.height/2 - 20);
    }else{
        ctx.fillText(game.points, canvas.width/2, canvas.height/2 - 20);
    }
    
    
    game.renderGame();

    ctx.fillStyle = "#1C2833";
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
    


    ctx.strokeStyle = "white";
    //draw left wall spikes
    for(let i=0; i<11; i++){
        if(!game.leftWallSpikes[i].slotIsEmpty){
            ctx.beginPath();
            ctx.moveTo(game.leftWallSpikes[i].posX, game.leftWallSpikes[i].posY);
            ctx.lineTo(game.leftWallSpikes[i].posX, game.leftWallSpikes[i].posY + game.leftWallSpikes[i].height);
            ctx.lineTo(game.leftWallSpikes[i].posX+game.leftWallSpikes[i].width, game.leftWallSpikes[i].posY + game.leftWallSpikes[i].height/2)
            ctx.lineTo(game.leftWallSpikes[i].posX, game.leftWallSpikes[i].posY);
            ctx.closePath();
            ctx.fill();
        }
    }

    //draw right wall spikes
    for(let i=0; i<11; i++){
        if(!game.rightWallSpikes[i].slotIsEmpty){
            ctx.beginPath();
            ctx.moveTo(game.rightWallSpikes[i].posX, game.rightWallSpikes[i].posY);
            ctx.lineTo(game.rightWallSpikes[i].posX, game.rightWallSpikes[i].posY + game.rightWallSpikes[i].height);
            ctx.lineTo(game.rightWallSpikes[i].posX-game.rightWallSpikes[i].width, game.rightWallSpikes[i].posY + game.rightWallSpikes[i].height/2)
            ctx.lineTo(game.rightWallSpikes[i].posX, game.rightWallSpikes[i].posY);
            ctx.closePath();
            ctx.fill();
        }
    }
    
    //draw top spikes
    for(let i=0; i<8; i++){
        ctx.beginPath();
        ctx.moveTo(47+i*50, 30);
        ctx.lineTo(102+i*50, 30);
        ctx.lineTo(74+i*50, 55)
        ctx.lineTo(47+i*50, 30);
        ctx.closePath();
        ctx.fill();
    }

    //draw bottom spiks
    for(let i=0; i<8; i++){
        ctx.beginPath();
        ctx.moveTo(47+i*50, canvas.height-30);
        ctx.lineTo(102+i*50, canvas.height-30);
        ctx.lineTo(74+i*50, canvas.height-55)
        ctx.lineTo(47+i*50, canvas.height-30);
        ctx.closePath();
        ctx.fill();
    }

    //candy
    if(game.candy){
        ctx.drawImage(candy, game.candyParams.positionX, game.candyParams.positionY, game.candyParams.width, game.candyParams.height);
    }

}

const animLoop = new AnimationFrame(60, draw);

animLoop.start();


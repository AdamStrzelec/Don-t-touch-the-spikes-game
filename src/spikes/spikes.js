
export default class Spikes{
    #wallPosition;
    #boardWidth;
    #boardHeight;
    #birdFlightDirection;
    #spikesSlotsCount;
    #spikesSlotsArray;
    #spikesAreVisible;

    constructor(wallPostion, boardWidth, boardHeight, birdFlightDirection, slotsCount){
        this.#wallPosition = wallPostion; //left or right wall
        this.#boardWidth = boardWidth;
        this.#boardHeight = boardHeight;
        this.#birdFlightDirection = birdFlightDirection;
        this.#spikesSlotsCount = slotsCount;
        this.#spikesSlotsArray = this.initSpikesSlots(boardHeight, slotsCount);
        this.#spikesAreVisible = false;
    }

    initSpikesSlots(boardHeight, slotsCount){
        const singleSpikeSlotHeight = (boardHeight-30-30-15-15)/slotsCount;
        const spikesSlotsArray = [];
        for(let i=0; i<slotsCount; i++){
            spikesSlotsArray.push({
                posX: this.#wallPosition==='left' ? 0 : this.#boardWidth,
                posY: i*singleSpikeSlotHeight + 45,
                width: 25,
                height: singleSpikeSlotHeight,
                slotIsEmpty: true,
            })
        }
        return spikesSlotsArray;
    }

    drawSlots(slotsToDrawCount){
        for(let i=0; i<this.#spikesSlotsCount; i++){
            this.#spikesSlotsArray[i].slotIsEmpty = true;
        }
        let slotsCount = slotsToDrawCount;
        let slotNumber = 0;
        while(slotsCount>0){
            slotNumber = Math.floor(Math.random()*11)
            if(this.#spikesSlotsArray[slotNumber].slotIsEmpty){
                this.#spikesSlotsArray[slotNumber].slotIsEmpty = false;
                slotsCount--;
            }
        }
    }
    showSpikes(){
        this.#spikesAreVisible = true;
    }
    hideSpikes(){
        this.#spikesAreVisible = false;
    }
    moveSpikes(){
        if(this.#wallPosition==='left'){
            if(this.#spikesSlotsArray[0].posX<30 && this.#spikesAreVisible){
                for(let i=0; i<this.#spikesSlotsCount; i++){
                    this.#spikesSlotsArray[i].posX+=3;
                }
            }
            if(this.#spikesSlotsArray[0].posX>=0 && !this.#spikesAreVisible){
                for(let i=0; i<this.#spikesSlotsCount; i++){
                    this.#spikesSlotsArray[i].posX-=3;
                }
            }
        }else{
            if(this.#spikesSlotsArray[0].posX>this.#boardWidth-30 && this.#spikesAreVisible){
                for(let i=0; i<this.#spikesSlotsCount; i++){
                    this.#spikesSlotsArray[i].posX-=3;
                }
            }
            if(this.#spikesSlotsArray[0].posX<=this.#boardWidth && !this.#spikesAreVisible){
                for(let i=0; i<this.#spikesSlotsCount; i++){
                    this.#spikesSlotsArray[i].posX+=3;
                }
            }
        }
    }

    get spikesSlotsArray(){
        return this.#spikesSlotsArray;
    }

}
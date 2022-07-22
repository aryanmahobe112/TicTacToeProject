class Cell{
    constructor(){
        this.mark = null
    }

    isMarked(){
        return (this.mark!=null)
    }
    markCell(player){
        this.mark = player.mark
    }
}

module.exports = Cell
const Cell = require('./Cell.js')

class Board{
    constructor(){
        this.cells = []
        for(let i = 0; i<9; i++){
            this.cells[i] = new Cell()
        }
    }

    checkRows(){
        if(this.cells[0].mark == this.cells[1].mark && this.cells[0].mark == this.cells[2].mark && this.cells[0].mark != null){
            return this.cells[0].mark
        }
        if(this.cells[3].mark == this.cells[4].mark && this.cells[3].mark == this.cells[5].mark && this.cells[3].mark != null){
            return this.cells[3].mark
        }
        if(this.cells[6].mark == this.cells[7].mark && this.cells[6].mark == this.cells[8].mark && this.cells[6].mark != null){
            return this.cells[6].mark
        }
        return null
    }

    checkColumns(){
        if(this.cells[0].mark == this.cells[3].mark && this.cells[0].mark == this.cells[6].mark && this.cells[0].mark != null){
            return this.cells[0].mark
        }
        if(this.cells[1].mark == this.cells[4].mark && this.cells[1].mark == this.cells[7].mark && this.cells[1].mark != null){
            return this.cells[1].mark
        }
        if(this.cells[2].mark == this.cells[5].mark && this.cells[2].mark == this.cells[8].mark && this.cells[2].mark != null){
            return this.cells[2].mark
        }
        return null
    }

    checkDiagonals(){
        if(this.cells[0].mark == this.cells[4].mark && this.cells[0].mark == this.cells[8].mark && this.cells[0].mark != null){
            return this.cells[0].mark
        }
        if(this.cells[2].mark == this.cells[4].mark && this.cells[2].mark == this.cells[6].mark && this.cells[2].mark != null){
            return this.cells[2].mark
        }
        return null
    }
}

module.exports = Board
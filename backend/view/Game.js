const Board = require('./Board.js')
const Player = require('./Player.js')
const Cell = require('./Cell.js')

var mainBoard = null

function creteNewBoard(){
    if(mainBoard!=null){
        for(let i = 0; i<9; i++){
            mainBoard.cells[i] = new Cell()
        }
        return mainBoard
    }
    mainBoard = new Board()
    return mainBoard
}

class Game{
    constructor(nameOfPlayer1, nameOfPlayer2){
        this.board = creteNewBoard()
        this.players = [new Player(nameOfPlayer1, "X"), new Player(nameOfPlayer2, "O")]
        this.turn = 0
        this.resultMessage = 0
        this.wonByPlayer = null
        this.isGameWon = false
        this.isGameDraw = false
    }

    checkResult(mark){
        if(mark == this.players[0].mark){
            this.wonByPlayer = this.players[0].name
            this.isGameWon = true
            return("Winner is : "+this.players[0].name+"\nGame over")
        }
        if(mark == this.players[1].mark){
            this.wonByPlayer = this.players[1].name
            this.isGameWon = true
            return("Winner is : "+this.players[1].name+"\nGame over")
        }
        return 0
    }

    resultAnalyzer(){
        let mark = this.board.checkRows()
        this.resultMessage = this.checkResult(mark)
        if(this.resultMessage!=0){
            return
        }

        mark = this.board.checkColumns()
        this.resultMessage = this.checkResult(mark)
        if(this.resultMessage!=0){
            return
        }

        mark = this.board.checkDiagonals()
        this.resultMessage = this.checkResult(mark)
        if(this.resultMessage!=0){
            return
        }

        if(mark==null && this.turn==9){
            this.isGameDraw = true
            this.resultMessage = "Game is draw\nGame over"
            return
        }
        return
    }

    play(cellNumberToBeMarked){
        if(cellNumberToBeMarked<0 || cellNumberToBeMarked>8){
            return('Cell Number must be between 0 and 8')
        }
        if(this.turn==9 || this.resultMessage!=0){
            return("Game already over. Start a new game.")
        }
        if(this.board.cells[cellNumberToBeMarked].isMarked()){
            return("Cell already marked")
        }

        if(this.turn%2==0){
            this.board.cells[cellNumberToBeMarked].markCell(this.players[0])
            this.turn++
        }
        else{
            this.board.cells[cellNumberToBeMarked].markCell(this.players[1])
            this.turn++
        }

        this.resultAnalyzer()

        if(this.resultMessage!=0){
            return {isGameWon:this.isGameWon, wonByPlayer:this.wonByPlayer, isGameDraw:this.isGameDraw, resultMessage:this.resultMessage}
        }
        if(this.turn%2==0){
            return{isGameWon:this.isGameWon, wonByPlayer:this.wonByPlayer, isGameDraw:this.isGameDraw, resultMessage:"Cell number "+cellNumberToBeMarked+" marked successfully by Player 2 "+this.players[1].name+". Next turn is Player 1 "+this.players[0].name+"'s turn"}
        }
        else{
            return{isGameWon:this.isGameWon, wonByPlayer:this.wonByPlayer, isGameDraw:this.isGameDraw, resultMessage:"Cell number "+cellNumberToBeMarked+" marked successfully by Player 1 "+this.players[0].name+". Next turn is Player 2 "+this.players[1].name+"'s turn"}
        }
    }
}

module.exports = Game
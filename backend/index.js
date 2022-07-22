const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const Game = require('./view/Game.js')

const app = express()
app.use(cors())
app. use(bodyParser.json())

const AllGames = []

app.listen(9000, () => {
    console.log("Started at 9000")
})

app.post('/api/v1/createGame', (req,resp) => {
    let nameOfPlayer1 = req.body.nameOfPlayer1
    let nameOfPlayer2 = req.body.nameOfPlayer2

    if(typeof(nameOfPlayer1)!='string' || typeof(nameOfPlayer2)!='string'){
        resp.status(406).send()
        return
    }

    let newGame = new Game(nameOfPlayer1, nameOfPlayer2)
    AllGames.push(newGame)
    resp.status(201).send("New Game created successfully")
})

app.post('/api/v1/playGame', (req, resp) => {
    let cellNumberToBeMarked = req.body.cellNumberToBeMarked
    cellNumberToBeMarked = parseInt(cellNumberToBeMarked)

    if(typeof(cellNumberToBeMarked)!='number'){
        resp.status(406).send("Invalid cell number")
    }
    else{
    let {isGameWon, wonByPlayer, isGameDraw, resultMessage} = AllGames[AllGames.length-1].play(cellNumberToBeMarked)
    resp.status(201).send({isGameWon, wonByPlayer, isGameDraw, resultMessage})
    }
})

app.get('/api/v1/getGames', (req,resp) => {
    if(AllGames.length==0){
        resp.status(500).send()
    }
    else{
        resp.status(201).send(AllGames)
    }
})
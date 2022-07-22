import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useLocation, useNavigate } from "react-router-dom";

function TicTacToe(){
    const query = new URLSearchParams(useLocation().search)
    let nameOfPlayer1 = query.get("nameOfPlayer1")
    let nameOfPlayer2 = query.get("nameOfPlayer2")
    const [gameStatus, updateGameStatus] = useState(" ")
    const [gameState, updateGameState] = useState(["", "", "", "", "", "", "", "", ""])
    const [isXChance, updateIsXChance] = useState(true)
    const [isTicTacToeWon, updateIsTicTacToeWon] = useState(false)
    const [isTicTacToeDraw, updateIsTicTacToeDraw] = useState(false)
    const [isGameCreated, updateIsGameCreated] = useState(false)
    const navigate = new useNavigate()

    const checkForPlayerNames = () => {
        if(nameOfPlayer1 == null || nameOfPlayer2 == null){
            navigate('/')
        }
    }

    const createNewGame = async () => {
        if(nameOfPlayer1 == null || nameOfPlayer2 == null){
            return
        }
        
        let resp = await axios.post("http://localhost:9000/api/v1/createGame", {nameOfPlayer1, nameOfPlayer2}).catch(e => {
            console.log(e.message)
            updateGameStatus(e.response.data)
        })

        if(resp.data!=null){
            updateGameState(["", "", "", "", "", "", "", "", ""])
            updateIsXChance(true)
            updateIsTicTacToeWon(false)
            updateIsTicTacToeDraw(false)
            updateGameStatus()
            updateIsGameCreated(true)
        }
    }

    useEffect(() => {
        checkForPlayerNames()
        createNewGame()
    }, [])

    const markCell = async (cellNumberToBeMarked) => {
        if(isTicTacToeWon || isTicTacToeDraw){
            return
        }
        if(!isGameCreated){
            updateGameStatus("Click button below to start a new game")
            return
        }
        let resp = await axios.post("http://localhost:9000/api/v1/playGame", {cellNumberToBeMarked}).catch(e => {
            console.log(e.message)
            updateGameStatus(e.response.data)
        })

        if(resp.data!=null){
            console.log(resp.data)
            let {isGameWon, wonByPlayer, isGameDraw} = resp.data
            updateIsTicTacToeWon(isGameWon)
            updateIsTicTacToeDraw(isGameDraw)
            updateIsXChance(!isXChance)
            let playState = Array.from(gameState)
            if(isXChance){
                playState[cellNumberToBeMarked] = "X"
                updateGameState(playState)
            }
            else{
                playState[cellNumberToBeMarked] = "O"
                updateGameState(playState)
            }
            
            if(isGameDraw){
                updateGameStatus("Game draw")
            }
            if(isGameWon){
                updateGameStatus("Player "+wonByPlayer+" wins")
            }
            
        }
    }

    return(
        <div style={{width:"100%", padding:"30px", textAlign:"center", marginTop:"3vh"}}>
            <div>
                <h1>Tic Tac Toe</h1><br /><br />
                <div>
                    <div style={{padding:"20px"}}>
                        <div style={{height:"100px"}}>
                            <div style={{width:"100px", height:"100px", display:"inline-flex", borderRight:"10px solid #87cefa", borderBottom:"10px solid #87cefa", alignItems:"center", justifyContent:"center", verticalAlign:"top", fontSize:"50px"}} onClick={() => {markCell(0)}}>{gameState[0]}</div>
                            <div style={{width:"100px", height:"100px", display:"inline-flex", borderRight:"10px solid #87cefa", borderBottom:"10px solid #87cefa", alignItems:"center", justifyContent:"center", verticalAlign:"top", fontSize:"50px"}} onClick={() => {markCell(1)}}>{gameState[1]}</div>
                            <div style={{width:"100px", height:"100px", display:"inline-flex", borderBottom:"10px solid #87cefa", alignItems:"center", justifyContent:"center", verticalAlign:"top", fontSize:"50px"}} onClick={() => {markCell(2)}}>{gameState[2]}</div>
                        </div>
                        <div style={{height:"100px"}}>
                            <div style={{width:"100px", height:"100px", display:"inline-flex", borderRight:"10px solid #87cefa", borderBottom:"10px solid #87cefa", alignItems:"center", justifyContent:"center", verticalAlign:"top", fontSize:"50px"}} onClick={() => {markCell(3)}}>{gameState[3]}</div>
                            <div style={{width:"100px", height:"100px", display:"inline-flex", borderRight:"10px solid #87cefa", borderBottom:"10px solid #87cefa", alignItems:"center", justifyContent:"center", verticalAlign:"top", fontSize:"50px"}} onClick={() => {markCell(4)}}>{gameState[4]}</div>
                            <div style={{width:"100px", height:"100px", display:"inline-flex", borderBottom:"10px solid #87cefa", alignItems:"center", justifyContent:"center", verticalAlign:"top", fontSize:"50px"}} onClick={() => {markCell(5)}}>{gameState[5]}</div>
                        </div>
                        <div>
                            <div style={{width:"100px", height:"100px", display:"inline-flex", borderRight:"10px solid #87cefa", alignItems:"center", justifyContent:"center", verticalAlign:"top", fontSize:"50px"}} onClick={() => {markCell(6)}}>{gameState[6]}</div>
                            <div style={{width:"100px", height:"100px", display:"inline-flex", borderRight:"10px solid #87cefa", alignItems:"center", justifyContent:"center", verticalAlign:"top", fontSize:"50px"}} onClick={() => {markCell(7)}}>{gameState[7]}</div>
                            <div style={{width:"100px", height:"100px", display:"inline-flex", alignItems:"center", justifyContent:"center", verticalAlign:"top", fontSize:"50px"}} onClick={() => {markCell(8)}}>{gameState[8]}</div>
                        </div>
                    </div>< br />
                    <h2>{gameStatus}</h2><br /><br />
                    <button className="btn btn-primary" onClick={createNewGame}>New Game</button>
                </div>
            </div>
        </div>
    )
}

export default TicTacToe
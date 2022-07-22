import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GetPlayerNames(){
    const [nameOfPlayer1, updateNameOfPlayer1] = useState("")
    const [nameOfPlayer2, updateNameOfPlayer2] = useState("")
    const [submitPlayerNamesStatus, updateSubmitPlayerNamesStatus] = useState()
    const navigate = new useNavigate()

    const submitPlayerNames = async (e) => {
        e.preventDefault()
        if(nameOfPlayer1 == "" || nameOfPlayer2 == ""){
            alert("Please enter the Name of Players")
            return
        }

        let resp = await axios.post('http://localhost:9000/api/v1/createGame', {nameOfPlayer1, nameOfPlayer2}).catch(e => {
            console.log(e.message)
            updateSubmitPlayerNamesStatus(e.response.data)
        })

        if(resp.data != null){
            navigate(`/tictactoe?nameOfPlayer1=${nameOfPlayer1}&&nameOfPlayer2=${nameOfPlayer2}`)
        }
    }

    return(
        <div style={{width:"100%"}}>
            <div className="card" style={{width:"350px", margin:"auto", marginTop:"25vh"}}>
                <div className="card-header">Enter Player Names</div>
                <div className="card-body">
                    <form onSubmit={submitPlayerNames}>
                        <label style={{marginRight:"15px"}}>Name of Player 1</label>
                        <input type="text" style={{marginRight:"70px", width:"100%"}} onChange={(e) => {updateNameOfPlayer1(e.target.value)}}></input><br /><br />
                        <label style={{marginRight:"15px"}}>Name of Player 2</label>
                        <input type="text" style={{marginRight:"70px", width:"100%"}} onChange={(e) => {updateNameOfPlayer2(e.target.value)}}></input><br /><br />
                        <button className="btn btn-primary">Start Game</button><br /><br />
                        {submitPlayerNamesStatus}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default GetPlayerNames
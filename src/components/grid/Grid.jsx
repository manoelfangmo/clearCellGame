import React from 'react'
import "./grid.scss"
import {useState, useEffect} from "react"
import Modal from "../modal/Modal"

export default function Grid() {

    const [state, setState] = useState({isOpen: true, length: 10, width: 5, startGame: false});
    const configGrid = (newLength, newWidth) => {
        setState((prevState) =>({...prevState, length: Number(newLength)}));
        setState((prevState) =>({...prevState, width: Number(newWidth)}));
        
    }
    const numOfCells = state.length * state.width;
    const cells = [];
    for (let i = 0; i < numOfCells; i++){
        cells.push({className: "cell" , id: "cell"+i})
    };

    const gridStyle = {
        gridTemplateColumns: " ",
        gridTemplateRows: " "
    }
    for (let i=0; i< state.length; i++){
        gridStyle.gridTemplateRows += "7% "
    }
    for (let i=0; i< state.width; i++){
        gridStyle.gridTemplateColumns += "7% "
    }
    
    const colors = [ "blue", "red", "yellow", "green"];

    useEffect(() => {
        if(state.startGame){
            
            colorRow(0)
            copyColors(3)
        }
        
    },)

    const colorRow = (startIndex) => {
        for(let i = startIndex; i<state.width; i++){
            const colorIndex = Math.floor((Math.random() * colors.length));
            document.getElementById("cell"+i).style.backgroundColor = colors[colorIndex]; 
        }
    }
    const copyColors = (startIndex) => {
        for(let i = startIndex; i<(startIndex + state.width); i++){
            document.getElementById("cell"+i).style.backgroundColor = 
            document.getElementById("cell"+(i-state.width)).style.backgroundColor;

        }
    }

    // const bottomIsEmpty = () => {
    //     let isEmpty = false;
    //     for(let i = numOfCells-width; i< numOfCells; i++){
    //         if(document.getElementById("cell"+i).style.backgroundColor === "white"){
    //             isEmpty = true;
    //             console.log(document.getElementById("cell"+i).style.backgroundColor)
    //         }
    //     }
    //     return isEmpty;
    // }

    return (
        <>
            <div className="grid" style={gridStyle}>
                 {cells.map((data) => (
                     <span className={data.className} key={data.index} id={data.id}></span>
                 ))}

            </div>
            <button onClick={()=> setState((prevState) =>({...prevState, isOpen: true}))} className="settings">Game Settings</button>
            <button onClick={()=> setState((prevState) =>({...prevState, startGame: true}))}className="start">Start Game</button>
            <Modal open={state.isOpen} onClose={()=> setState((prevState) =>({...prevState, isOpen: false}))} length={state.length} 
             width={state.width} configGrid={configGrid}  />
        </>
            


      
    )
}

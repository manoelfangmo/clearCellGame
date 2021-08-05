import React from 'react'
import "./grid.scss"
import {useState, useEffect} from "react"
import Modal from "../modal/Modal"

export default function Grid() {
    const [isOpen, setIsOpen] = useState(true)
    const [length, setLength] = useState(10);
    const [width, setWidth] = useState(5);
    const numOfCells = length * width;
    const cells = [];
    for (let i = 0; i < numOfCells; i++){
        cells.push({className: "cell" , id: "cell"+i})
    };

    const gridStyle = {
        gridTemplateColumns: " ",
        gridTemplateRows: " "
    }
    for (let i=0; i< length; i++){
        gridStyle.gridTemplateRows += "7% "
    }
    for (let i=0; i< width; i++){
        gridStyle.gridTemplateColumns += "7% "
    }
    
    const colors = [ "blue", "red", "yellow", "green"];

    const [start, setStart] = useState(false)
    useEffect(() => {
        if(start){
            document.getElementById("cell0").style.backgroundColor = colors[0]; 
        }
        
    })

    return (
        <>
            <div className="grid" style={gridStyle}>
                 {cells.map((data) => (
                     <span className={data.className} key={data.index} id={data.id}></span>
                 ))}

            </div>
            <button onClick={()=> setIsOpen(true)} className="settings">Game Settings</button>
            <button onClick={()=> setStart(true)}className="start">Start Game</button>
            <Modal open={isOpen} onClose={()=> setIsOpen(false)} length={length} 
            setLength={setLength} width={width} setWidth={setWidth}  />
        </>
            


      
    )
}

import React from 'react'
import "./grid.scss"
import {useState, useEffect} from "react"
import Modal from "../modal/Modal"

export default function Grid() {
    const [isOpen, setIsOpen] = useState(true)
    const [length, setLength] = useState(10);
    const [width, setWidth] = useState(3);
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
            console.log(length)
            console.log(width)
            colorRow(0)
            copyColors(5)
        }
        
    },)

    const colorRow = (startIndex) => {
        for(let i = startIndex; i<width; i++){
            const colorIndex = Math.floor((Math.random() * colors.length));
            document.getElementById("cell"+i).style.backgroundColor = colors[colorIndex]; 
        }
    }
    const copyColors = (startIndex) => {
        for(let i = startIndex; i<(startIndex + width); i++){
            console.log(width)
            document.getElementById("cell"+i).style.backgroundColor = 
            document.getElementById("cell"+(i-width)).style.backgroundColor;

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
            <button onClick={()=> setIsOpen(true)} className="settings">Game Settings</button>
            <button onClick={()=> setStart(true)}className="start">Start Game</button>
            <Modal open={isOpen} onClose={()=> setIsOpen(false)} length={length} 
            setLength={setLength} width={width} setWidth={setWidth}  />
        </>
            


      
    )
}

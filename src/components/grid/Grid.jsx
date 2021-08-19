import React from 'react'
import "./grid.scss"
import {useState, useEffect} from "react"
import Modal from "../modal/Modal"
import ScoreBoard from '../scoreBoard/ScoreBoard'




export default function Grid() {

    
    const [isOpen, setIsOpen] = useState(true);
    const [startGame, setStartGame] = useState(false);
    const [length, setLength] = useState(10);
    const [width, setWidth] = useState(5);
    const [score, setScore] = useState(0);
    const [coordinates, setCoordinates] = useState({row:0,col:0,clicked:false})

    const configGrid = (newLength, newWidth) => {
        setLength(Number(newLength));
        setWidth(Number(newWidth));
        
    }
    
    function createMap(columnCount, rowCount) {
        const map = [];
        for (let x = 0; x < columnCount; x++) {
          map[x] = []; // set up inner array
          for (let y = 0; y < rowCount; y++) {
             addCell(map, x, y);
          }
        }
        return map;
    }
     
    
    function addCell(map, x, y) {
        const cellProperties = {className: "cell", id: "cell" + x +y, row: x, column: y, style:{backgroundColor:"white",set: (newValue) => {
            this.backgroundColor = newValue;
        } }};
        
         map[x][y] = cellProperties ; // create a new object on x and y
         
    }
    // {className: "cell", id: "cell"+x + y, style:{backgroundColor: "white"}}
    
    
    const [grid, setGrid] = useState([]);

    const gridStyle = { 
        gridTemplateColumns: " ",
        gridTemplateRows: " ",
    
    }
    for (let i=0; i< length; i++){
        gridStyle.gridTemplateRows += "7% "
    }
    for (let i=0; i< width; i++){
        gridStyle.gridTemplateColumns += "7% "
    }

    useEffect(() => {
        setGrid(createMap(length,width))
        
    },[length,width])


    

    const colors = [ "blue", "red", "yellow", "green"];
    const randomColor = () => { 
        const colorIndex = Math.floor((Math.random() * colors.length));
        const style = {backgroundColor: colors[colorIndex]};
        return style
           
    
    }


    const  isGameOver = () => {
        let gameOver = false;
        const lastRow = length-1;
        for(let i = 0; i< width; i++){      
            if(grid[lastRow][i].style.backgroundColor !== "white"){
                gameOver = true;
                break;
                
            }
        }
        return gameOver;
    }

    useEffect(() => {

        if(startGame && isGameOver() === false){
            const intervalId = setInterval(() => {
                nextAnimationStep();
                
        
            }, 1000);
                return () => {clearInterval(intervalId); 
           }
        }
    
    }, [startGame, grid])
  
    const nextAnimationStep = () => {
        if(isGameOver() === false){
            const gridCopy = JSON.parse(JSON.stringify(grid))
            const newGrid = JSON.parse(JSON.stringify(grid))
        
        

            for(let i = 0; i< length-1; i++) {
                 newGrid[i+1] = JSON.parse(JSON.stringify(gridCopy[i]))
                for(let j= 0; j< width; j++) {
                    newGrid[i+1][j].row = gridCopy[i+1][j].row;
                }
            }
            
            for(let i = 0; i< width; i++){
                newGrid[0][i].style = randomColor();
             } 

             
            setGrid(newGrid);
                     
            // setGrid(newGrid)
            
        }
    }

    const processCell = (row, col) =>{
        console.log("process", row, col)
        const gridCopy = JSON.parse(JSON.stringify(grid))
        let tempScore = 0;
        if(gridCopy[row][col].style.backgroundColor !== "white") {
			if(	!isOutOfBounds(row-1,col)&&
            gridCopy[row-1][col].style.backgroundColor === gridCopy[row][col].style.backgroundColor) {
				gridCopy[row-1][col].style = {backgroundColor: "white"};
				tempScore++;
			}

			if(!isOutOfBounds(row+1,col) &&
            gridCopy[row+1][col].style.backgroundColor ===  gridCopy[row][col].style.backgroundColor) {
				gridCopy[row+1][col].style = {backgroundColor: "white"};
				tempScore++;
			}

			if(!isOutOfBounds(row-1,col-1) &&
            gridCopy[row-1][col-1].style.backgroundColor === gridCopy[row][col].style.backgroundColor) {
				gridCopy[row-1][col-1].style = {backgroundColor: "white"};
				tempScore++;
			}

			if(!isOutOfBounds(row+1,col+1) &&
            gridCopy[row+1][col+1].style.backgroundColor === gridCopy[row][col].style.backgroundColor) {
				gridCopy[row+1][col+1].style = {backgroundColor: "white"};
				tempScore++;
			}

			if(!isOutOfBounds(row,col-1) &&
             gridCopy[row][col-1].style.backgroundColor === gridCopy[row][col].style.backgroundColor) {
				gridCopy[row][col-1].style = {backgroundColor: "white"};
				tempScore++;

			}

			if(!isOutOfBounds(row,col+1) &&
            gridCopy[row][col+1].style.backgroundColor === gridCopy[row][col].style.backgroundColor) {
				gridCopy[row][col+1].style = {backgroundColor: "white"};
				tempScore++;
			}

			if(!isOutOfBounds(row+1,col-1) &&
            gridCopy[row+1][col-1].style.backgroundColor === gridCopy[row][col].style.backgroundColor) {
				gridCopy[row+1][col-1].style = {backgroundColor: "white"};
				tempScore++;
			}

			if(!isOutOfBounds(row-1,col+1) &&
            gridCopy[row-1][col+1].style.backgroundColor === gridCopy[row][col].style.backgroundColor ) {
				gridCopy[row-1][col+1].style = {backgroundColor: "white"};
				tempScore++;
			}
			gridCopy[row][col].style = {backgroundColor: "white"};
            tempScore++
            
    

            setScore((prevScore)=> prevScore + tempScore)
                

		}
        for(let i = length-2; i > 0; i--){
            if(rowIsEmpty(i, gridCopy) === true){
                console.log("row empty", i)
                for(let breakPoint = i; breakPoint < length-1; breakPoint++){
                    console.log("copying row", breakPoint+1,"to", breakPoint)
                    console.log("setting row", breakPoint+1, "to white")
                    for(let j = 0; j < width; j++){
                        gridCopy[breakPoint][j] = JSON.parse(JSON.stringify(gridCopy[breakPoint+1][j]));
                        gridCopy[breakPoint][j].row = breakPoint;
                        gridCopy[breakPoint+1][j].style = {backgroundColor: "white"};
                    }
                }
            } else {
                console.log(" row not empty", i)
            }
        }
        setGrid((prevGrid)=> gridCopy)
    }
    const isOutOfBounds = (row, col) => {
		let outOfBounds = false;
		if(row < 0 || row >= length) {
			outOfBounds = true;
		}else if(col < 0 || col >= width) {
			outOfBounds = true;
		}
		return outOfBounds;

	}

    const rowIsEmpty = (rowNum, grid) => {
		for (let i = 0; i< width; i++) {
			if(grid[rowNum][i].style.backgroundColor !== "white") {
				return false;
			}
		}
		return true;
	}

    useEffect(() => {
        if(coordinates.clicked){
            processCell(coordinates.row,coordinates.col)
        }
    
    }, [coordinates])

   

    

    




    return (
        <>
            <div className="grid" style={gridStyle}>
                 {grid.map((cols) => (
                     cols.map((cells) => (
                        <span className={cells.className} style={cells.style}
                        onClick={() => setCoordinates({row: cells.row , col: cells.column, clicked: true})}
                        // onClick={(a, b,c, d, e) => console.log("rowNUm", a, b, c, d,e)}
                         id={cells.id}
                        ></span>
                     ))
                     
                 ))}

            </div>
            <button onClick={()=> setIsOpen(true)} className="settings">Game Settings</button>
            <button onClick={()=> setStartGame(true)}className="start">Start Game</button>
            <Modal open={isOpen} onClose={()=> setIsOpen(false)} length={length} 
             width={width} configGrid={configGrid}  />
            <ScoreBoard score={score} />
        </>
            


      
    )
}

import React from "react";
import "./grid.scss";
import { useState, useEffect, useRef } from "react";
import Modal from "../modal/Modal";
import ScoreBoard from "../scoreBoard/ScoreBoard";
import GameOver from "../gameOver/GameOver";

export default function Grid() {
  const [isOpen, setIsOpen] = useState(true);
  const [startGame, setStartGame] = useState(false);
  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(5);
  const [score, setScore] = useState(0);
  const [coordinates, setCoordinates] = useState({
    row: 0,
    col: 0,
    clicked: false,
  });
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(1500);

  const configGrid = (newLength, newWidth) => {
    setLength(Number(newLength));
    setWidth(Number(newWidth));
  };
  const configSpeed = (difficulty) => {
    if (difficulty === "Hard") {
      setSpeed(500);
    } else if (difficulty === "Medium") {
      setSpeed(1000);
    } else {
      setSpeed(1500);
    }
  };

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
    const cellProperties = ["cell", "cell" + x + y, "white", x, y];

    map[x][y] = cellProperties; // create a new object on x and y
  }
  // {className: "cell", id: "cell"+x + y, style:{backgroundColor: "white"}}

  const gridStyle = {
    gridTemplateColumns: " ",
    gridTemplateRows: " ",
  };
  for (let i = 0; i < length; i++) {
    gridStyle.gridTemplateRows += "7% ";
  }
  for (let i = 0; i < width; i++) {
    gridStyle.gridTemplateColumns += "7% ";
  }
  const gridRef = useRef();

  gridRef.current = createMap(length, width);

  const colors = ["blue", "red", "yellow", "green"];
  const randomColor = () => {
    const colorIndex = Math.floor(Math.random() * colors.length);
    const color = colors[colorIndex];
    return color;
  };

  const isGameOver = () => {
    let gameOver = false;
    const lastRow = length - 1;
    for (let i = 0; i < width; i++) {
      if (
        document.getElementById("cell" + lastRow + i).style.backgroundColor !==
        "white"
      ) {
        setGameOver(true);
        gameOver = true;
        break;
      }
    }
    return gameOver;
  };

  useEffect(() => {
    if (startGame && isGameOver() === false) {
      const intervalId = setInterval(() => {
        nextAnimationStep();
      }, speed);
      return () => {
        clearInterval(intervalId);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startGame]);

  const nextAnimationStep = () => {
    if (isGameOver() === false) {
      //Copy domStyles to gridRef
      const backgroundColor = 2;
      for (let i = 0; i < length; i++) {
        for (let j = 0; j < width; j++) {
          gridRef.current[i][j][backgroundColor] = document.getElementById(
            "cell" + i + j
          ).style.backgroundColor;
        }
      }

      for (let i = 0; i < length - 1; i++) {
        let h = i + 1;
        for (let j = 0; j < width; j++) {
          document.getElementById("cell" + h + j).style.backgroundColor =
            gridRef.current[i][j][backgroundColor];
        }
      }

      for (let i = 0; i < width; i++) {
        document.getElementById("cell" + 0 + i).style.backgroundColor =
          randomColor();
      }

      // setGrid(newGrid)
    }
  };

  const processCellHelper = (surrRow, surrCol, row, col) => {
    if (
      !isOutOfBounds(surrRow, surrCol) &&
      document.getElementById("cell" + surrRow + surrCol).style
        .backgroundColor ===
        document.getElementById("cell" + row + col).style.backgroundColor
    ) {
      document.getElementById(
        "cell" + surrRow + surrCol
      ).style.backgroundColor = "white";
      setScore((prevScore) => prevScore + 1);
    }
  };
  const processCell = (row, col) => {
    if (
      document.getElementById("cell" + row + col).style.backgroundColor !==
      "white"
    ) {
      processCellHelper(row - 1, col, row, col);
      processCellHelper(row + 1, col, row, col);
      processCellHelper(row - 1, col - 1, row, col);
      processCellHelper(row + 1, col + 1, row, col);
      processCellHelper(row, col - 1, row, col);
      processCellHelper(row, col + 1, row, col);
      processCellHelper(row + 1, col - 1, row, col);
      processCellHelper(row - 1, col + 1, row, col);
      document.getElementById("cell" + row + col).style.backgroundColor =
        "white";
      setScore((prevScore) => prevScore + 1);
    }
    for (let i = length - 2; i > 0; i--) {
      if (rowIsEmpty(i)) {
        //Copy domStyles to gridRef
        const backgroundColor = 2;
        for (let i = 0; i < length; i++) {
          for (let j = 0; j < width; j++) {
            gridRef.current[i][j][backgroundColor] = document.getElementById(
              "cell" + i + j
            ).style.backgroundColor;
          }
        }
        for (let breakPoint = i; breakPoint < length - 1; breakPoint++) {
          for (let j = 0; j < width; j++) {
            document.getElementById(
              "cell" + breakPoint + j
            ).style.backgroundColor =
              gridRef.current[breakPoint + 1][j][backgroundColor];
            document.getElementById(
              "cell" + (breakPoint + 1) + j
            ).style.backgroundColor = "white";
          }
        }
      }
    }
  };

  const isOutOfBounds = (row, col) => {
    let outOfBounds = false;
    if (row < 0 || row >= length) {
      outOfBounds = true;
    } else if (col < 0 || col >= width) {
      outOfBounds = true;
    }
    return outOfBounds;
  };

  const rowIsEmpty = (rowNum) => {
    for (let i = 0; i < width; i++) {
      if (
        document.getElementById("cell" + rowNum + i).style.backgroundColor !==
        "white"
      ) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (coordinates.clicked) {
      processCell(coordinates.row, coordinates.col);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates]);

  return (
    <>
      <div className="grid" style={gridStyle}>
        {gridRef.current.map((cols) =>
          cols.map((cells) => (
            <span
              className={cells[0]}
              id={cells[1]}
              style={{ backgroundColor: cells[2] }}
              onClick={() =>
                setCoordinates({
                  row: cells[3],
                  col: cells[4],
                  clicked: true,
                })
              }
            ></span>
          ))
        )}
      </div>
      <button onClick={() => setIsOpen(true)} className="settings">
        Game Settings
      </button>
      <button
        onClick={() =>
          setStartGame(() => {
            return true;
          })
        }
        className="start"
      >
        Start Game
      </button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        length={length}
        width={width}
        configGrid={configGrid}
        configSpeed={configSpeed}
      />
      <ScoreBoard score={score} />
      <GameOver gameOver={gameOver} />
    </>
  );
}

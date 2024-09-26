import React, { useState, useEffect } from "react";
import Tile from "./Tile";
import Cell from "./Cell";
import { Board } from "../helper";
import useEvent from "../hooks/useEvent";
import GameOverlay from "./GameOverlay";

const BoardView = () => {
  const [board, setBoard] = useState(new Board());

  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentEventToggle, setCurrentEventToggle] = useState(false);

  const handleKeyDown = (event) => {
    if (board.hasWon()) {
      return;
    }

    if (event.keyCode >= 37 && event.keyCode <= 40) {
      let direction = event.keyCode - 37;
      let boardClone = Object.assign(
        Object.create(Object.getPrototypeOf(board)),
        board
      );
      console.log(direction);
      let newBoard = boardClone.move(direction);
      setBoard(newBoard);
    }
  };

  useEvent("keydown", handleKeyDown);

  const [startTouch, setStartTouch] = useState(null);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setStartTouch({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    if (!startTouch) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - startTouch.x;
    const deltaY = touch.clientY - startTouch.y;

    // Determine the direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        setCurrentEvent(2);
        setCurrentEventToggle((prev) => !prev);
        console.log("Swiped right");
      } else {
        setCurrentEvent(0);
        setCurrentEventToggle((prev) => !prev);
        console.log("Swiped left");
      }
    } else {
      if (deltaY > 0) {
        setCurrentEvent(3);
        setCurrentEventToggle((prev) => !prev);
        console.log("Swiped down");
      } else {
        setCurrentEvent(1);
        setCurrentEventToggle((prev) => !prev);
        console.log("Swiped up");
      }
    }

    // Reset start touch position
    setStartTouch(null);
  };

  const handleTouchEnd = () => {
    // Reset start touch position on touch end
    setStartTouch(null);
  };

  const cells = board.cells.map((row, rowIndex) => {
    return (
      <div key={rowIndex}>
        {row.map((col, colIndex) => {
          return <Cell key={rowIndex * board.size + colIndex} />;
        })}
      </div>
    );
  });

  const tiles = board.tiles
    .filter((tile) => tile.value !== 0)
    .map((tile, index) => {
      return <Tile tile={tile} key={index} />;
    });

  const resetGame = () => {
    setBoard(new Board());
  };

  useEffect(() => {
    // This code runs whenever `count` changes

    let direction = currentEvent;
    let boardClone = Object.assign(
      Object.create(Object.getPrototypeOf(board)),
      board
    );
    console.log(direction);
    let newBoard = boardClone.move(direction);
    setBoard(newBoard);
  }, [currentEventToggle]); // Dependency array with a single variable

  return (
    <div>
      <div className="details-box">
        <div className="resetButton" onClick={resetGame}>
          New Game
        </div>
        <div className="score-box">
          <div className="score-header">PUNTOS</div>
          <div>{board.score}</div>
        </div>
      </div>
      <div
        className="board"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {cells}
        {tiles}
        <GameOverlay onRestart={resetGame} board={board} />
      </div>
    </div>
  );
};

export default BoardView;

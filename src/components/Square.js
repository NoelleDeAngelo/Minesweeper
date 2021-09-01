import React from 'react'

export default function Square({row, column, handleFlag, handleClick, mine, numOfAdjacentMines}) {
  let classes;
  mine ? classes = 'space hidden mine': classes = 'space hidden'
  return (
      <div
        onContextMenu = {(e)=>{e.preventDefault(); handleFlag(e, row, column)}}
        onClick = {(e)=> handleClick(e,row,column)}
        class= {classes}>{mine ? null : numOfAdjacentMines}</div>
  );
}



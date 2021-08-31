import React from 'react'

export default function Square({row, column, handleFlag, value}) {
  return (
      <div onContextMenu = {(e)=>{e.preventDefault(); handleFlag(e, row, column)}} class= 'space'>{value}</div>
  );
}


//e.classList.add('flaged')
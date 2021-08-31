import React from 'react'
import Board from './Board.jsx'

class App extends React.Component {
    constructor (props){
      super(props);
      this.state ={
        boardSize: 5,
        numOfMines: 2,
        minesLeft: 2

      }
    }
    render(){
       return (
        <div className="App">
          <h1>Minesweeper</h1>
          <label for='boardSize'>Board Size </label>
          <input onChange ={()=>{this.setState({boardSize: document.getElementById('boardSize').value})}} placeholder = '5' id= 'boardSize' type= 'number' min='5' max='20'></input>
          <label for='numOfMines'>Number of Mines</label>
          <input onChange ={()=>{this.setState({boardSize: document.getElementById('numOfMines').value})}} placeholder = '2' id="numOfMines" type= 'number' min='5' max='20'></input>
          <text>Number of Mines Left {this.state.minesLeft}</text>
          <Board num = {this.state.boardSize}/>
        </div>
      );
    }

}

export default App;

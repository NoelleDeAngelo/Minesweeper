import React from 'react'
import Square from './Square'

class Board extends React.Component {
  constructor (props){
    super(props);
    this.handleFlag = this.handleFlag.bind(this)
    this.state ={
      currentBoard: this.createBoard(this.props.boardSize),
      numOfMinesLeft: this.props.numOfMines
    }
  }
  componentDidUpdate(prevProps){
    if (this.props.boardSize !== prevProps.boardSize){
      this.setState({currentBoard: this.createBoard(this.props.boardSize)})
    } else if(this.props.numOfMines !== prevProps.numOfMines){
      this.setState({numOfMinesLeft: this.props.numOfMines, currentBoard: this.createBoard(this.props.boardSize)});
    }
  }

  createBoard(size){
    let board =[]
    for(let i=0; i<size; i++){
      let row = []
      for (let j=0; j< size; j++){
        row.push({
          value: 0,
          status: 'unflagged',
          row: i,
          column: j})
      }
      board.push(row)
    }
    return board;
  }

  handleFlag(element, row, column){
    //console.log('row', row);
    //console.log('column', column)
    if (this.state.currentBoard[row][column].status === 'unflagged'){
      element.target.classList.add('flagged')
      let updatedBoard= [...this.state.currentBoard]
      updatedBoard[row][column].status = 'flagged'
      this.setState({currentBoard: updatedBoard, numOfMinesLeft: this.state.numOfMinesLeft -1})
    }else{
      element.target.classList.remove('flagged')
      let updatedBoard= [...this.state.currentBoard]
      updatedBoard[row][column].status = 'unflagged'
      this.setState({currentBoard: updatedBoard, numOfMinesLeft: this.state.numOfMinesLeft + 1})
    }
  }

  render(){
    return (
    <div>
      <div>Number of Mines Left: {this.state.numOfMinesLeft}</div>
      {this.state.currentBoard.map((row)=> {
         return (<div class = 'boardRow'>{row.map((space)=> {
          return <Square row= {space.row} column= {space.column} handleFlag = {this.handleFlag} value= {space.value}/>
        }
        )}</div>)
      })}
      </div>
  );
  }
}

export default Board;
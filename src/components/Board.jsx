import React from 'react'
import Square from './Square'

class Board extends React.Component {
  constructor (props){
    super(props);
    this.handleFlag = this.handleFlag.bind(this)
    this.state ={
      currentBoard: this.createBoard(this.props.num)
    }
  }
  componentDidUpdate(prevProps){
    if (this.props.num !== prevProps.num){
      this.setState({currentBoard: this.createBoard(this.props.num)})
    }
  }

  createBoard(size){
    let board =[]
    for(let i=0; i<size; i++){
      let row = []
      for (let j=0; j< size; j++){
        row.push({
          value: 0,
          status: 'unflaged',
          row: i,
          column: j})
      }
      board.push(row)
    }
    return board;
  }

  handleFlag(element, row, column){
    console.log('row', row);
    console.log('column', column)
    element.target.classList.add('flaged')
  }

  render(){
    return (
    <div>
      <div>num of rows{this.props.num}</div>
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
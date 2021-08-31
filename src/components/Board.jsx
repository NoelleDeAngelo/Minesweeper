import React from 'react'
import Square from './Square'

class Board extends React.Component {
  constructor (props){
    super(props);
    this.state ={
      currentBoard: this.createBoard(this.props.num)
    }
  }

  // componentDidMount(){
  //   this.setState({currentBoard:this.createBoard(5)})

  // }

  createBoard(size){
    let board =[]
    for(let i=0; i<size; i++){
      let row = []
      for (let j=0; j< size; j++){
        row.push(0)
      }
      board.push(row)
    }
    return board;
  }

  render(){
    return (
    <div>
      <div>{this.props.num}</div>
      {this.state.currentBoard.map((row)=> {
         return row.map((space)=> {
          return <Square status= {space}/>
        }
        )
      })}
      </div>
  );
  }
}

export default Board;
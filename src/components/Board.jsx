import React from 'react'
import Square from './Square'

class Board extends React.Component {
  constructor (props){
    super(props);
    this.handleFlag = this.handleFlag.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    let board =[];
    let mines= this.pickMines(size);
    let spaceNum = 0;
    for(let i=0; i<size; i++){
      let row = []
      for (let j=0; j< size; j++){
        spaceNum++
        let mine = false;
        if(mines.indexOf(spaceNum) !== -1 ){
          mine = true
        }
        row.push({
          mine: mine,
          flagged: false,
          row: i,
          column: j})
      }
      board.push(row)
    }
    for(let row=0; row<size; row++){
      for (let col=0; col< size; col++){
        let numOfAdjacentMines = 0;
        for(let rowOffSet =-1; rowOffSet<= 1; rowOffSet++){
          for(let colOffSet =-1; colOffSet <= 1; colOffSet++){
            if (board[row-rowOffSet] === undefined || board[row-rowOffSet][col-colOffSet] === undefined){
              continue;
            }else if (board[row-rowOffSet][col-colOffSet].mine){
               numOfAdjacentMines++;
            }
          }
        }
        board[row][col].numOfAdjacentMines= numOfAdjacentMines;
      }
    }
    return board;
  }

  pickMines(size){
    let total= size ** 2;
    let mines = [];
    while (mines.length < this.props.numOfMines) {
      let nextMine = Math.floor(Math.random() * (total) + 1)
      if (mines.indexOf(nextMine) === -1){
        mines.push(nextMine);
      }
    }
    return mines;
  }

  handleFlag(element, row, column){
    if (this.state.currentBoard[row][column].flagged === false){
      element.target.classList.add('flagged');
      let updatedBoard= [...this.state.currentBoard];
      updatedBoard[row][column].flagged = true;
      this.setState({currentBoard: updatedBoard, numOfMinesLeft: this.state.numOfMinesLeft -1}, ()=> {
        if(this.state.numOfMinesLeft === 0){
          this.checkForWin() ? console.log('You Win!'): console.log('Something is worng')
        }
      })
    }else{
      element.target.classList.remove('flagged')
      let updatedBoard= [...this.state.currentBoard]
      updatedBoard[row][column].flagged = false;
      this.setState({currentBoard: updatedBoard, numOfMinesLeft: this.state.numOfMinesLeft + 1}, ()=> {
        if(this.state.numOfMinesLeft === 0){
          this.checkForWin() ? console.log('You Win!'): console.log('Something is worng')
        }
      })
    }

  }

  handleClick(element, row, column){
    if (this.state.currentBoard[row][column].mine){
     console.log('this is a mine')
     Array.from(document.getElementsByClassName('space')).forEach((e)=>{
       e.classList.remove('hidden')
     })
    }else{
      element.target.classList.remove('hidden')
    }
  }


  checkForWin(){
    let win = true;
    this.state.currentBoard.forEach((row)=> {
      row.forEach((space)=>{
        if(space.flagged && !space.mine){
          win = false
        }
      })
    });
    return win
  }

  resetGame(){
    Array.from(document.getElementsByClassName('space')).forEach((e)=>{
      e.classList.add('hidden')});
      this.setState({currentBoard: this.createBoard(this.props.boardSize)});
  }

  render(){
    return (
    <div>
      <div>Number of Mines Left: {this.state.numOfMinesLeft}</div>
      <button onClick= {()=>{this.resetGame()}}> New Game</button>
      {this.state.currentBoard.map((row)=> {
         return (<div class = 'boardRow'>{row.map((space)=> {
          return <Square row= {space.row} column= {space.column} handleFlag = {this.handleFlag} handleClick= {this.handleClick} mine= {space.mine} numOfAdjacentMines= {space.numOfAdjacentMines}/>
        }
        )}</div>)
      })}
      </div>
  );
  }
}

export default Board;
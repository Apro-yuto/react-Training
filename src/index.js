import React, { useCallback, useState } from 'react';
// , { useEffect, useState }
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square" onClick={() => {this.props.onClick()}}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

// function Square(props) {
//   return (
//     <button 
//       className="square" 
//       onClick={() => {props.onClick()}}
//     >
//       {props.value}
//     </button>
//   )
// }

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }

// class Board extends React.Component {
  
//   renderSquare(i) {
//     return (
//       <Square 
//         value={this.props.squares[i]}
//         onClick={() => this.props.onClick(i)}
//       />);
//     }
    
//     render() {
//       return (
//         <div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }

// class Game extends React.Component {

  
//   constructor(props) {
//     super(props)
//     this.state = {
//       history: [{
//         squares: Array(9).fill(null)
//       }],
//       stepNumber:0,
//       xIsNext: true,
//     }
//   }
  
//   handleClick(i) {
//     const history = this.state.history.slice(0, this.state.stepNumber + 1);
//     const current = history[this.state.stepNumber]
//     const squares = current.squares.slice()
//     if(calculateWinner(squares) || squares[i]) {
//       return;
//     }
//     squares[i] = this.state.xIsNext ? 'X' : 'O'
//     this.setState({
//       history: history.concat([{
//         squares: squares
//       }]),
//       stepNumber: history.length,
//       xIsNext: !this.state.xIsNext,
//     })
//   }
  
//   jumpTo(step) {
//     this.setState({
//       stepNumber: step,
//       xIsNext: (step % 2 ) === 0 ,
//     })
//   }

//   render() {
//     const history = this.state.history.slice(0, this.state.stepNumber + 1);
//     const current = history[this.state.stepNumber]
//     const winner = calculateWinner(current.squares)
//     let status;
//     if(winner) {
//       status = 'Winner: ' + winner;
//     } else {
//       status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
//     }

//     const moves = history.map((steps, move) => {
//       const desc = move ?
//         'Go to move #' + move :
//         'Go to game start';
//       return (
//         <li key={move}>
//           <button onClick={() => {this.jumpTo(move)}}>{desc}</button>
//         </li>
//       )
//     })

//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board 
//             squares={current.squares}
//             onClick={(i) => {this.handleClick(i)}}
//             />
//         </div>
//         <div className="game-info">
//           <div>{status}</div>
//           <ol>{ moves }</ol>
//         </div>
//       </div>
//     );
//   }
// }


// React Hooks
// const Count = () => {
//   const initCount = 0;
//   let [count, setCount] = useState(initCount);
//   let [secondNum, setNum] = useState(0);

//   const calcPlus = () => setCount( () => count + 1 )

//   const calcHiku = () => setCount( () => count - 1 )
  
//   const calcDouble = () => setCount( () => count * 2 )
  
//   const countInit = () => setCount( () => count = initCount )

//   const addNum = (event) => {
//     const value = event.target.value;
//     setNum(value)
//   }

//     return (
//       <div>
//         {count}
//         <button
//           onClick={() => {calcPlus()}}
//         >
//           +
//         </button>
//         <button
//          onClick={() => {calcHiku()}}
//         >
//           -
//         </button>
//         <button
//          onClick={() => {calcDouble()}}
//         >
//           *
//         </button>
//         <button
//          onClick={() => {countInit()}}
//         >
//           clear
//         </button>
//         <input type='number' onChange={(e) => addNum(e) }></input>
//       </div>
//     )
// }

const Todo = () => {
  let [todos, setTodos] = useState([])
  let [todoName, setName] = useState('')

  const setNameFunc = useCallback((e) => {
    setName(e.target.value)
  },[setName])

  const setTodo = useCallback(() => {
    const id = todos.length;
    const uid = Math.random().toString(36).slice(-4);

    const nowDate = new Date()
    const y = nowDate.getFullYear();
    const m = nowDate.getMonth()+1;
    const d = nowDate.getDate();
    const newArr = [...todos, { id, uid, todoName, todoDoneFlg: false, date: y + '/' + m + '/' + d  }]
    
    setTodos(newArr);
    setName('');
  }, [todoName, todos, setTodos]);
  
  const toggleDoneFlg = (uid) => {
    const doneTodo = todos.map((todo) => {
      if(todo.uid === uid) {
        todo.todoDoneFlg = !todo.todoDoneFlg
      }
      return todo
    })
    setTodos(doneTodo)
  }

  return (
    <div>
      <button onClick={setTodo}>push</button>
      <input value={todoName} onChange={setNameFunc}></input>
      <ul>
        <h2>進行中</h2>
        {
          todos.map( todo => {
            if(!todo.todoDoneFlg) {
              return (
                <li key={todo.id}>
                  <p className='todoName'>{todo.todoName}</p>
                  <p className='todoDate'>追加日：　{todo.date}</p>
                  <button className='todoBtn' onClick={() => {toggleDoneFlg(todo.uid)}}>DONE</button>
                </li>
              )
            } else {
              return (
                <></>
              )
            }
          })
        }
      </ul>
      <ul>
        <h2>完了</h2>
        {
          todos.map( todo => {
            if(todo.todoDoneFlg) {
              return (
                <li key={todo.id}>
                  <p className='todoName'>{todo.todoName}</p>
                  <p className='todoDate'>追加日：　{todo.date}</p>
                  <button classNama='todoBtn' onClick={() => {toggleDoneFlg(todo.uid)}}>DONE</button>
                </li>
              )
            } else {
              return (
                <></>
              )
            }
          })
        }
      </ul>
    </div>
  );

}


ReactDOM.render(
  <Todo />,
  document.getElementById('root')
);
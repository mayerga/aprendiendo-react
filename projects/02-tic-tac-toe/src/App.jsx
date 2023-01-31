import {useState} from "react"
import confetti from "canvas-confetti"
import {Square} from "./components/Square.jsx"
import {TURNS} from "./constants.js"
import { checkWinnerFrom, checkEndGame } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if(boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
//Lo de abajo (ternario) es lo mismo que lo de arriba.
    //return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
    
  })
  console.log(board)

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  
//null es que no hay ganador y false es que hay un empate
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    //Le pasamos las mismas props y tenemos el mismo estado. Así la interfaz se replica
        setBoard(Array(9).fill(null))
        setTurn(TURNS.X)
        setWinner(null)

        window.localStorage.removeItem('board')
        window.localStorage.removeItem('turn')
      }

      

  const updateBoard = (index) => {
    //No actualizamos esta posición. Si ya tiene algo o si hay un ganador
    if(board[index] || winner) return
//Vamos a tener un nuevo board actualizando el tablero
    const newBoard = [...board]
//El nuevo board recibe el índice y le ponemos el valor del turno actual
    newBoard[index] = turn
    setBoard(newBoard);
//Cambiamos el turno. si el turno es igual a l de las X, significa que el nuevo turno será el de los O, si no, el de las X
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn) //Le pasamos el nuevo valor con newTurn
    //Guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    //Revisar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner) {
      confetti()
      setWinner(newWinner) //Actualiza el estado. La actualización del estado es asíncrono
      //alert(`El ganador es ${newWinner}`)
    } else if(checkEndGame(newBoard)) {
      setWinner(false) //Empate al final del juego
    }
  }

  return (
    <main className='board'>
      <h1>tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
{/* Renderizamos cada uno de los scuare dentro del tablero */}
      <section className='game'>
        {
          board.map((square, index) => {
            return(
//Square es el componente para cada uno de los cuadritos
              <Square
                key={index}
                index={index}
//Aquí le pasamos la función, no la ejecución de la función. Si le pasaramos la ejecución sería updateBoard()
//El updateBoard se lo pasamos como prop al componente Square
                updateBoard={updateBoard} 
              >
                {square}
              </Square>
            )
          }) 
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
    
  )
}

export default App

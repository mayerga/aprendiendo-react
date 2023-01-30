import {useState} from "react"

const TURNS = {
  X: 'x',
  O: 'o'
}

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index); //Le pasamos el index para saber en qué recuadro ha hecho click
  }
  
  return (
//Cuando alguien haga click en cada uno de los recuadros, ejecuta handleClick
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  console.log(board)

  const [turn, setTurn] = useState(TURNS.X)
//null es que no hay ganador y false es que hay un empate
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
//Revisamos todas las combinaciones ganadoras para ver si X u O ganó
    for(const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if(
        boardToCheck[a] && //0 -> x u o
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c] 
      ) {
        return boardToCheck[a] // Nos devuelve X o O
      }
    }
//Si no hay ganador que nos devuelva null
    return null
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
    //Revisar si hay un ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner) {
      setWinner(newWinner) //Actualiza el estado. La actualización del estado es asíncrono
      //alert(`El ganador es ${newWinner}`)
    }
  }

  return (
    <main className='board'>
      <h1>tic tac toe</h1>
{/* Renderizamos cada uno de los scuare dentro del tablero */}
      <section className='game'>
        {
          board.map((_, index) => {
            return(
//Square es el componente para cada uno de los cuadritos
              <Square
                key={index}
                index={index}
//Aquí le pasamos la función, no la ejecución de la función. Si le pasaramos la ejecución sería updateBoard()
//El updateBoard se lo pasamos como prop al componente Square
                updateBoard={updateBoard} 
              >
                {board[index]}
              </Square>
            )
          }) 
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
    
  )
}

export default App

export const Square = ({ children, isSelected, updateBoard, index }) => {
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
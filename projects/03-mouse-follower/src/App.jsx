import { useEffect, useState } from "react"

const FollowMouse = () => {

  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0})
  
  //Pointer move
  useEffect(() => { 
    console.log('effect ', {enabled})

    const handleMove = (event) => {
      const {clientX, clientY} = event
      console.log('handleMove ', {clientX, clientY})
      setPosition({x: clientX, y: clientY})
    }

    if(enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    //cleanup: cuando el componente se desmonta y cuando cambian las dependencias, antes de ejecutar el fecto de nuevo
    return () => {
      console.log('cleanup')
      window.removeEventListener('pointermove', handleMove)
    }
    
  }, [enabled])

  // [] -> Se ejecuta cuando se monta el cmponente
  //[enabled] -> Se ejecuta cuando cambia enabled y cuando se monta el componente
  //undefined -> Se ejecuta cada vez que se renderiza el componente

  //Change body className
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  })

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -10,
        top: -10,
        width: 20,
        height: 20,
        transform: `translate(${position.x}px, ${position.y}px)`
      }} 
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  )
}

function App () {
  
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App

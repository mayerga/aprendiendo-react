import { useEffect, useState } from "react"
import './App.css'
import { getRandomFact } from "./services/facts.js"


//const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function App () {
    const [fact, setFact] = useState()
    const [imageUrl, setImageUrl] = useState()

    
    //Recuperar la cita al cargar la página
    useEffect(() => {
        getRandomFact(setFact)

        // También se puede hacer así:
        // async function getRandomFact () {
        //     const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
        //     const json = await res.json()
        //     setFact(json.fact)
        // }
        // getRandomFact()
        
    }, [])

    //Recuperar la imagen cada vez que tenemos una cina nueva
    useEffect(() => {

        if(!fact) return

        const firstWord = fact.split(' ')[0]
        const threeFirstWord = fact.split(' ').slice(0, 3).join(' ')
        console.log('La primera palabra es: ' + firstWord)
        console.log('Las 3 primeras palabras son: ' + threeFirstWord)

        fetch(`https://cataas.com/cat/says/${threeFirstWord}?size=50&color=red&json=true`)
            .then(res => res.json())
            .then(response => {
                console.log(response)
                const {url} = response
                setImageUrl(url)
            })

    }, [fact])

    const handleClick = () => {
        getRandomFact(setFact)
    }

    return (
        <main>
            <h1>App de Gatitos</h1>
            
            <button onClick={handleClick}>Get new fact</button>

            <section>
                {fact && <p>{fact}</p>} 
                {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`Image extracted using the first three words for ${fact}`}></img>}
            </section>
        </main>
        
    )
}

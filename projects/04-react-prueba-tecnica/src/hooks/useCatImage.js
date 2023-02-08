import {useEffect, useState} from 'react'

//CustomHooks
export function useCatImage ({fact}) {
    const [imageUrl, setImageUrl] = useState()
    
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

    return {imageUrl}
}
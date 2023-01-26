import React, { useState } from 'react'
import './App.css'
import {TwitterFollowCard} from './TwitterFollowCard.jsx'


//En este archivo voy a utilizar jsx
//Para exportarlo a otro archivo
export function App () {
    const [name, setName] = useState('midudev')

    console.log('render with name: ', name);

    const users = [
        {
            userName: 'midudev',
            name: 'Miguel Ángel Durán',
            isFollowing: true
        },
        {
            userName: 'pheralb',
            name: 'Pablo H.',
            isFollowing: false
        },
        {
            userName: 'yerbes_4',
            name: 'Manuel Yerbes',
            isFollowing: true
        }
    ]
    return(
        //Este section hace como el React.Fagment
        <section className="App">
            {/* <TwitterFollowCard userName={name} initialIsFollowing = {true}> 
                Miguel Ángel Durán
            </TwitterFollowCard>
            <TwitterFollowCard userName="pheralb">
                Pablo Hernández
            </TwitterFollowCard>

            <button onClick={() => {
                setName('pedromichel')
            }}>
                Cambio nombre
            </button> */}

            {
                users.map(user => {
                    const {userName, name, isFollowing} = user
                    return (
                        <TwitterFollowCard
                            key= {userName}
                            userName={userName}
                            initialIsFollowing={isFollowing}
                        >
                        {name}       

                        </TwitterFollowCard>
                    )
                })
            }
        </section>
        
    )
    
}
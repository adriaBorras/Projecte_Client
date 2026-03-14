import { useState, useEffect } from 'react'
import './App.css'
import type { characterType } from './types/characterType'
import 'bootstrap/dist/css/bootstrap.min.css';
//components
import { CartaCharacter } from './assets/components/CartaCharacter'





function App() {
  // const [count, setCount] = useState(0)

  const [characters, setCharacters] = useState<characterType[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/api/characters')
      .then(res => res.json())
      .then(data => setCharacters(data)) //actualitza characters. In React, any time state updates, React renders the component(App) again so the UI reflects the new data.
  }, []) //Empty array []. Runs only once when the component mounts (when the page loads)

  return (
    <>
      <div className="container">

        <h1 className="title my-5 text-center">Hellsing character list</h1>
        <div className="row justify-content-center CharactersRow">

          {characters.map(character => (
            <CartaCharacter key={character._id}
              character={character}
            />
          ))}
        </div>
      </div>




    </>
  )
}

export default App

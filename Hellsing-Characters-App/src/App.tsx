import { useState, useEffect } from 'react'
import './App.css'
import type { character } from './types/character'





function App() {
  // const [count, setCount] = useState(0)

  const [characters, setCharacters] = useState<character[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/api/characters')
      .then(res => res.json())
      .then(data => setCharacters(data))
  }, [])

  return (
    <>
      <h1 className="title">Hellsing character list</h1>
      {characters.map(character => (
        <div key={character._id}>
          <p>{character.name}</p>
        </div>
      ))}
    </>
  )
}

export default App

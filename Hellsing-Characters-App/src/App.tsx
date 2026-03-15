import { useState, useEffect } from 'react'
import './App.css'
import type { characterType } from './types/characterType'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; //include for modals
//components
import { CartaCharacter } from './assets/components/CartaCharacter'
import { Menu } from './assets/components/Menu';





function App() {
  // const [count, setCount] = useState(0)

  const [characters, setCharacters] = useState<characterType[]>([]);

  useEffect(() => {
    fetchCharacters()
  }, []); //Empty array []. Runs only once when the component mounts (when the page loads)

  
  
  function fetchCharacters() {
    fetch('http://localhost:3000/api/characters')
      .then(res => res.json())
      .then(data => setCharacters(data)) //actualitza characters. In React, any time state updates, React renders the component(App) again so the UI reflects the new data.
  }

  async function deleteCharacter(id: number) {
    const response = await fetch(`http://localhost:3000/api/characters/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("Error a eliminar Character");
      return;
    }

    const data = await response.json();
    fetchCharacters()
    console.log(data);
  }


  

  return (
    <>
      <div className="container">

        <Menu onAfegirCharacter={fetchCharacters} />
        <h1 className="title my-5 text-center">Hellsing character list</h1>
        <div className="row justify-content-center CharactersRow">

          {characters.map(character => (
            <CartaCharacter key={character._id}
              character={character}
              onDelete={deleteCharacter}
            />
          ))}
        </div>
      </div>




    </>
  )
}

export default App

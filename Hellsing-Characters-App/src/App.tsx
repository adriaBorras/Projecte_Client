import { useState, useEffect } from 'react'
import './App.css'
import type { characterType } from './types/characterType'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; //include for modals
//components
import { CartaCharacter } from './components/CartaCharacter'
import { Menu } from './components/Menu';

import { fetchCharacters, deleteCharacter, putCharacter } from './services/apiService';


function App() {
  const [characters, setCharacters] = useState<characterType[]>([]);

  useEffect(() => {
    carregaCharacters()
  }, []); //Empty array []. Runs only once, when the component mounts (when the page loads)

  async function carregaCharacters() {
    try {
      const data = await fetchCharacters();
      setCharacters(data); // estat cambia! torna a fer render.
    } catch (error) {
      console.error("Error loading characters:", error);
    }
  }

  async function eliminaCharacter(id: number) {
    try {
      await deleteCharacter(id);
      carregaCharacters()
    } catch (error) {
      console.error("Error eliminant character:", error);
    }
  }

  async function editaCharacter(id: number, dadesActualitzades: Partial<characterType>) {
    try {
      await putCharacter(id, dadesActualitzades);
      carregaCharacters();
    } catch (error) {
      console.error("Error actualitzant character:", error);
    }
  }

  return (
    <>
      <div className="container">
        <Menu 
          onAfegirCharacter={carregaCharacters} 
        />
        
        <h1 className="title my-5 text-center">Hellsing character list</h1>
        <div className="row justify-content-center CharactersRow">

          {characters.map(character => (
            <CartaCharacter 
              key={character._id}
              character={character}
              onDelete={eliminaCharacter}
              onEdit={editaCharacter}

            />
          ))}
        </div>
      </div>

    </>
  )
}

export default App

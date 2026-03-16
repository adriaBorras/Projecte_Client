import type { characterType } from '../types/characterType';

const BASE_URL = 'http://localhost:3000/api/characters';


export async function fetchCharacters(): Promise<characterType[]> { // not any! retorna un array de characters
    const resposta = await fetch(BASE_URL);
    if (!resposta.ok) {
        throw new Error("Error llegir Characters");
    }
    return await resposta.json();
}

export async function deleteCharacter(id: number): Promise<any> {
    const resposta = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!resposta.ok) {
        throw new Error("Error a eliminar Character");
    }
    return await resposta.json();
}


export async function putCharacter(
  id: number,
  dadesActualitzades: Partial<characterType>
): Promise<characterType> {
  const resposta = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dadesActualitzades),
  });

  if (!resposta.ok) {
    throw new Error("Error actualitzant Character");
  }

  return await resposta.json();
}
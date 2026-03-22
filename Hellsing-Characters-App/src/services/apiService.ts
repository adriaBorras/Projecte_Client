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
  dadesActualitzades: Partial<characterType>): Promise<characterType> {
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


export async function postCharacter(novesDades: Partial<characterType>): Promise<characterType> {
  const resposta = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(novesDades),
  });

  const result = await resposta.json();

  if (!resposta.ok) {
    // forward validation errors if any
    throw result.errors;
  }

  return result;
}

export async function buscaCharacterPerId(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) {
      return false; // no existeix
      
    }
    return true; // si existeix
  } catch {
    return false;// un altre error.
  }
}
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

import { useState, useEffect } from "react";
import type { characterType } from "../../types/characterType";


type characterProps = {
  character: characterType;
};

export function CartaCharacter({ character }: characterProps) {


  return (
    <div className="col-12 col-md-6 col-xl-4 d-flex">
        <div>
            <ul>
                <li>{character.name}</li>
                <li>{character.number}</li>
                <li>{character.date}</li>
                <li>{character.dies ? "True" : "False" }</li>  {/* .ts ignora null,false,undefined */}
                <li>{character.aliases.join(", ")}</li>
            </ul>
        </div>
    </div>
  );
}

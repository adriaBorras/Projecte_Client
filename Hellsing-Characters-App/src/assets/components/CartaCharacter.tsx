// import { useState, useEffect } from "react";
import type { characterType } from "../../types/characterType";


type characterProps = {
  character: characterType;
};

export function CartaCharacter({ character }: characterProps) {


  return (

    <div className="col-12 col-md-4 col-xl-4 ">
        <div className="Carta bg-warning h-100 d-flex flex-column pt-3">
          <div className="imatge w-75 bg-black mx-auto mb-3 " style={{ aspectRatio: "1 / 0.75" }}>
          </div>
            <ul>
                <li>Nom: {character.name}</li>
                <li>Numero:{character.number}</li>
                <li>Naixement: {character.date}</li>
                <li>La palma?:{character.dies ? "True" : "False" }</li>  {/* .ts ignora null,false,undefined */}
                <li>Conegut/da per: {character.aliases.join(", ")}</li>
            </ul>
        </div>
    </div>
  );
}

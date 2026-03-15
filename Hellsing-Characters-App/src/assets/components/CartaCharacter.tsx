import { useState, useEffect } from "react";
import type { characterType } from "../../types/characterType";


type characterProps = {
  character: characterType;
  onDelete: (id: number) => void;
};

export function CartaCharacter({ character, onDelete }: characterProps) {
  const [mostraModal, setMostraModal] = useState(false);



  return (

    <div className="col-12 col-sm-6 col-md-4 col-lg-4 mb-5" onClick={() => setMostraModal(true)}>
      <div className="Carta  h-100 d-flex flex-column pt-3 ">
        <div className="imatge w-75 bg-black mx-auto mb-3 " style={{ aspectRatio: "1 / 0.75" }}>
        </div>
        <h3 className="text-center mb-3">
          {character.name}
        </h3>
      </div>


      {mostraModal && (
        <div className="modal d-block">
          <div className="modal-dialog "
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking modal content
          >
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Detalls de {character.name}</h5>
              </div>

              <div className="modal-body">
                <p>Numero: {character.number}</p>
                <p>Naixement: {character.date}</p>
                <p>La palma?: {character.dies ? "True" : "False"}</p>
                <p>Conegut/da per: {character.aliases.join(", ")}</p>
              </div>

              <div className="modal-footer">
                <button className="btn btn-danger"
                  onClick={() => {
                    const confirmDelete = window.confirm(`Segur que vols eliminar ${character.name}?`);
                    if (confirmDelete) {
                      onDelete(character.number);
                      setMostraModal(false);
                    }
                  }}
                >
                Elimina
              </button>
              <button className="btn btn-danger"
                onClick={() => setMostraModal(false)}
              >
                Tanca
              </button>
            </div>
          </div>
        </div>
        </div>
  )
}


    </div >





  );
}

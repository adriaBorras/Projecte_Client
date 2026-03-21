import { useState, useEffect } from "react";
import type { characterType } from "../types/characterType";


type characterProps = {
  character: characterType;
  onDelete: (id: number) => void;
  onEdit: (id: number, data: Partial<characterType>) => void;
};




export function CartaCharacter({ character, onDelete, onEdit }: characterProps) {
  const [mostraModal, setMostraModal] = useState(false);
  const [editant, setEditant] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});



  //formulari editar,omplim per defecte amb les dades del character existent
  const [dadesFormulari, setDadesFormulari] = useState<Partial<characterType>>({
    name: character.name,
    number: character.number,
    dies: character.dies,
    aliases: character.aliases,
    date: character.date
  });

  // modifica els valors del formulari cuan hi han canvis.
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;

    setDadesFormulari(prev => ({
      ...prev,
      [name]:
        name === "aliases" ? value.split(",").map(a => a.trim()) // fem array del string
          : type === "checkbox" ? checked // utilitza checked, no value
            : value
    }));

  }
  // validem al frontend
  function validaFormulari() {
    // const errorsForm: Partial<characterType> = {};
    const errorsForm: Record<string, string> = {};

    if (!dadesFormulari.name || dadesFormulari.name.trim() === "") {
      errorsForm.name = "El nom es obligatori -front";
    } else if (dadesFormulari.name.length < 3) {
      errorsForm.name = "El nom ha de tenir minim 3 caracters -front";

    }


    if (dadesFormulari.number === undefined || dadesFormulari.number === null || dadesFormulari.number <= 0) {
      errorsForm.number = "Ha de ser un numero i major que 0 -front";
    }

   
    setErrors(errorsForm);

    // retorna tru si no hi han errors
    return Object.keys(errorsForm).length === 0;
  }

  //si apretem cancelar edicio, venim aqui
  function reiniciaForm() {
    setDadesFormulari({
      name: character.name,
      number: character.number,
      dies: character.dies,
      aliases: character.aliases,
      date: character.date
    });
    setErrors({});
  }


  return (

    <div className="col-12 col-sm-6 col-md-4 col-lg-4 mb-5" onClick={() => setMostraModal(true)}>
      <div className="Carta  h-100 d-flex flex-column pt-3 ">
        <div className="imatge w-75 bg-black mx-auto mb-3 text-center align-content-center text-white" style={{ aspectRatio: "1 / 0.75" }}>
          imatge 😉👍
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
                <h5 className="modal-title">Detalls de {character.name} (Valida api i frontend, errors frontend)</h5>
              </div>

              <div className="modal-body">
                {editant ? (
                  <>
                    <label htmlFor="name">Nom:</label>
                    <input className="form-control mb-2"
                      name="name" value={dadesFormulari.name || ""}
                      onChange={handleChange}
                    />
                    {errors.name && <div className="text-primary">{errors.name}</div>}

                    <label htmlFor="name">Numero: (falta fer check per comprobar si ja existeix a la bbdd)</label>
                    <input className="form-control mb-2"
                      name="number" type="number"
                      value={dadesFormulari.number || ""}
                      onChange={handleChange}
                    />
                    {errors.number && <div className="text-primary">{errors.number}</div>}

                    <label htmlFor="name">Data de naixement:</label>
                    <input className="form-control mb-2"
                      name="date" type="date"
                      value={
                        dadesFormulari.date ? new Date(dadesFormulari.date).toISOString().split("T")[0] : ""
                      }
                      onChange={handleChange}
                    />

                    <label htmlFor="name">Sobrnoms:</label>
                    <input className="form-control mb-2"
                      name="aliases" value={dadesFormulari.aliases?.join(", ") || ""}
                      onChange={handleChange}
                    />

                    <div className="form-check">
                      <input className="form-check-input"
                        type="checkbox"
                        name="dies"
                        checked={dadesFormulari.dies || false}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">Acaba mort?</label>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="imatge w-75 bg-black mx-auto mb-3 text-center align-content-center text-white" style={{ aspectRatio: "1 / 0.75" }}>
                      imatge 😉👍
                    </div>
                    <p><strong>Numero:</strong> {character.number}</p>
                    {/* <p>Naixement: {character.date}</p> */}
                    <p>
                      <strong>Naixement:</strong> {new Date(character.date).toLocaleDateString('ca-ES')}
                    </p>
                    <p><strong>Acaba mort:</strong> {character.dies ? "True" : "False"}</p>
                    <p><strong>Conegut/da per:</strong> {character.aliases.join(", ")}</p>
                  </>
                )}

              </div>

              <div className="modal-footer">

                <button
                  className={` btn btn-success ${editant ? "" : "visually-hidden"}`}
                  onClick={async () => {
                    if (!validaFormulari()) return;

                    await onEdit(character.number, dadesFormulari);
                    setEditant(false);
                    setMostraModal(false);
                  }}
                >
                  Guarda
                </button>

                <button className={` btn btn-warning ${editant ? "visually-hidden" : ""}`}
                  onClick={() => {
                    setEditant(true)
                  }}
                >
                  Edita
                </button>
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
                <button className="btn btn-primary"
                  onClick={() => {
                    setMostraModal(false)
                    if (editant) {
                      reiniciaForm()
                    }
                    setEditant(false)
                  }}

                >
                  {editant ? "Cancelar edicio" : "Tanca"}
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

import { useState, useEffect } from "react";
// import type { characterType } from "../../types/characterType";
import { postCharacter } from "../services/apiService";


export function Menu({ onAfegirCharacter }: { onAfegirCharacter: () => void }) { //.ts es una funcio
  const [mostraModalFormulari, setMostraModalFormulari] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const numberValue = formData.get("number")?.toString().trim();

    const data = {
      name: formData.get("name") as string,
      number: numberValue ? Number(numberValue) : undefined, // undefined triggers Mongoose required
      date: formData.get("date") as string,
      dies: formData.get("dies") ? true : false,
      aliases: (formData.get("aliases") as string).split(","),
    };

    // console.log(data);

    try {
      // const response = await fetch("http://localhost:3000/api/characters", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      const Resultat = await postCharacter(data);


      onAfegirCharacter();
      setMostraModalFormulari(false);
      setErrors({});


    } catch (error) {
      console.error("Error al crear character:", error);
      if (typeof error === "object" && error !== null) {
        setErrors(error as Record<string, string>);
      } else {
        alert(error); // fallback
      }
    }
    // setMostraModalFormulari(false);
  }

  return (
    <>
      <div className="menu d-flex flex-row justify-content-center">
        <button type="button" className="btn btn-warning mx-3 my-2 btnNou" // tenim que especificar type, sino sera submit (pk esta en un form)
          onClick={() => setMostraModalFormulari(true)}
        >Afegir nou personatge
        </button>
      </div>

      {mostraModalFormulari && (
        <div className="modal d-block"> {/* d-block mostra el modal, default es display:none*/}
          <div className="modal-dialog "
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking modal content
          >
            <div className="modal-content">

              <form onSubmit={handleSubmit}>

                <div className="modal-header">
                  <h5 className="modal-title">afegeix nova entrada (validacio camps API,errors api)</h5>
                </div>

                <div className="modal-body">

                  <div className=" d-flex flex-column">
                    <label htmlFor="name">Nom: </label>
                    <input type="text" name="name" id="name" />
                    {errors.name && <span className="text-danger">{errors.name}</span>}
                  </div>
                  <div className=" d-flex flex-column mt-3">
                    <label htmlFor="number">Numero: </label>
                    <input type="number" name="number" id="number" />
                    {errors.number && <span className="text-danger">{errors.number}</span>}
                  </div>
                  <div className=" d-flex flex-column mt-3">
                    <label htmlFor="date">Data Naixement: </label>
                    <input type="date" name="date" id="date" />
                  </div>
                  <div className=" d-flex flex-row mt-3">
                    <input type="checkbox" name="dies" id="dies" />
                    <label className="mr-5" htmlFor="dies"> -Acaba mort?: </label>
                  </div>
                  <div className=" d-flex flex-column mt-3">
                    <label htmlFor="aliases">Sobrenoms: </label>
                    <input type="text" name="aliases" id="aliases" />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="submit" className="btn btn-success"
                  // onClick={() => setMostraModalFormulari(false)}
                  >
                    Envia
                  </button>
                  <button className="btn btn-danger"
                    onClick={() => setMostraModalFormulari(false)}
                  >
                    Tanca
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

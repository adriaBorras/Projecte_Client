import { useState, useEffect } from "react";
// import type { characterType } from "../../types/characterType";


export function Menu({ onAfegirCharacter }: { onAfegirCharacter: () => void }) { //.ts es una funcio
  const [mostraModalFormulari, setMostraModalFormulari] = useState(false);



  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const numberValue = formData.get("number")?.toString().trim();


    const data = {
      name: formData.get("name") as string,
      // number: Number(formData.get("number")),
      number: numberValue ? Number(numberValue) : undefined, // undefined triggers Mongoose required
      date: formData.get("date") as string,
      dies: formData.get("dies") === "on",
      aliases: (formData.get("aliases") as string).split(","),
    };

    console.log(data);



    try {
      const response = await fetch("http://localhost:3000/api/characters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error posting data");

      const savedCharacter = await response.json();
      console.log("Saved to MongoDB:", savedCharacter);
      onAfegirCharacter(); 
      setMostraModalFormulari(false);
    } catch (error) {
      console.error("Failed to save character:", error);
    }
    // setMostraModalFormulari(false);
  }




  return (
    <>
      <div className="menu d-flex flex-row justify-content-center mt-5">
        <button type="button" className="btn btn-warning mx-3" // tenim que especificar type, sino sera submit (pk esta en un form)
          onClick={() => setMostraModalFormulari(true)}
        >Afegir nou
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
                  <h5 className="modal-title">afegeix nova entrada</h5>
                </div>

                <div className="modal-body">

                  <div className=" d-flex flex-column">
                    <label htmlFor="name">Nom: </label>
                    <input type="text" name="name" id="name" />
                  </div>
                  <div className=" d-flex flex-column">
                    <label htmlFor="number">Numero: </label>
                    <input type="number" name="number" id="number" />
                  </div>
                  <div className=" d-flex flex-column">
                    <label htmlFor="date">Data Naixement: </label>
                    <input type="date" name="date" id="date" />
                  </div>
                  <div className=" d-flex flex-column">
                    <label htmlFor="dies">Ends dead?: </label>
                    <input type="checkbox" name="dies" id="dies" />
                  </div>
                  <div className=" d-flex flex-column">
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

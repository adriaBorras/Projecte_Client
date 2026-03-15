import { useState, useEffect } from "react";
// import type { characterType } from "../../types/characterType";


export function Menu() {
  const [mostraModalFormulari, setMostraModalFormulari] = useState(false);

  return (
    <>
      <div className="menu d-flex flex-row justify-content-center mt-5">
        <button className="btn btn-warning mx-3"
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

              <div className="modal-header">
                <h5 className="modal-title">afegeix nova entrada</h5>
              </div>

              <div className="modal-body">

                <div  className=" d-flex flex-column">
                  <label htmlFor="name">Nom: </label>
                  <input type="text" name="name" id="name" />
                </div>
                <div className=" d-flex flex-column">
                  <label htmlFor="number">Numero: </label>
                  <input type="text" name="number" id="number" />
                </div>
                <div className=" d-flex flex-column">
                  <label htmlFor="date">Data Naixement: </label>
                  <input type="date" name="date" id="date" />
                </div>
                <div className=" d-flex flex-column">
                  <label htmlFor="dies">Ends dead?: </label>
                  <input type="boolean" name="dies" id="dies" />
                </div>
                <div className=" d-flex flex-column">
                  <label htmlFor="aliases">Sobrenoms: </label>
                  <input type="text" name="aliases" id="aliases" />
                </div>


              </div>

              <div className="modal-footer">
                <button className="btn btn-success"
                  onClick={() => setMostraModalFormulari(false)}
                >
                  Envia
                </button>
                <button className="btn btn-danger"
                  onClick={() => setMostraModalFormulari(false)}
                >
                  Tanca
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


    </>
  );
}

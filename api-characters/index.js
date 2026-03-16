require('dotenv').config();
require('./mongo');

const express = require('express');
const cors = require('cors');


const Character = require('./models/Character');

const app = express();
app.use(cors());
app.use(express.json());

// GET characters
app.get('/', (request, response) => {
  response.send(` 
      Ruta per consultar Characters: /api/characters <br>
      Ruta per afegir un Character: <br>
      Ruta per editar un Character: <br>
      Ruta per eliminar un Character: <br>
      `)
})

app.get('/api/characters', async (req, res) => {
  const characters = await Character.find({});
  res.json(characters);
});

// POST character
app.post('/api/characters', async (req, res, next) => {
  try {
    const dataCharacter = req.body;

    const newCharacter = new Character({
      name: dataCharacter.name,
      number: dataCharacter.number,
      dies: dataCharacter.dies,
      aliases: dataCharacter.aliases,
      date: dataCharacter.date
    });

    const savedCharacter = await newCharacter.save();
    res.status(201).json(savedCharacter);
  } catch (error) {

    // next(error);
    //si hi ha algun de vlaidacions...
    if (error.name === "ValidationError") {
      const errors = {};
      for (const key in error.errors) {
        errors[key] = error.errors[key].message;
      }
      return res.status(400).json({ errors }); // retorna array d'errors {clau:valor}
    }
    //si no e sun error de validacio...
    res.status(500).json({ error: "Error del servidor" });

  }
});


// PUT character per id
app.put('/api/characters/:id', async (req, res, next) => {
  try {
    const numeroId = Number(req.params.id);
    const dadesActualitzades = req.body;

    // busca i actualitza el character
    const updatedCharacter = await Character.findOneAndUpdate(
      { number: numeroId },       // filter
      { $set: dadesActualitzades }, // only update these fields
      { returnDocument: 'after', runValidators: true } // return updated doc + validate
    );

    if (!updatedCharacter) {
      return res.status(404).json({ error: "Character not found" });
    }

    res.status(200).json(updatedCharacter);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = {};
      for (const key in error.errors) {
        errors[key] = error.errors[key].message;
      }
      return res.status(400).json({ errors });
    }

    res.status(500).json({ error: "Server error" });
  }
});


// delete per id
app.delete('/api/characters/:id', async (req, res, next) => {
  try {
    const numeroId = Number(req.params.id);
    // busca i elimina el character
    const deletedCharacter = await Character.findOneAndDelete({ number: numeroId });

    if (!deletedCharacter) {
      return res.status(404).json({ error: "Character not found" });
    }

    res.status(200).json({ message: "Character deleted", deletedCharacter });
  } catch (error) {
    // next(error);
  }
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




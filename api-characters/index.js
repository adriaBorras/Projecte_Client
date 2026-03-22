require('dotenv').config();
require('./mongo');

const express = require('express');
const cors = require('cors');

// imports de models
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
  const characters = await Character.find({}).sort({ number: 1 });
  res.json(characters);
});

app.get('/api/characters/:id', async (req, res) => {
  const char = await Character.findOne({ number: Number(req.params.id) });

  if (!char) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json(char);
});

// POST character
app.post('/api/characters', async (req, res, next) => {
  try {
    const dadesCharacter = req.body;

    const existeix = await Character.findOne({ number: dadesCharacter.number });
    if (existeix) {
      return res.status(400).json({ errors: { number: `El numero ${dadesCharacter.number} ja existeix` } });
    }

    const newCharacter = new Character({
      name: dadesCharacter.name,
      number: dadesCharacter.number,
      dies: dadesCharacter.dies,
      aliases: dadesCharacter.aliases,
      date: dadesCharacter.date
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
      { $set: dadesActualitzades }, // actualitza nomes els camps omplerts del request
      { returnDocument: 'after', runValidators: true } // return updated character + validate with schema
    );
    //comprovem si retorna un Character
    if (!updatedCharacter) {
      return res.status(404).json({ error: "No es troba el character" });
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




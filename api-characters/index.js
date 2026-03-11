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
    next(error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




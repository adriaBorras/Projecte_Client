require('dotenv').config();
require('./mongo');

const express = require('express');
const cors = require('cors');

// const Note = require('./models/Note');
const Character = require('./models/Character');

const app = express();
app.use(cors());
app.use(express.json());

// GET all characters
app.get('/api/characters', async (req, res) => {
  const characters = await Character.find({});
  res.json(characters);
});

// POST new character
app.post('/api/characters', async (req, res, next) => {
  try {
    const data = req.body;

    const newCharacter = new Character({
      name: data.name,
      number: data.number,
      dies: typeof data.dies !== 'undefined' ? data.dies : false,
      aliases: Array.isArray(data.aliases) ? data.aliases : [],
      date: data.date ? new Date(data.date) : null  // <- accept client date or null
    });

    const savedCharacter = await newCharacter.save();
    res.status(201).json(savedCharacter);
  } catch (error) {
    next(error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




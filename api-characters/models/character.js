const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  dies: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
  aliases: { type: Array, default:[]}
});


module.exports = mongoose.model('Character', characterSchema);

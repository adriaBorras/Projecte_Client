const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
   name: {
    type: String,
    required: [true, "El nom es obligatori"],
    minlength: [3, "El nom ha de tenir almenys 3 caracters"],
    maxlength: [50, "El nom es massa llarg"],
    trim: true
  },
  number: {
    type: Number,
    required: true,
    min: [0, "El numero no pot ser negatiu"]
  },
  dies: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Date,
    // required: true,
  },
  aliases: {
    type: [String],    
  }
});


module.exports = mongoose.model('Character', characterSchema);

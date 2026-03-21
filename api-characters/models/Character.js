const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
   name: {
    type: String,
    required: [true, "El nom es obligatori -api"],
    minlength: [3, "El nom ha de tenir almenys 3 caracters -api"],
    maxlength: [30, "El nom es massa llarg -api"],
    trim: true
  },
  number: {
    type: Number,
    required: [true, "El numero es obligatori -api"],
    min: [0, "El numero no pot ser negatiu -api"]
  },
  dies: {
    type: Boolean,
    required: true,
    // default: false,
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

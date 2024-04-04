const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const JoueurSchema = new Schema(
   {
      idEquipe: {
         type: String,
         required: true
      },
      name: {
         type: String,
         required: true
      },
      number: {
         type: Number,
         required: true
      },
      poste: {
         type: String,
         required: true
      },
   }
);
module.exports = mongoose.model('Joueur', JoueurSchema);
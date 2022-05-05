const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const storeSchema = new Schema ({
    nombre: {
        type: String,
        require: true,
        unique: true,
    },

    caracteristica: {
        type: String,
        require: true,
    },

    sailor: {
        type: String,
        require: true,
        unique: true,
     },    

    planeta: {
        type: String,
        requiere: true,
        unique: true,
    }, 

    poder: {
        type: String,
        requiere: true,
    }

});

const Sailor = mongoose.model('Sailor', storeSchema);

module.exports = {Sailor}
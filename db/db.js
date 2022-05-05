const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })
        console.log('Base de datos conectada con éxito');

    } catch (error) {
        console.log(error);
        throw new Error ('Error al conectar con la base de datos')

    }
}

module.exports = {dbConnection}
const res = require('express/lib/response');
const {Sailor} = require('../models/model');
const {check, validationResult, body} = require('express-validator');
const { response } = require('../app');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');


const vistaUno = (req, res)=>{
    res.render('index', { title: 'Express' });
}

const vistaSailors = async (req, res) => {
    const sailors = await Sailor.find();
    res.json({sailors});
}

const vistaUnasailor = async (req, res) => {
    try {
        const scouts = await Sailor.findById(req.params.id)
        res.json({scouts});
    } catch (error) {
        res.status(400).json({msg: "El id ingresado es inválido"});
    }
}

const crearSailor = async (req, res) => {
    // console.log(validationResult(req));
    // console.log(req.body);
    try {
            const error = validationResult(req)
        if (error.isEmpty()) {
            //const {name} = req.body
            const scouts = new Sailor(req.body);
            await scouts.save();
            res.status(201).json({scouts, msg: "Somos las Sailors Scouts que luchan por el amor y la justicia"})
    } else {
            res.status(400).json(error);
    }
        
    } catch (err) {
            res.status(400).json({msg:"Ups, ocurrió un error, estos datos ya existe en la base de datos",err});
    }
}

const editarSailor = async (req, res) =>{
    try {
        const {id} = req.params
        const body = req.body
        console.log(req.body)
        await Sailor.findByIdAndUpdate(id, req.body)
        res.status(201).json(body)

    } catch (error) {
    res.status(400).json({msg: "El id que desea editar no existe"}) 
    }
}

const eliminarSailor = async (req, res) => {
    try {
        const scouts = await Sailor.findByIdAndDelete(req.params.id)
        res.json({msg: "¡Adios!", scouts})
    } catch (error) {
        res.status(400).json({msg: "El id que desea eliminar no existe"});
    }


}

const consultaAxios = async (req, res) => {
    const resultado = await axios.get("https://jsonplaceholder.typicode.com/photos"
, {setTimeout: 10000}).catch((err) => {
    err.origin = "Error al obtener la URL"
    throw err

    });
    
    res.json(resultado.data[1].title);
}


const sesion = (req, res) => {
    
    let usuario = {

        user: req.params.user,
        email: req.params.email

    }
    res.cookie('sessionUsuario', usuario.email, {maxAge: 100000000});
    req.session.usuario = usuario
    res.json(req.session.usuario);
    //res.json(`Bienvenido ${usuario.user} tu email es ${usuario.mail}`);
}

const pruebaSesion = (req, res) => {
    console.log(req.session.usuario);
    res.json(req.session.usuario);

}

const cerrarSesion = (req, res) => {
    req.session.destroy();
    res.json({msg: "Se ha cerrado la sesión correctamente"});
}

// const crearCookie = (req, res) => {
    // res.cookie('guardarEmail', {correo: "email"}, {maxAge: 100000000})
// }

const consultarCookie = (req, res) => {
    res.json(req.cookies.sessionUsuario);

}

const eliminarCookie = (req, res) => {
    res.clearCookie('sessionUsuario');
    res.json({msg: 'Se ha eliminado la Cookie'})
}

module.exports = {vistaUno, crearSailor, vistaSailors, vistaUnasailor, 
editarSailor, eliminarSailor, consultaAxios, sesion, pruebaSesion, cerrarSesion, consultarCookie, eliminarCookie };
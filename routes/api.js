const express = require('express');
const router = express.Router();
const{vistaSailors, crearSailor, vistaUnasailor, editarSailor, eliminarSailor, 
consultaAxios, sesion, pruebaSesion, cerrarSesion, consultarCookie, eliminarCookie} = require('../controllers/controller_sailors.js')
const {check, validationResult, body} = require ("express-validator");
const auth = require('../middleware/auth');


router.get('/photos', consultaAxios);
router.get('/sesion/:user/:email', sesion);
router.get('/pruebasesion', auth, pruebaSesion);
router.get('/cerrarsesion', cerrarSesion);
router.get('/consultarcookie', auth, consultarCookie);
router.get('/eliminarcookie', eliminarCookie);
router.get('/ver', vistaSailors);
router.get('/ver/:id', vistaUnasailor);
router.post('/crear', [
check("nombre").not().isEmpty().isLength({max: 15, min: 4}).withMessage("Debe contener un máximo de 15 carácteres y un mínimo de 4"),
check("sailor").not().isEmpty().withMessage("El campo Sailor debe estar completo"),
check("planeta").not().isEmpty().withMessage("El campo planeta es obligatorio")
], crearSailor);
router.put('/editar/:id', editarSailor);
router.delete('/eliminar/:id', eliminarSailor);


module.exports = router;


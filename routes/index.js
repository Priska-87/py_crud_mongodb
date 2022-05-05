const express = require('express');
const router = express.Router();
const {vistaUno} = require('../controllers/controller_sailors.js')


/* GET home page. */

router.get('/', vistaUno);




module.exports = router;

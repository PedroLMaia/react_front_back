let express = require('express');
let router = express.Router();
let songController = require('../../controller/song-controller')

//Retorna todas as músicas cadastradas.
router.get("/", songController.getSongs)



module.exports = router


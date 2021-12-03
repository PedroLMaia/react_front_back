let express = require('express');
let router = express.Router();
let userController = require('../../controller/user-controller')
let playlistController = require('../../controller/playlist-controller')


//Retorna todos os usuários cadastrados.
router.get("/", userController.getAllUSers)

//Retorna as playlists de um usuário por ID
router.get("/:id/playlists", playlistController.getPlaylistByUserId)

//Retorna um usuário cadastrado por ID.
router.get("/:id", userController.getUserById)

//Cadastra um novo usuário
router.post("/", userController.newUser)

//Atualiza um usuário cadastrador por ID
router.put("/:id", userController.updateUserById)

//Deleta um usuário existente por ID
router.delete("/:id", userController.deleteUserById)

// Login do usuario
router.post("/login", userController.login)

module.exports = router


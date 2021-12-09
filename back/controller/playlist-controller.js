const dbFile = require('../db')
const dbService = require("../service/db-service")
const { getConnection } = require('../mongoConnection')


//Retorna todo os usuários cadastrados
const getAllPlaylists = (req, res, next) => {
    res.status(200).json(dbFile.playlists)
}

//Retorna uma playlist cadastrada por ID
const getPlaylistById = (req, res, next) => {
    console.log("HHHHHHHHHHHHHHH")
    res.json({message: "Usuário por ID."})
}

//Atualiza uma playlist By Id
const updatePlyalistById = (req, res, next) => {
    if(req.params.id){
        for(let playlist of dbFile.playlists){
            if(playlist.id === parseInt(req.params.id)){
                updateIndex = dbFile.playlists.indexOf(playlist)
                dbFile.playlists[updateIndex] = {id: dbFile.playlists[updateIndex].id, ...req.body}
                dbService.updateDbFileArchive(JSON.stringify(dbFile))
                res.status(204).json({message: "Playlist atualizado com sucesso!"})
                break
            }
        }
    }
}

//Deleta uma playlist cadastrada por ID
const deletePlaylistById = (req, res, next) => {
    if(req.params.id){
        for(let playlist of dbFile.playlists){
            if(playlist.id === parseInt(req.params.id)){
                deleteIndex = dbFile.playlists.indexOf(playlist)
                dbFile.playlists.splice((deleteIndex),1)
                dbService.updateDbFileArchive(JSON.stringify(dbFile))
                res.status(204).json({message: "Usuário atualizado com sucesso!"})
                break
            }
        }
    }
}


//Cria uma playlist
const newPlaylist = (req, res, next) => {
    if(_validateNewPlaylistReqBody(req.body)){
        lastPlaylistId = dbFile.playlists.at(-1).id + 1
        dbFile.playlists.push({id: lastPlaylistId, ...req.body})
        dbService.updateDbFileArchive(JSON.stringify(dbFile))
        res.status(201).json({message: "Playlist criada com sucesso!"})
    }else{
        res.status(400).json({message: "Preencha os campos obrigatórios corretamente."});
    }
};


const _validateNewPlaylistReqBody = (reqBody) => {
    if(!reqBody.name || !reqBody.userId || !reqBody.capa || !reqBody.songs){
        return false
    }
    return true
}

//NOVO METODO PARA RETONAR AS PLAYLISTS POR ID
const getPlaylistByUserId = async (req, res, next) => {
    if(req.params.id){
        const conn = await getConnection()
        try {
            const database = conn.db('clonespotify')
            const playlists = database.collection('playlists')

            const query = { userId: +req.params.id }

            const list = await playlists.find(query).toArray()
            
            res.json(list)
        }catch (error) {}
        finally {}
    }
}

module.exports = {newPlaylist, deletePlaylistById, updatePlyalistById, getPlaylistById, getPlaylistByUserId, getAllPlaylists}
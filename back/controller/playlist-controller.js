const dbFile = require('../db')
const dbService = require("../service/db-service")
var ObjectId = require('mongodb').ObjectId;
const { getConnection } = require('../mongoConnection')


//Retorna todo os usuários cadastrados 
const getAllPlaylists = async (req, res, next) => {
    console.log("GET ALL PLAYLISTS")
    const db = req.app.locals.db
    const playlists =  db.collection('playlists')
    if(req.query.id){
        let playlist = await playlists.find({_id: new ObjectId(req.query.id)}).toArray()
        if(playlist){
            res.status(200).send(playlist)
            return
        }else{
            res.status(400).send({message: 'Nenhuma playlist encontrada.'})
        }
    }else{        
        let resultado = await playlists.find({}).toArray();
        res.status(200).send(resultado)
    }
    res.status(200).json(dbFile.playlists)
}

//NOVO METODO - Retorna todo os usuários cadastrados -to do
const getAllPlaylists2 = (req, res, next) => {
    return "a"
}
//Retorna uma playlist cadastrada por ID 
const getPlaylistById = (req, res, next) => {
    console.log("HHHHHHHHHHHHHHH")
    res.json({message: "Usuário por ID."})
}

//NOVO METODO - Retorna uma playlist cadastrada por ID  -to do
const getPlaylistById2 = (req, res, next) => {
}

//Atualiza uma playlist By Id
const updatePlyalistById = async (req, res, next) => {
    console.log("CHEHUEEEEEI")
    console.log(req.body.id)
    console.log("-----------------")
    if(req.params.id){
        const db = req.app.locals.db
        const playlists =  db.collection('playlists')
        let playlist = await playlists.find().toArray()
        var newvalues = { $set: {songs: req.body.songs } };
        const list = await playlists.updateOne({_id: new ObjectId(req.body.id)}, newvalues)
        res.status(204).json({message: "Playlist atualizado com sucesso!"})
        
        // for(let playlist of dbFile.playlists){
        //     if(playlist.id === parseInt(req.params.id)){
        //         updateIndex = dbFile.playlists.indexOf(playlist)
        //         dbFile.playlists[updateIndex] = {id: dbFile.playlists[updateIndex].id, ...req.body}
        //         dbService.updateDbFileArchive(JSON.stringify(dbFile))
        //         break
        //     }
        // }
    }
}

//NOVO METODO - Atualiza uma playlist By Id  -to do
const updatePlyalistById2 = (req, res, next) => {
    
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

//NOVO METODO - Deleta uma playlist cadastrada por ID  -to do
const deletePlaylistById2 = (req, res, next) => {
    
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

//NOVO METODO PARA CRIAR UMA PLAYLIST  -to do
const newPlaylist2 = (req, res, next) => {
    
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
        const db = req.app.locals.db
        try {
            const playlists = db.collection('playlists')

            const query = { userId: +req.params.id }

            const list = await playlists.find(query).toArray()
            
            res.json(list)
        }catch (error) {}
        finally {}
    }
}

module.exports = {newPlaylist, deletePlaylistById, updatePlyalistById, getPlaylistById, getPlaylistByUserId, getAllPlaylists}
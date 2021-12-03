const dbFile = require('../db')

const getSongs = (req, res, next) =>{
    if(req.query.name){
       songsByName = dbFile.songs.filter((song) => {
           if(song.nome.toLowerCase().includes(req.query.name.toLowerCase())){
               return song
           }
       })
       res.status(200).send(songsByName)
    }else{
        res.status(200).send(dbFile.songs)
    }
}

module.exports = {getSongs}
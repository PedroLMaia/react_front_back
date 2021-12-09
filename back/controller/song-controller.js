//NOVO GET SONGS
const getSongs = async (req, res, next) =>{
    const db = req.app.locals.db
    
    if(req.query.name){
        
        const songs =  db.collection('songs')
        let allSongs = await songs.find({}).toArray()

       songsByName = allSongs.filter((song) => {
           if(song.nome.toLowerCase().includes(req.query.name.toLowerCase())){
               return song
           }
       })
       res.status(200).send(songsByName)
    }else{
        const songs =  db.collection('songs')
        let allSongs = await songs.find({}).toArray()
        res.status(200).send(allSongs)
    }
}

module.exports = {getSongs}
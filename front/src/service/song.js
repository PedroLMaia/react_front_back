const axios = require('axios');

const getAllSongs = async () => {
    try{
        const allSongs = await axios.get(`${process.env.REACT_APP_BASE_URL}/songs`)
        return allSongs.data
    }catch(error){
        console.error("Erro ao requirir todas as músicas.")
    }
}


const getSongsByName = async (songName) => {
    try{
        const allSongs = await axios.get(`${process.env.REACT_APP_BASE_URL}/songs?nome_like=${songName}`)
        return allSongs.data
    }catch(error){
        console.error("Erro ao requirir todas as músicas.")
    }
}

const getAllAlbums = async () => {
    try{
        const allAlbums = await axios.get(`${process.env.REACT_APP_BASE_URL}/albums`)
        return allAlbums.data
    }catch(error){
        console.error("Erro ao requirir todos os álbuns.")
    }
}



export { getAllSongs, getAllAlbums, getSongsByName };

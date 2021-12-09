import styles from "./styles.module.scss";
import { Link, useHistory } from 'react-router-dom'
import getPlaylist from '../../service/playlist';
import { getAllAlbums } from "../../service/song";
import { getThemeProps, width } from '@mui/system';
import { useParams } from 'react-router';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { getUserPlaylistsByNickname, findUserIdByNickname } from "../../service/users";
import { getSongsByName } from "../../service/song";
import Song from "../../components/Song/index";
import { AlertDialog } from "../../components/Modal/index"
import { createPlaylist } from "../../service/playlist";
import { chainPropTypes } from "@mui/utils";

export function CreatePlaylist() {
    const nickname = localStorage.getItem('@db/nickname')
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [songs, setSongs] = useState([]);
    const [musicaBuscada, setMusicaBuscada] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [itemSongName, setItemSongName] = useState("");
    const [addedSongs, setAddedSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState("");
    const [playlistName, setPlaylistName] = useState("")
    const [user, setUser] = useState("")
    const [userId, setUserId] = useState("")
    const history = useHistory()

    const handleChange = event => {
      console.log("Onchange")
      setMusicaBuscada(event.target.value);
    };
    useEffect(async () => {
      let userLocalStorage = localStorage.getItem('@db/nickname') 
      setUserId(localStorage.getItem('@db/user_id'))
      if(userLocalStorage == null ){
        history.push('/')
      }else{
        setUser(userLocalStorage)
      }
      console.log("ON useEffect")
        setSongs(await getSongsByName(musicaBuscada))
        console.log(songs)
        const results = songs.filter(song =>
          song.nome.toLowerCase().includes(musicaBuscada)
        );
        setSearchResults(results);
      },[musicaBuscada] )


  
    const handleAddSong = (event) => {
      console.log("ADd song")
      let value = event.target.innerText 
      console.log(value == 'REMOVER')
      if(value != "ADICIONAR" && value != "CANCELAR" && value != 'REMOVER'){
        setCurrentSong(value)
      }else if(value == 'ADICIONAR'){
        if(!addedSongs.includes(currentSong)){
          console.log("Adicionando Música")
          let auxAddedSongs = addedSongs
          auxAddedSongs.push(currentSong)
          setAddedSongs(auxAddedSongs)
        }
      }else if(value == 'REMOVER'){
        let newArray = []
        for(let i=0; i<addedSongs.length; i++){
          if(addedSongs[i] != currentSong)
            newArray.push(addedSongs[i])
        }
        setAddedSongs(newArray)
      }

    }

    const _checkIfExists = (song) => {
      return addedSongs.includes(song.nome)
    }

    const handleSubmit = async (event) => {
      console.log("ANTES DE ENVIAR")
      console.log(event.target.value)
      let playlistSongs = songs
      playlistSongs = playlistSongs.filter(_checkIfExists)
      console.log("BEFORE: " + JSON.stringify(songs))
      console.log("AFTER: " +  playlistSongs)

      // let userId = user.id
      createPlaylist(playlistName, userId, playlistSongs)

      
//      event.preventDefault();
    }

    const handleNewPlaylist = (event) => {
      console.log(event.target.value)
    }

    const teste = (event) =>{
      console.log("IXIIX")
      console.log(event.target.innerText)
    }

    const handlePlaylistName = (event) =>{
      setPlaylistName(event.target.value)
    }

    const handleOnPress = () => {
        alert("ola");
    }

  return (
    <div className={styles.container}>  
      <form>
          <input onChange={handlePlaylistName}  onBlur={handleNewPlaylist} placeholder="Nome da playlist" type="text" required/>
        <br/>
          <input  placeholder="Digite sua música favorita" type="text" 
            value={musicaBuscada} onChange={handleChange}
          />
        <br/>
        <div id="resultadoPesquisa">
        <ul>
         {searchResults.map(item => (
          <li style={{margin: 0}} onClick={handleAddSong}>
            <AlertDialog onPress={handleOnPress} addedSongs={addedSongs} contentStyle={{ margin: 0, padding: 0 }} song={item}/>
          </li>
          
        ))}
      </ul>
        </div>

        <button onClick={handleSubmit} >Criar playlist</button>
      </form>
    </div>
  )
}

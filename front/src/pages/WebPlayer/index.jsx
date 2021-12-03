import styles from "./styles.module.scss";
import Song from "../../components/Song/index";
import {Link, useHistory} from 'react-router-dom'
import {getPlaylistById, updateSongs} from '../../service/playlist';
import {getAllAlbums} from "../../service/song";
import {getThemeProps} from '@mui/system';
import {getSongsByName} from "../../service/song";
import {useParams} from 'react-router';
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {AlertDialog} from "../../components/Modal/index"

export function WebPlayer() {

    const {id} = useParams()
    const [playlist, setPlaylist] = useState([]);
    const [songs, setSongs] = useState([]);
    const [allSongs, setAllSongs] = useState([]);
    const [capa, setCapa] = useState([]);
    const [addedSongs, setAddedSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState("");
    const [musicaBuscada, setMusicaBuscada] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const history = useHistory()

    let music = []

    let teste = ["musica 1", "musica 2", "musica 3"]

    useEffect(async () => {
        if (localStorage.getItem('@db/nickname') == null) {
            history.push('/')
        }
        getPlaylistById(id).then(resp => {
            setSongs(resp.songs)
            setPlaylist(resp)
            music = resp.songs
            console.log(music)
        })

        getSongsByName(musicaBuscada).then(resp => {
            setAllSongs(resp)
        })
        const results = allSongs.filter(song =>
            song.nome.toLowerCase().includes(musicaBuscada)
        );
        setSearchResults(results);
    }, [musicaBuscada])

    async function handleChange(event) {
        console.log("Onchange")
        setMusicaBuscada(event.target.value);
    };

    const _checkIfExists = (song) => {
        return !addedSongs.includes(song.nome)
    }

    async function handleAddSong(event) {
        console.log("ADd song")
        let value = event.target.innerText
        console.log(value == 'REMOVER')
        if (value != "ADICIONAR" && value != "CANCELAR" && value != 'REMOVER') {
            setCurrentSong(value)
        } else if (value == 'ADICIONAR') {
            if (!songs.includes(currentSong)) {
                console.log("Adicionando Música")
                let userSongs = [...songs]
                for (let i = 0; i < allSongs.length; i++) {
                    if (allSongs[i].nome == currentSong) {
                        userSongs.push(allSongs[i])
                        setSongs([...songs, allSongs[i]]);
                    }
                }
                setAddedSongs(userSongs);
                updateSongs(id, userSongs).then(resp => {
                    console.log("Playlist atualizada")
                })
            }
        } else if (value == 'REMOVER') {
            let userSongs = songs
            let newArray = []
            for (let i = 0; i < userSongs.length; i++) {
                if (userSongs[i] != currentSong)
                    newArray.push(userSongs[i])
            }
            setAddedSongs(newArray)
            updateSongs(id, userSongs).then(resp => {
                console.log("Playlist atualizada")
            })
        }
    }

    async function handleRemoveMusic(e) {
        let deleteSongName = e.target.value
        let newSongsArray = []
        for (let i = 0; i < songs.length; i++) {
            if (songs[i].nome != deleteSongName) {
                newSongsArray.push(songs[i])
            }
        }

        updateSongs(id, newSongsArray)
            .then(resp => {
                getPlaylistById(id).then(resp => {
                    setSongs(resp.songs)
                    music = resp.songs
                    console.log(music)
                })
            })
    }


    return (
        // <div className={styles.container}>
        // <div>
        //   <h1>Playlist {playlist.name}</h1>
        // </div>
        //   <div>
        //     <input  placeholder="Digite sua música favorita" type="text"
        //           value={musicaBuscada} onChange={handleChange}
        //         />
        //
        //       <div id="resultadoPesquisa">
        //       <ul>
        //         {searchResults.map(item => (
        //           <li style={{margin: 0}} onClick={handleAddSong}>
        //             <AlertDialog addedSongs={addedSongs} contentStyle={{ margin: 0, padding: 0 }} song={item}/>
        //           </li>
        //         ))}
        //       </ul>
        //       </div>
        //   </div>
        //     <table className ={styles.table}>
        //     <tr>
        //         <td>
        //         <ul>
        //         {songs.map((song) => {
        //           return(
        //             <li>
        //               <Song key={song.id} nome={song.nome} autor={song.autor} arquivo={song.arquivo}/>
        //               <button value={song.nome} onClick={handleRemoveMusic}>Remover música</button>
        //             </li>
        //           )
        //         })}
        //         </ul>
        //         </td>
        //     </tr>
        //
        //     </table>
        // </div>
        <div className={styles.container}>
            <h1 className={styles.playlistTitle}>Playlist {playlist.name}</h1>

            <input
                className={styles.input}
                placeholder="Digite sua música favorita" type="text"
                value={musicaBuscada} onChange={handleChange}
            />
            <div className={styles.searchResult} id="resultadoPesquisa">
                <ul>
                    {searchResults.map(item => (
                        <li style={{margin: 0}} onClick={handleAddSong}>
                            <AlertDialog addedSongs={addedSongs} contentStyle={{margin: 0, padding: 0}} song={item}/>
                        </li>
                    ))}
                </ul>
            </div>

            <section className={styles.songs}>
                <div className={styles.background}>
                    {songs.map((song, index) => {
                        return (
                            <>
                                <div className={styles.single} key={index}>
                                    <Song key={song.id} nome={song.nome} autor={song.autor} arquivo={song.arquivo}/>
                                    <button value={song.nome} onClick={handleRemoveMusic}>Remover música</button>
                                </div>
                                <hr/>
                            </>
                        )
                    })}
                </div>
            </section>
        </div>
    )
}

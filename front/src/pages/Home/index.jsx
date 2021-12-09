import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styles from "./styles.module.scss"
import axios from 'axios';
import { getUserPlaylistsById } from "../../service/users";

export function Home(props) {

  const [user, setUser] = useState({});
  const [totalAlbums, setTotalAlbums] = useState([]);
  const history = useHistory();

  // const user = "";

  useEffect(() => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    let teste = localStorage.getItem('@db/nickname')
    console.log(teste)
    console.log("--------------------------")
    setUser({nickname: localStorage.getItem('@db/nickname').replace("\"",""), id: localStorage.getItem('@db/user_id')})
    console.log(user)
    console.log("FIM")
    const fetchData = async () => {
      const userID = localStorage.getItem('@db/user_id')
      if (userID == null) {
        history.push("/");
        return;
      }
      
      console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZzz")
      console.log(userID)
      const { data } = await getUserPlaylistsById(userID)
      setTotalAlbums(data)
    }
    fetchData()
  }, [])

  const res = totalAlbums.map( (totalAlbums) =>{
    return(
      <Link  to = { `/WebPlayer/${totalAlbums._id}` } > 
      <img src= {totalAlbums.capa}     /> </Link>
    )
  }  )


  return (
    <div className={styles.container}>
      <div className={styles.message}>
        <h1>Grandes músicas pra melhorar seu dia!!</h1>
        <br/>
        <br/>
        <br/>
        <h1>Bem vindo(a) {user.nickname}</h1>
 

      {/*lista de playlists*/} 
      </div>
      {res} 
      <div>
      <Link  to = { `/user-playlists/${user.nickname}` } > 
        <img src= 'adiciona_playlist.png' />
      </Link>
      </div>
    </div>
  )
}

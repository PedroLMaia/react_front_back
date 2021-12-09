import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import logoSpotify from "../../assets/spotify-logo.png"
import styles from "./styles.module.scss"
import { EventEmitter } from '../../event/event'

export function Navbar() {
  const [nickname, setNickname] = useState("")
  useEffect(async () => {
      console.log("MUDOOOOOOUUUUUUUUU")
      let user = localStorage.getItem("@db/nickname")
      if(user != null){
        setNickname(user)
      }else{
          setNickname("")
      }


   },[])

   EventEmitter.subscribe('userLoggedIn', (teste) => {
    let user = localStorage.getItem("@db/nickname")
    console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")
    // useEffect()
    setNickname(user)

   })
   

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logoSpotify} alt="" />
        <p className={styles.title}>Spotify</p>
      </div>
      <div className={styles.links}>
        <Link to="/home"><p className={styles.pages}>Home</p></Link>
        <Link to="/faq"><p className={styles.pages}>Faq</p></Link>
        <Link to="/AtualizarCadastro"><p className={styles.pages}>{nickname}</p></Link>
      </div>
    </div>
  )
}
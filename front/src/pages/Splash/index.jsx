import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./styles.module.scss"

import capaFoto from "../../assets/albumCovers/templatealbum0.jpg"
import capaFoto1 from "../../assets/albumCovers/templatealbum1.jpg";
import capaFoto2 from "../../assets/albumCovers/templatealbum2.jpg";
import capaFoto3 from "../../assets/albumCovers/templatealbum3.jpg";
import capaFoto4 from "../../assets/albumCovers/templatealbum4.jpg";
import capaFoto5 from "../../assets/albumCovers/templatealbum5.jpg";
import capaFoto6 from "../../assets/albumCovers/templatealbum6.jpg";
import capaFoto7 from "../../assets/albumCovers/templatealbum7.jpg";
import {MainButton} from '../../components/MainButton'
import { SecondaryButton } from '../../components/SecondaryButton/index';
import { UserComponent } from '../../service/users';
import { Home } from '../Home';

export function Splash() {
  const nickname = localStorage.getItem('@db/nickname')

  if(nickname !== null){
    return(
      <Home/>
    )
  }
  return (
    <div className={styles.container}>
      <div className={styles.message}>
        <h1>Grandes playlists pra melhorar seu dia1</h1><br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <h1><Link to="/inscricao" style={{color: "blue"}}>Clique aqui e comece a diversão!</Link></h1>
        

     

        
        
      </div>
      <img src={capaFoto}/>
      <img src={capaFoto1}/>
      <img src={capaFoto2}/>
      <img src={capaFoto3}/>
      <img src={capaFoto4}/>
      <img src={capaFoto5}/>
      <img src={capaFoto6}/>
      <img src={capaFoto7}/>
    </div>
  )
}

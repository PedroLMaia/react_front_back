import React from 'react'
import styles from "./styles.module.scss"
import { FormularioComponent } from '../../components/Formulario'

export function Formulario(){
    return(
        <div className={styles.container}>
        <FormularioComponent/>
        </div>
        

    )
}
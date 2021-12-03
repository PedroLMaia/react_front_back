import React from 'react'
import styles from "./styles.module.scss"

export function MainButton({title, variant}) {
  return (
    <button className={styles.container}>
        {title}
    </button>
  )
}

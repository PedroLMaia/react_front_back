import React from 'react'
import styles from "./styles.module.scss"

export function SecondaryButton({title}) {
  return (
    <button className={styles.container}>
      {title}
    </button>
  )
}

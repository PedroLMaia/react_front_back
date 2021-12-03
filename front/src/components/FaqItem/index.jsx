import React, {useState} from 'react'
import { Modal, Box } from '@mui/material';
import styles from "./styles.module.scss"

export function FaqItem({question, answer}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={styles.container}>
      <button onClick={handleOpen}>{question}</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles.modal}
      >
        <Box className={styles.box}>
          <h1 id="modal-modal-title" >
            {question}
          </h1>
          <p id="modal-modal-description">
            {answer}
          </p>
        </Box>
      </Modal>
    </div>
  )
}



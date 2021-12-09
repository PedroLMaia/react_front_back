import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Song from "../../components/Song/index";

export function AlertDialog({ addedSongs, song, onPress }) {
  const [open, setOpen] = React.useState(false);
  const [showRemoveButton, setShowRemoveButton] = React.useState(false)

  const handleClickOpen = () => {
      if(addedSongs.includes(song.nome))
      setShowRemoveButton(true)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <h5 onClick={handleClickOpen}>
        {song.nome}
      </h5>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deseja adicionar essa música a sua playlist?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Song key={song.id} nome={song.nome} autor={song.autor} arquivo={"/" + song.arquivo}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          { showRemoveButton ? <Button onClick={handleClose}>Remover</Button> : null }
          <Button value={song.nome} onClick={handleClose} autoFocus>
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
import React, { useEffect, useState } from 'react'
import './style.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteConfirmationModel = ({ open, setOpen, setDelete }) => {
    return (
        <div>
            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={()=>{setOpen(false)}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <h1 style={{ fontSize: "20px" }}>{'Delete Confirmation'}</h1>
                        <hr style={{ margin: "10px 0" }} />
                    </DialogTitle>
                    <p style={{ margin: "0 20px" }}>Are you sure you want to delete? Because you can't undo this action.</p>
                        <DialogActions>
                            <Button style={{ fontSize: '12px', border: '1px solid #ccc', backgroundColor: "#15375c", color: "#fff" }} onClick={()=>setOpen(!open)}>Cancel</Button>
                            <Button type='submit' style={{ fontSize: '12px', border: '1px solid #ccc', backgroundColor: "#15375c", color: "#fff" }} onClick={() => {setDelete(true)}} autoFocus>
                                Delete
                            </Button>
                        </DialogActions>
                </Dialog>
            </React.Fragment>
        </div>
    )
}

export default DeleteConfirmationModel

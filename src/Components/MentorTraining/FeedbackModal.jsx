import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

const FeedbackModel = ({ open, setOpen, setConfirmAdd, setText }) => {
    return (
        <div>
            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={() => { setOpen(false) }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <h1 style={{ fontSize: "20px" }}>{'Feedback'}</h1>
                        <hr style={{ margin: "10px 0" }} />
                    </DialogTitle>
                    <p style={{ margin: "0 20px" }}>Write a feedback regrading the material you are marking as read.</p>
                    <div style={{ margin: "10px 20px" }}>
                        <textarea onChange={(e)=>{setText(e.target.value)}} style={{borderRadius: "1px solid #ccc"}} className="w-full outline-none p-4" cols='20' rows='10'> </textarea>
                    </div>
                    <DialogActions>
                        <Button style={{ fontSize: '12px', border: '1px solid #ccc', backgroundColor: "#15375c", color: "#fff" }} onClick={() => setOpen(!open)}>Cancel</Button>
                        <Button type='submit' style={{ fontSize: '12px', border: '1px solid #ccc', backgroundColor: "#15375c", color: "#fff" }} onClick={() => { setConfirmAdd(true); setOpen(!open) }} autoFocus>
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </div>
    )
}

export default FeedbackModel
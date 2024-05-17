import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ToastContainer, { FailedToast } from './../toast';

export const EBookModal = ({ editUploadContentPopup, setEditUploadContentPopup, fetchData, setFetchData }) => {
    const [isDoc, setIsDoc] = React.useState(false);
    const [isLink, setIsLink] = React.useState(false);
    const [uploadedDocument, setUploadedDocument] = useState();
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const userID = useSelector(state => state.userId);
    const userType = useSelector(state => state);
    const resetValues = () => {
        setEditUploadContentPopup(!editUploadContentPopup);
        setIsDoc(false);
        setIsLink(false);
        setUploadedDocument();
        setTitle("");
        setLink("");
    }
    const handleUpload = () => {
        setEditUploadContentPopup(!editUploadContentPopup)
        const formData = new FormData();
        formData.append('title', title);
        formData.append('file', uploadedDocument);

            axios.post(`${process.env.REACT_APP_BACKEND_PORT}/ebook`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(() => {
                ToastContainer('Uploaded');
                resetValues();
                setFetchData(!fetchData)
            }).catch((err) => {
                FailedToast(err.response.data.message);
            })
        resetValues();
    }

    return (
        <React.Fragment>
            <Dialog
                open={editUploadContentPopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Upload Material</h1>
                    <hr style={{ margin: '10px 0 0 0' }} />
                </DialogTitle>
                <div style={{ margin: '0px 20px' }} >
                    <p style={{ fontSize: '14px', textAlign: 'justify', marginBottom: '20px' }}>Upload Any Material (PDF Document, Zoom Links, Youtube Videos).</p>
                    <input onChange={(e) => { setTitle(e.target.value) }} style={{ fontSize: '15px', marginBottom: '7px', padding: '4px 7px' }} className="block w-full text-sm text-gray-900 border-2 border-gray-800 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 cursor-text" type="text" placeholder="File Title" />
                    <input onChange={(e) => { setUploadedDocument(e.target.files[0]) }} style={{ fontSize: '15px', marginBottom: '20px', padding: '10px' }} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" accept="application/pdf" />
                </div>
                <DialogActions>
                    <Button style={{ fontSize: '12px', border: '1px solid #ccc', backgroundColor: "#15375c", color: "#fff" }} onClick={() => { setEditUploadContentPopup(!editUploadContentPopup) }}>Close</Button>
                    <Button style={{ fontSize: '12px', border: '1px solid #ccc', backgroundColor: "#15375c", color: "#fff" }} onClick={() => { handleUpload() }} autoFocus>
                        {"Upload this File"}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
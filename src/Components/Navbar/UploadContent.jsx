import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ToastContainer, { FailedToast } from '../toast';
import {useNavigate} from "react-router-dom"

export const UploadContent = ({ editUploadContentPopup, setEditUploadContentPopup }) => {
    const [isDoc, setIsDoc] = React.useState(false);
    const [isLink, setIsLink] = React.useState(false);
    const [uploadedDocument, setUploadedDocument] = useState();
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const Navigate = useNavigate();
    const userID = useSelector(state => state.userId);
    const resetValues = () => {
        setEditUploadContentPopup(!editUploadContentPopup);
        setIsDoc(false);
        setIsLink(false);
        setUploadedDocument();
        setTitle("");
        setLink("");
    }
    const handleUpload = () => {
        if(!isDoc && !isLink){
            FailedToast('Select Document Type')
            return;
        }
        if(isDoc){
            if(!uploadedDocument || !title){
                FailedToast('All fields are required')
                return;
            }
        }else{
            if(!link || !title){
                FailedToast('All fields are required')
                return;
            }
        }
        const formData = new FormData();
        formData.append('title', title);
        if (isDoc) {
            formData.append('file', uploadedDocument);
        } else {
            formData.append('link', link);
        }

        if (isDoc) {
            axios.post(`${process.env.REACT_APP_BACKEND_PORT}/upload/${userID}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(() => {
                ToastContainer('Uploaded');
                resetValues();
                Navigate('/uploaded/material')
            }).catch((err) => {
                FailedToast(err.response.data.message);
            })
        } else {
            axios.post(`${process.env.REACT_APP_BACKEND_PORT}/upload/link/${userID}`, {
                title: title,
                link: link
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                ToastContainer('Uploaded');
                resetValues();
                Navigate('/uploaded/material')
            }).catch((err) => {
                FailedToast(err.response.data.message);
            })
        }
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
                    <select onChange={(e) => { setIsDoc(e.target.value === "pdf" ? true : false); setIsLink(e.target.value === "link" ? true : false) }} style={{ fontSize: '14px', margin: '0 auto 20px auto' }}>
                        <option value="" key="" disabled={true} selected={true}>Select Type of Uploaded Content</option>
                        <option value="pdf" key="">PDF</option>
                        <option value="link" key="">Link/text</option>
                    </select>
                    {
                        isDoc && <>
                            <label style={{ fontSize: '14px', marginTop: '14px' }} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload Content</label>
                            <input onChange={(e) => { setTitle(e.target.value) }} style={{ fontSize: '15px', marginBottom: '7px', padding: '4px 7px' }} className="block w-full text-sm text-gray-900 border-2 border-gray-800 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 cursor-text" type="text" placeholder="File Title" />
                            <input onChange={(e) => { setUploadedDocument(e.target.files[0]) }} style={{ fontSize: '15px', marginBottom: '20px', padding: '10px' }} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" accept="application/pdf" />
                        </>
                    }
                    {
                        isLink && <div>
                            <h1 style={{ paddingBottom: '4px', fontSize: '14px', flex: 1, }} className='text-sm font-semibold text-gray-600'>Upload Write Content: </h1>
                            <input onChange={(e) => { setTitle(e.target.value) }} style={{ fontSize: '15px', marginBottom: '7px', padding: '4px 7px' }} className="block w-full text-sm text-gray-900 border-2 border-gray-800 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 cursor-text" type="text" placeholder="Link Title" />
                            <textarea onChange={(e) => { setLink(e.target.value) }} style={{ width: '100%', height: '100px' }} placeholder='Write Here' className='px-3' cols="30" rows="10" value={link}></textarea>
                        </div>
                    }

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
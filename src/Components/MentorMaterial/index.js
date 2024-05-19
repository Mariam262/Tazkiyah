import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteConfirmationModel from '../DeleteConfirmationModel';
import { FailedToast } from '../toast';


const MentorMaterial = ({ setEditUploadContentPopup, fetchData, setFetchData }) => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const userId = useSelector(state => state.userId);
    const userData = useSelector(state => state);
    const [uploaded, setUploaded] = useState(false);
    const [deleteModel, setDeleteModel] = useState(false);
    const [confirmDelete, setDelete] = useState(false);
    const handleClickOpen = () => { setOpen(true); };
    const [select, setSelect] = useState({});
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_PORT}/upload/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            }
        }).then((res) => {
            setData(res.data.data);
            setUploaded(false);
        }).catch(err => {
        })
    }, [fetchData])

    useEffect(() => {
        if (confirmDelete) {
            axios.delete(`${process.env.REACT_APP_BACKEND_PORT}/upload/${select._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            }).then((res) => {
                setFetchData(!fetchData);
                // handleClose();
                setDeleteModel(false);
                setDelete(false);
            }).catch(err => {
                setDeleteModel(false);
                setDelete(false);
                FailedToast(err.response.data.message || "Failed to Add Event")
            })
            // handleClose();
        }
    }, [confirmDelete])

    const editEvent = () => {
        axios.put(`${process.env.REACT_APP_BACKEND_PORT}/upload/${select._id}`, select, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            }
        }).then((res) => {
            setFetchData(!fetchData);
        }).catch(err => {
            FailedToast(err.response.data.message || "Failed to Add Event")
        })
        setOpen(false);
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h1 className="text-3xl pt-6 pb-5">{userData.isCentralTarbiyah ? 'Central Tarbiyah' : 'Mentor'} Uploaded Material</h1>
            </div>
            <div className='flex justify-center mx-3 mb-4'>
                <button style={{ padding: "5px 10px", backgroundColor: "rgba(0, 122, 255, 0.6)", color: "#fff", borderRadius: "5px" }} className='mx-auto' onClick={() => setEditUploadContentPopup(true)}>Upload New Material</button>
            </div>
            <div style={{ padding: "10px 40px", display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                {
                    data?.map((list) => (
                        <div style={{
                            maxWidth: "400px",
                            boxShadow: "2px 2px 3px #f4f4f4, -2px -3px 5px #f4f4f4",
                            margin: "10px",
                            height: "auto",
                            width: "100%",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            wordWrap: "break-word",
                            overflowWrap: "break-word" // Add this CSS property
                        }} className="px-2 relative">
                            <div class="card-content">
                                <h2 style={{
                                    fontSize: "18px",
                                    color: "gray",
                                    padding: "20px 0 10px 20px",
                                    textAlign: "center"
                                }}>Title: {list.title}</h2>
                                {
                                    list.pdf ?
                                        <p style={{
                                            fontSize: "15px",
                                            padding: "10px 0 10px 20px",
                                            textAlign: "center",
                                            color: "blue"
                                        }}>
                                            <Link to={`${process.env.REACT_APP_BACKEND_PORT}/files/${list.pdf}`} target="_blank" >Download</Link>
                                        </p>
                                        :
                                        <p style={{
                                            fontSize: "15px",
                                            padding: "10px 0 10px 20px",
                                            textAlign: "center",
                                            color: "blue"
                                        }}>
                                            <a href={list.link} alt="link" target="_blank" rel="noopener noreferrer" >Open</a>
                                        </p>
                                }
                                <div className='mt-10 pt-10'>
                                    {
                                        !list.pdf && <button onClick={() => { setOpen(true); handleClickOpen(); setSelect(list); }} className='absolute bg-green-600 right-[90px] bottom-[10px] text-white w-[70px] py-2'>Edit</button>
                                    }
                                    <button onClick={() => { setDeleteModel(true); setSelect(list) }} className='absolute bg-red-700 right-[10px] bottom-[10px] text-white w-[70px] py-2'>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {
                    uploaded && !data?.length && <div className="text-3xl text-center mx-4 mt-10 leading-10">No Material by you yet.</div>
                }
            </div>
            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={() => { setOpen(!open) }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <h1 style={{ fontSize: "20px" }}>{'Edit Material'}</h1>
                        <hr style={{ margin: "10px 0" }} />
                    </DialogTitle>
                    <p style={{ margin: "0 20px" }}>Edit the material by mdoifying the link or title and hit the edit button. </p>
                    <form style={{ margin: "0 20px" }} onSubmit={(e) => { }}>
                        <div className="sub-event pt-0">
                            <div className="namess pt-3 flex">
                                <label style={{ color: "#2567ac" }} className='mr-2 topd' htmlFor="">Title:</label>
                                <input className='py-2' type="text" placeholder="Event Name" value={select.title} onChange={(e) => { setSelect({ ...select, title: e.target.value }) }} required={true} />
                            </div>
                            <div className="dates mt-4 flex">
                                <label style={{ color: "#2567ac" }} className='alphaaad' htmlFor="">Link:</label>
                                <input className='py-2' type="text" name="" id="" value={select.link} onChange={(e) => { setSelect({ ...select, link: e.target.value }) }} required={true} />
                            </div>
                        </div>
                        <DialogActions>
                            <Button style={{ fontSize: '12px', border: '1px solid #ccc', backgroundColor: "#15375c", color: "#fff" }} onClick={() => { setOpen(!open) }}>Close</Button>
                            <Button style={{ fontSize: '12px', border: '1px solid #ccc', backgroundColor: "#15375c", color: "#fff" }} onClick={() => {
                                editEvent();
                            }} autoFocus>
                                Edit
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </React.Fragment>
            <DeleteConfirmationModel open={deleteModel} setOpen={setDeleteModel} setDelete={setDelete} />
        </div>
    )
}

export default MentorMaterial;
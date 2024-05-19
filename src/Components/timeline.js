import React, { useEffect, useState } from 'react'
import style from './timeline.module.css'
import './style.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from "react-redux"
import axios from "axios"
import ToastContainer, { FailedToast } from './toast';
import DeleteConfirmationModel from './DeleteConfirmationModel';


export const TimeLine = () => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => { setOpen(true); };
    //eslint-disable-next-line
    const [confirmDelete, setDelete] = useState(false);
    const [deleteModel, setDeleteModel] = useState(false);
    const [email, setemail] = useState(useSelector(state => state)?.email);
    const handleClose = () => { setOpen(false); setEdit(false); setSelect(false); setName(''); setDate(''); setTime(''); };
    let [show, setShow] = useState(false)
    const [edit, setEdit] = useState(false);
    const [select, setSelect] = useState(false);
    useEffect(()=>{
        if(confirmDelete){
            axios.delete(`${process.env.REACT_APP_BACKEND_PORT}/events/${select}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            }).then((res) => {
                fetchData();
                handleClose();
                setDeleteModel(false);
                setDelete(false);
            }).catch(err => {
                FailedToast(err.response.data.message || "Failed to Add Event")
            })
            handleClose();
        }
    }, [confirmDelete])
    const handleSubmit = () => {
        const data = {
            eventName: name,
            eventDate: date,
            eventTime: time
        }
        axios.post(`${process.env.REACT_APP_BACKEND_PORT}/events`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            }
        }).then((res) => {
            ToastContainer("Event Added Successfully")
            fetchData();
        }).catch(err => {
            FailedToast(err.response.data.message || "Failed to Add Event")
        })
        handleClose();
    }

    const editEvent = () => {
        const data = {
            eventName: name,
            eventDate: date,
            eventTime: time
        }
        axios.put(`${process.env.REACT_APP_BACKEND_PORT}/events/${select}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            }
        }).then((res) => {
            fetchData();
            handleClose();
        }).catch(err => {
            FailedToast(err.response.data.message || "Failed to Add Event")
        })
        handleClose();
    }
    const fetchData = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_PORT}/events`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            }
        }).then((res) => {
            setData(res.data.data)
        }).catch((err) => {
            FailedToast(err.response.data.message || "Failed to Fetch Data")
        })
    }
    useEffect(() => {
        fetchData()
    }, [])
    let [data, setData] = useState([])
    let [name, setName] = useState();
    let [date, setDate] = useState();
    let [time, setTime] = useState();
    let handleeventadd = (e) => {
        e.preventDefault()
        setData([{
            name: name,
            data: date,
            time: time
        }, ...data])
        setShow(false)
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [show])
    return (
        <div id={`${style.qualification}`}>
            <div className={`${style.main} dark:bg-slate-400`}>
                <>
                    <h3 className={`${style.head}`} style={{ color: "#15375c" }}>Events TimeLine</h3>
                    <button onClick={() => { setShow(!show); handleClickOpen() }} type='submit' className='add-brn add-brn1' style={{ marginBottom: "0", backgroundColor: "#15375c" }}>Add New Event</button>
                    <div style={{ margin: "90px 0 0 0" }} className={`${style.container}`}>
                        <ul>
                            {
                                data.map((arr, index) => (
                                    <li alt={arr.name} key={Math.floor(Math.random() * 100000 + index)} className='dark:bg-slate-500 relative' >
                                        <h3 className={`${style.heading} font-bold mb-4  dark:text-cyan-900`}>{arr.eventName}</h3>
                                        <h3 className={`${style.heading1} mb-2 font-semibold`}>Time: {arr.eventTime}</h3>
                                        <span className={`${style.date}`}>{arr?.eventDate?.slice(0, 10)}</span>
                                        <span className={`${style.circle}`}></span>
                                        <div className='mt-10 pt-10'>
                                            <button onClick={()=>{setShow(!show); handleClickOpen();setEdit(!edit);setSelect(arr._id); setDate(arr.eventDate.slice(0, 10)); setName(arr.eventName); setTime(arr.eventTime)}} className='absolute bg-green-600 left-[10px] bottom-[10px] text-white w-[70px] py-2'>Edit</button>
                                            <button onClick={()=>{setDeleteModel(true); setSelect(arr._id)}} className='absolute bg-red-700 left-[90px] bottom-[10px] text-white w-[70px] py-2'>Delete</button>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </>
                <React.Fragment>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            <h1 style={{ fontSize: "20px" }}>{edit ? 'Edit Event' : 'Add Event'}</h1>
                            <hr style={{ margin: "10px 0" }} />
                        </DialogTitle>
                        <p style={{ margin: "0 20px" }}>Add specific Event by mentioning the Event Name, it's Date and the time. </p>
                        <form style={{ margin: "0 20px" }} onSubmit={(e) => { handleeventadd(e) }}>
                            <div className="sub-event pt-0">
                                <div className="namess pt-3 flex">
                                    <label style={{ color: "#2567ac" }} className='mr-2 topd' htmlFor="">Event Name:</label>
                                    <input className='py-2' type="text" placeholder="Event Name" value={name} onChange={(e)=>{setName(e.target.value)}} required={true} />
                                </div>
                                <div className="dates mt-4 flex">
                                    <label style={{ color: "#2567ac" }} className='alphaaad' htmlFor="">Event Date:</label>
                                    <input className='py-2' type="date" name="" id="" value={date} onChange={(e)=>{setDate(e.target.value)}} required={true} />
                                </div>
                                <div className="timess my-4 flex">
                                    <label style={{ color: "#2567ac" }} className='alphaaad' htmlFor="">Event Time</label>
                                    <input className='py-2' type="time" name="" id="" value={time} onChange={(e)=>{setTime(e.target.value)}} required={true} />
                                </div>
                            </div>
                            <DialogActions>
                                <Button style={{ fontSize: '12px', border: '1px solid #ccc', backgroundColor: "#15375c", color: "#fff" }} onClick={handleClose}>Close</Button>
                                <Button style={{ fontSize: '12px', border: '1px solid #ccc', backgroundColor: "#15375c", color: "#fff" }} onClick={() => {
                                    if(edit){
                                        editEvent();
                                    }else{
                                        handleSubmit();
                                    }
                                }} autoFocus>
                                    Add Event
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>
                </React.Fragment>
            </div>
            <DeleteConfirmationModel open={deleteModel} setOpen={setDeleteModel} setDelete={setDelete} />
        </div>
    )
}
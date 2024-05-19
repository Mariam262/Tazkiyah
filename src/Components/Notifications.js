import React, { useEffect, useState } from 'react'
import './style.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const Notifications = ({ notificationPopUp, setNotificationPopUp }) => {
    //eslint-disable-next-line
    let [data, setData] = useState([])
    const mentorId = useSelector(state => state.userId)
    const userType = useSelector(state => state);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (mentorId) {
            setLoading(true);
            axios.get(`${process.env.REACT_APP_BACKEND_PORT}/notification/${mentorId}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                setLoading(false);
                setData(res?.data?.data?.notifications)
            })
        } else if(userType.isMentor){
            setLoading(true);
            axios.get(`${process.env.REACT_APP_BACKEND_PORT}/notification/tarbiyah`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                setLoading(false);
                setData(res.data?.data?.notifications)
            })
        }
    }, [mentorId, userType, notificationPopUp])
    return (
        <React.Fragment>
            <Dialog
                open={notificationPopUp}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth= "sm"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Notifications</h1>
                    <hr style={{ margin: '10px 0 0 0' }} />
                </DialogTitle>
                <div style={{ padding: "0", margin: 0 }}>
                    <DialogContent style={{ margin: 0, padding: "0 20px" }}>
                        <div>
                            {
                                data && data?.map((Items) => (
                                    <div className="relative" style={{ padding: "10px 0 20px 0" }}>
                                        <div className='flex justify-between items-center'>
                                            {/* <img style={{ width: "50px", borderRadius: "50%" }} src={Items.image} alt="" /> */}
                                            <div  style={{ padding: "10px" }}>
                                                <p style={{ fontSize: "13px" }}>{Items.message}</p>
                                                <p className="absolute bottom-[20px] right-0" style={{ fontSize: "13px" }}>{Items.date.slice(0, 10)}</p>
                                                {/* <p style={{ fontWeight: "bold", color: "gray", marginTop: "4px" }}>{Items.uploaderName}</p> */}
                                            </div>
                                        </div>
                                        <hr style={{ color: "#000" }} />
                                    </div>
                                ))
                            }
                            {
                                !loading && !data?.length && <p> No Notification Yet!</p>
                            }
                        </div>
                    </DialogContent>
                </div>
                <DialogActions>
                    <Button style={{ fontSize: '12px', border: '1px solid #ccc', backgroundColor: "#15375c", color: "#fff", padding: "7px 30px" }} onClick={() => { setNotificationPopUp(false) }} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    )
}
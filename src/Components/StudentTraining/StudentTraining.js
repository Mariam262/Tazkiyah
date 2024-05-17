import React, { useEffect, useState } from 'react'
import thumbnail1 from '../../assets/images/thubmnail1.jfif'
import thumbnail2 from '../../assets/images/thubmnail2.jfif'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FeedbackModel from '../MentorTraining/FeedbackModal';


const StudentTraining = (fetchMentorTraining, setFetchMentorTraining) => {
    const [data, setData] = useState([]);
    const userId = useSelector(state => state.userId);
    const [showData, setShowData] = useState(true);
    const [uploaded, setUploaded] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedData, setSelectedData] = useState({});
    const [text, setText] = useState('');
    const userData = useSelector(state => state);
    const [confirmAdd, setConfirmAdd] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_PORT}/register/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            }
        }).then((response) => {
            if (!response.data.data.mentorId) {
                setShowData(false);
                return;
            }
            axios.get(`${process.env.REACT_APP_BACKEND_PORT}/upload/${response.data.data.mentorId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            }).then((res) => {
                setData(res.data.data);
                setUploaded(false);
            }).catch(err => {
            })
        }).catch(err => {
        })
    }, [fetchMentorTraining])

    const markRead = (id) => {
        axios.patch(`${process.env.REACT_APP_BACKEND_PORT}/upload/${id}/${userData.userId}/${userData.isMentor ? 'tarbiyah' : 'student'}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            setFetchMentorTraining(!fetchMentorTraining)
            //setFetchData(!fetchData);
        }).catch((err) => {
            //FailedToast(err.response.data.message);
        })
    }


    useEffect(() => {
        if (confirmAdd) {
            axios.post(`${process.env.REACT_APP_BACKEND_PORT}/feedback?userId=${userData.userId}`, {
                FeedbackText: text,
                SAPID: userData.sapid,
                materialName: selectedData.title
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                markRead(selectedData._id);
                setConfirmAdd(false);
            }).catch((err) => {
                setConfirmAdd(false);
                //FailedToast(err.response.data.message);
            })
        }
    }, [confirmAdd])

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h1 className="text-3xl pt-6 pb-5">Student Training Material</h1>
            </div>
            <div style={{ padding: "10px 40px", display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                {
                    data.map((list) => (
                        <div style={{ maxWidth: "350px", boxShadow: "2px 2px 3px #f4f4f4, -2px -3px 5px #f4f4f4", margin: "10px", height: "auto", width: "100%", border: "1px solid #ccc", borderRadius: "4px" }} className="relative pb-16">
                            <div class="card-content overflow-hidden w-full">
                                <h2 style={{ fontSize: "18px", color: "gray", padding: "20px 0 10px 20px", textAlign: "center" }}>Title: {list.title}</h2>
                                {
                                    list.pdf ? <p style={{ fontSize: "15px", padding: "10px 0 10px 20px", textAlign: "center", color: "blue" }}><Link to={`${process.env.REACT_APP_BACKEND_PORT}/files/${list.pdf}`} target="_blank" >Download</Link></p> : <a style={{ fontSize: "15px", padding: "10px 0 10px 20px", textAlign: "center", color: "blue" }} className="w-full block" href={`${list.link}`} target="_blank" >Open</a>
                                }
                            </div>
                            {
                                !list.readBy.includes(userData.userId) && <button onClick={() => { setSelectedData(list); setOpen(true) }} className="bg-[#007bff] text-white px-3 py-1 absolute bottom-2 right-2"> Mark as Read</button>
                            }
                        </div>
                    ))
                }
                {
                    !showData && <div className="text-3xl text-center mx-4 mt-10 md:max-w-[60%]" style={{ lineHeight: "3.2rem" }}>Feeling unassigned? Time to thrive! Reach out to a Tarbiyah Manager and snag a task that'll ignite your growth</div>
                }
                {
                    !uploaded && !data.length && <div className="text-3xl text-center mx-4 mt-10 leading-10">No Material Uploaded by your Mentor yet.</div>
                }
            </div>
            <FeedbackModel open={open} setOpen={setOpen} setConfirmAdd={setConfirmAdd} setText={setText} />
        </div>
    )
}

export default StudentTraining
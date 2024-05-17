import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Feedback = ({fetchMentorTraining, setFetchMentorTraining}) => {
    const [data, setData] = useState([]);
    const [confirmAdd, setConfirmAdd] = useState(false);
    const [uploaded, setUploaded] = useState(true);
    const userData = useSelector(state => state);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_PORT}/feedback?userId=${userData.userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            }
        }).then((res) => {
            setData(res.data);
            setUploaded(false);
        }).catch(err => {
        })
    }, [fetchMentorTraining])

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h1 className="text-3xl pt-6 pb-5">Feedbacks</h1>
            </div>
            <div style={{ padding: "10px 40px", display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                {
                    data.map((item) => (
                        <div style={{ maxWidth: "350px", boxShadow: "2px 2px 3px #f4f4f4, -2px -3px 5px #f4f4f4", margin: "10px", height: "auto", width: "100%", border: "1px solid #ccc", borderRadius: "4px" }} className="relative pb-16">
                            <div class="card-content overflow-hidden w-full">
                                <h2 style={{ fontSize: "18px", color: "gray", padding: "20px 0 10px 20px", textAlign: "center" }}>SAP ID: {item.SAPID}</h2>
                                <p style={{ fontSize: "15px", padding: "10px 0 10px 20px", textAlign: "center", color: "blue" }}>Feedback: {item.FeedbackText}</p>
                                <p style={{ fontSize: "15px", padding: "10px 0 10px 20px", textAlign: "center", color: "blue" }}>Material: {item.materialName}</p>
                            </div>
                        </div>
                    ))
                }
                {
                    !uploaded && !data.length && <div className="text-3xl text-center mx-4 mt-10 leading-10">No Feedback Yet.</div>
                }
            </div>
        </div>
    )
}

export default Feedback
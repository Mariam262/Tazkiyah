import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const MentorMaterial = ({ setEditUploadContentPopup, fetchData, setFetchData }) => {
    const [data, setData] = useState([]);
    const userId = useSelector(state => state.userId);
    const [uploaded, setUploaded] = useState(false);

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

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h1 className="text-3xl pt-6 pb-5">Mentor Uploaded Material</h1>
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
                        }} className="px-2">
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
                                        }}>{list.link}</p>
                                }
                            </div>
                        </div>
                    ))
                }

                {
                    uploaded && !data.length && <div className="text-3xl text-center mx-4 mt-10 leading-10">No Material by you yet.</div>
                }
            </div>
        </div>
    )
}

export default MentorMaterial;
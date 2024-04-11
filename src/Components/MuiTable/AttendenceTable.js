import React, { useEffect, useState } from 'react'
import style from '../timeline.module.css'
import '../style.css'
import { DataGrid } from '@mui/x-data-grid';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useSelector } from "react-redux"
import axios from 'axios';
import { FailedToast } from '../toast';

export const AttendenceTable = ({ currentDept, setCurrentDept }) => {
    const [show, setShow] = useState(false)
    const [gridWidth, setGridWidth] = useState(0);
    const [tableShow, setTableShow] = useState(false);
    const [selected, setSelected] = useState(false);
    const [rows, setRows] = useState([]);
    const [event, setEvent] = useState({});
    const [eventDetail, setEventDetail] = useState([])
    const [fetchEvents, setFetchEvents] = useState(false);
    const [eventDetails, setEventDetails] = useState({ eventDate: "", eventName: "" });
    const [markAttendece, setMarkAttendence] = useState(false);
    const [showAttendence, setShowAttendence] = useState(false);
    const [selectedAttendence, setSelectedAttendence] = useState(false);
    const [loading, setLoading] = useState(false);
    const email = useSelector(state => state)?.email;
    const userId = useSelector(state => state.userId);
    const mentorEmail = useSelector(state => state)?.email?.includes('mentor');

    useEffect(() => { window.scrollTo(0, 0) }, [show])

    useEffect(() => {
        const handleResize = () => {
            setGridWidth(window.innerWidth);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
        // eslint-disable-next-line
    }, [window.innerWidth]);

    useEffect(() => {
        if (email !== 'tarbiyah@gmail.com') {
            axios.get(`${process.env.REACT_APP_BACKEND_PORT}/assign/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            }).then((res) => {
                const newData = res.data.data.assignedStudents.map((Item) => {
                    return { ...Item, id: Item.sapID, status: "Present" }
                })
                setRows(newData);
            }).catch(err => {
                FailedToast(err.response.data.message)
            })
        }
    }, [selected, markAttendece])

    const viewAttendence = (selectedAttendence) => {
        setSelectedAttendence(selectedAttendence);
        const newData = selectedAttendence?.eventAttendence?.map((Item) => {
            return { ...Item, id: Item.sapID }
        })
        setRows(newData);
    }

    const columns = [
        {
            field: 'id',
            headerName: 'SAP ID',
            width: gridWidth > 500 ? 180 : 100,
            renderCell: (params) => (
                <div style={{ fontSize: `${gridWidth > 500 ? '20px' : '13px'}` }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'department',
            headerName: 'Department',
            width: gridWidth > 800 ? 300 : gridWidth > 550 ? 300 : 100,
            renderCell: (params) => (
                <div style={{ fontSize: `${gridWidth > 500 ? '17px' : '13px'}` }}>
                    {
                        gridWidth > 500 ? `${params.value}` : `${params.value.split(" ")[0]}`
                    }
                </div>
            ),
        },
        {
            field: 'status',
            headerName: '',
            fontSize: "20px",
            width: gridWidth > 500 ? 130 : 100,
            renderCell: (params) => (
                <div style={{ color: '#fff', padding: `${gridWidth > 500 ? '7px 23px' : '7px 10px'}`, borderRadius: '3px', backgroundColor: `${params.value === 'Present' ? 'green' : '#FA5A16'}`, fontSize: '14px' }}>
                    {params.value}
                </div>
            ),
        },
    ];

    const AttendenceMarkColumn = [
        {
            field: 'id',
            headerName: 'sapID',
            width: gridWidth > 500 ? 180 : 100,
            renderCell: (params) => (
                <div style={{ fontSize: `${gridWidth > 500 ? '20px' : '13px'}` }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'department',
            headerName: 'Department',
            width: gridWidth > 800 ? 300 : gridWidth > 550 ? 300 : 100,
            renderCell: (params) => (
                <div style={{ fontSize: `${gridWidth > 500 ? '17px' : '13px'}` }}>
                    {
                        gridWidth > 500 ? `${params.value}` : `${params.value.split(" ")[0]}`
                    }
                </div>
            ),
        },
        {
            field: 'status',
            headerName: '',
            fontSize: "20px",
            width: gridWidth > 500 ? 130 : 100,
            renderCell: (params) => (
                <select onChange={(e) => {
                    setRows((prevRows) => {
                        return prevRows.map((currentRow) => {
                            if (currentRow.id === params.id) return { ...currentRow, status: e.target.value };
                            return currentRow;
                        })
                    })
                }} style={{ color: '#000', padding: `${gridWidth > 500 ? '7px 23px' : '7px 10px'}`, borderRadius: '3px', fontSize: '14px' }}>
                    <option value="Present" key="">Present</option>
                    <option value="Absent" key="">Absent</option>
                </select>
            ),
        },
    ];

    const markAttendence = () => {
        axios.post(`${process.env.REACT_APP_BACKEND_PORT}/attendence`, {
            mentorId: userId,
            eventName: eventDetails.eventName,
            eventDate: eventDetails.eventDate,
            eventAttendence: rows
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            }
        }).then((res) => {
            setMarkAttendence(false);
            setFetchEvents(!fetchEvents)
        }).catch(err => {
            FailedToast(err.response.data.message)
        })
    }
    useEffect(() => {
        if (email === 'tarbiyah@gmail.com') {
            setLoading(true);
            setEventDetail(null);
            axios.get(`${process.env.REACT_APP_BACKEND_PORT}/attendence/all?dept=${(currentDept === 'CS' || currentDept === 'SE' || currentDept === 'CA') ? 'FC' : currentDept ?? ""}&subDept=${(currentDept === 'CS' ? 'Computer Science' :  currentDept === 'SE' ? 'Software Engineering' : currentDept === 'CA' ? 'Computer Arts' : '')}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            }).then((res) => {
                setLoading(false);
                setEventDetail(res.data.data);
            }).catch(err => {
                setLoading(false);
                setEventDetail(null);
            })
        } else {
            setLoading(true);
            setEventDetail(null);
            axios.get(`${process.env.REACT_APP_BACKEND_PORT}/attendence?mentorId=${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            }).then((res) => {
                setLoading(false);
                setEventDetail(res.data.data);
            }).catch(err => {
                setLoading(false);
                setEventDetail(null);
            })
        }
    }, [fetchEvents, currentDept])
    useEffect(() => {
        setSelected(false);
        setEvent({});
        setTableShow(currentDept === 'SE' || currentDept === 'CS' || currentDept === 'CA' || currentDept === 'Pharmacy' || currentDept === 'DBD' || currentDept === 'Psychology' || mentorEmail)

        //eslint-disable-next-line
    }, [currentDept])
    return (
        <>
            {
                tableShow ? (<>
                    <div id={`${style.qualification}`}>
                        {email === "tarbiyah@gmail.com" && <div>
                                <h1 className='text-center text-4xl mx-3 font-semibold mb-5'>All Events Attendence Under {currentDept} Department</h1>
                            </div>}
                        { email !== "tarbiyah@gmail.com" &&
                            !markAttendece && !showAttendence && !selected && <div style={{ display: "flex", justifyContent: "center" }}>
                                <button onClick={() => { setMarkAttendence(true) }} style={{ margin: "20px 0", backgroundColor: "#15375c", color: "#fff", padding: "7px 14px", borderRadius: "4px" }}>Add Session Attendence</button>
                            </div>
                        }
                        {
                            loading && eventDetail ? <div className="h-[50vh] flex justify-center items-center"><h2 className="text-center text-3xl font-semibold">loading...</h2></div> : !loading && eventDetail===null && <div className="h-[50vh] flex justify-center items-center"><h2 className="text-center text-3xl font-semibold">No Event Found Under this Department</h2></div>
                        }
                        {
                            !markAttendece && !showAttendence && !selected && <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }} className="ml-3">
                                {
                                    eventDetail?.map((item) => (
                                        <div style={{ padding: '20px', margin: '20px', border: '1px solid #ccc', boxShadow: '1px 1px 2px 3px #ccc', width: '300px', height: '230px', position: 'relative' }}>
                                            <h1 style={{ margin: '10px', fontSize: '17px', fontWeight: 'bold' }}>Event Name: <span style={{ fontWeight: 'normal', lineHeight: '2.1rem' }}>{item.eventName}</span></h1>
                                            <h1 style={{ margin: '20px 10px', fontSize: '17px', fontWeight: 'bold' }}>Date: <span style={{ fontWeight: 'normal' }}>{item.eventDate.slice(0, 10)}</span></h1>
                                            <div style={{ position: 'absolute', bottom: '10px', left: '20%', width: '190px' }} className='flex justify-center'>
                                                <button onClick={() => {
                                                    // setSelected(true);
                                                    setMarkAttendence(false);
                                                    setShowAttendence(true);
                                                    setEvent({
                                                        eventName: item.eventName,
                                                        eventDate: item.eventDate
                                                    });
                                                    viewAttendence(item);
                                                    setShow(!show)
                                                }} style={{ fontSize: '17px', margin: '10px auto', backgroundColor: '#15375c', padding: '10px 20px', color: '#fff', borderRadius: '5px' }}>View Attendence</button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        }

                        {
                            !markAttendece && showAttendence && <div style={{ position: 'relative', paddingTop: '30px' }} className={`${style.main} dark:bg-slate-400`}>
                                <div onClick={() => { setSelected(false); setEvent({}); setMarkAttendence(false); setShowAttendence(false) }} style={{ position: 'absolute', top: 0, left: '6%', color: '#000', display: 'flex', alignItems: 'center', cursor: 'pointer', marginTop: '10px' }}>
                                    <ArrowLeftIcon style={{ fontSize: '30px' }} />
                                    <p>Go Back</p>
                                </div>
                                <div className='flex flex-column pt-10'>
                                    <h1 style={{ fontFamily: 'sans-serif', fontWeight: 'bold', padding: '0 0 10px 0' }}>Event Date: <span style={{ fontWeight: 'normal' }}>{selectedAttendence.eventDate}</span></h1>
                                    <h1 style={{ fontFamily: 'sans-serif', fontWeight: 'bold', padding: '10px 0' }}>Event Name: <span style={{ fontWeight: 'normal' }}>{selectedAttendence.eventName}</span></h1>
                                    <h1 style={{ fontFamily: 'sans-serif', fontWeight: 'bold', padding: '10px 0 20px 0' }}>Total Participants: <span style={{ fontWeight: 'normal' }}>{selectedAttendence.eventAttendence.length}</span></h1>
                                </div>

                                <div style={{ height: '100%', width: 'auto', margin: "10px 20px" }}>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        style={{ fontSize: '15px' }}
                                    />
                                </div>
                            </div>
                        }
                        {
                            markAttendece && !showAttendence && <div style={{ position: 'relative', paddingTop: '30px', height: "100%" }} className={`${style.main} dark:bg-slate-400`}>
                                <input onChange={(e) => { setEventDetails({ ...eventDetails, eventName: e.target.value }) }} type="text" placeholder='Name of the Event' style={{ width: "250px", padding: "4px 10px", color: "gray", fontSize: "17px", outline: "none", boxShadow: "2px 2px 1px #ccc, -2px -2px 1px #ccc", margin: "10px 0 10px 0" }} />
                                <input onChange={(e) => { setEventDetails({ ...eventDetails, eventDate: e.target.value }) }} type="date" style={{ width: "250px", padding: "4px 10px", color: "gray", fontSize: "17px", outline: "none", boxShadow: "2px 2px 1px #ccc, -2px -2px 1px #ccc", margin: "0px 0 10px 0" }} />
                                <div onClick={() => { setMarkAttendence(false); }} style={{ position: 'absolute', top: 0, left: '6%', color: '#000', display: 'flex', alignItems: 'center', cursor: 'pointer', marginTop: '10px' }}>
                                    <ArrowLeftIcon style={{ fontSize: '30px' }} />
                                    <p>Go Back</p>
                                </div>
                                <div style={{ height: '100%', width: 'auto', margin: "10px 20px" }}>
                                    <DataGrid
                                        rows={rows}
                                        columns={AttendenceMarkColumn}
                                        style={{ fontSize: '15px' }}
                                    />
                                </div>
                                <button onClick={markAttendence} style={{ margin: "20px 0", backgroundColor: "#15375c", color: "#fff", padding: "7px 14px", borderRadius: "4px" }}>Save Attendence</button>
                            </div>
                        }
                    </div>
                </>) : (<>
                    <div className='flex flex-col justify-center items-center' style={{ height: '50vh' }}>
                        <h1 style={{ fontWeight: 'bold', fontSize: '23px', textAlign: 'center', lineHeight: '3.5rem' }}>Please Select the Desired Department</h1>
                    </div>
                </>)
            }
        </>
    )
}
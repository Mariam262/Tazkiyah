import React, { useEffect, useState } from 'react'
import './style.css'
import MenteesDataGrid from './MenteesDataGrid';
import axios from "axios"
import { FailedToast } from './toast';
import { useSelector } from 'react-redux';
import { validateMentorEmail } from '../utils/validateEmail';

const MentorList = ({ selectedSemester, selectedMentor, setSelectedMentor, selectedSemesterTemp, studentList, setStudentList }) => {
    const [loading, setLoading] = useState(false);
    const [found, setFound] = useState(true);
    const email = useSelector(state => state.email);
    const userId = useSelector(state => state.userId);

    useEffect(() => {
        if (selectedSemester && !selectedMentor && !validateMentorEmail(email)) {
            setLoading(true);
            axios.get(`${process.env.REACT_APP_BACKEND_PORT}/assign`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            }).then((res) => {
                setLoading(false);
                setFound(res.data.data.length === 0 ? false : true)
                setMentorList(res.data.data);
            }).catch(err => {
                setLoading(false)
                FailedToast(err.response.data.message)
            })
        } else if (validateMentorEmail(email)) {
            setLoading(true);
            axios.get(`${process.env.REACT_APP_BACKEND_PORT}/assign/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            }).then((res) => {
                setLoading(false);
                setFound(res.data.data.length === 0 ? false : true)
                setMentorList(res.data.data);
                setSelectedMentor(res.data.data);
                selectMentor(res.data.data);
            }).catch(err => {
                setLoading(false)
                FailedToast(err.response.data.message)
            })
        } else {
            setFound(true);
            setLoading(false);
        }
    }, [selectedSemester, selectedMentor])

    const selectMentor = (MentorDetail) => {
        const data = MentorDetail.assignedStudents;
        setStudentList(data);
    }
    const [mentorList, setMentorList] = useState([]);
    return (
        <>
            {
                !loading && <>
                    {
                        selectedSemester ? (<div className="mentor-list-container">
                            {
                                selectedMentor ? (<MenteesDataGrid data={studentList} setStudentList={setStudentList} selectedMentor={selectedMentor} setSelectedMentor={setSelectedMentor} />
                                ) : (<>
                                    <h1 style={{ textAlign: "center", fontSize: "22px" }}>Mentor's List</h1>
                                    <hr style={{ width: "100px", margin: "4px auto 30px auto", padding: "1px" }} />
                                    <div>
                                        <h1 style={{ textAlign: "center", fontSize: "18px", marginBottom: "10px" }}>Total Registered Mentors: {mentorList?.length}</h1>
                                    </div>
                                    <div className="mentor-list">
                                        {mentorList?.map((mentor, index) => (
                                            <div onClick={() => { setSelectedMentor(mentor); selectMentor(mentor) }} style={{ cursor: "pointer", border: "2px solid #15375c", transition: "transform 300ms ease-in-out 0s" }} key={index} className="mentor-card hover:scale-110">
                                                <h2>SAP ID: {mentor.sapID}</h2>
                                                <h2>Department: {mentor.dept}</h2>
                                                {mentor.dept === 'FC' && <h2>Sub Department: {mentor.subDept}</h2>}
                                                <p>Students Assigned: {mentor.assignedStudents.length}</p>
                                            </div>
                                        ))}
                                    </div>
                                </>)
                            }
                        </div>) : (<>
                            <div className='flex flex-col justify-center items-center' style={{ height: '50vh' }}>
                                <h1 style={{ fontWeight: 'bold', fontSize: '23px', textAlign: 'center', lineHeight: '3.5rem' }}>Please Select the Desired Department and Semester.</h1>
                            </div>
                        </>)
                    }
                </>
            }

            {loading && <div className='flex flex-col justify-center items-center' style={{ height: '50vh' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '23px', textAlign: 'center', lineHeight: '3.5rem' }}>Loading...</h1>
            </div>}

            {!found && <div className='flex flex-col justify-center items-center' style={{ height: '50vh' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '23px', textAlign: 'center', lineHeight: '3.5rem' }}>No Mentor Found</h1>
            </div>}
        </>
    )
}

export default MentorList
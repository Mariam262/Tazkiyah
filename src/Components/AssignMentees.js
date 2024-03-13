import React, { useEffect, useState } from 'react'
import './style.css'
import MenteesDataGrid from './MenteesDataGrid';
import axios from "axios"
import { FailedToast } from './toast';
const AssignMentees = ({ selectedSemester, setSelectedSemester, selectedMentor, setSelectedMentor, selectedSemesterTemp }) => {
    function generateRandomId() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    useEffect(() => {
        if (selectedSemester && !selectedMentor) {
            axios.get(`${process.env.REACT_APP_BACKEND_PORT}/assign`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            }).then((res) => {
                setMentorList(res.data.data);
            }).catch(err => {
                FailedToast(err.response.data.message)
            })
        } else if (selectedSemester && selectedMentor) {
            const data = selectedMentor.assignedStudents?.map((Item) => {
                return { sapID: Item.sapID, Department: Item.department, id: Item.sapID };
            });
            setStudentList(data);
        }
    }, [selectedSemester, selectedMentor])

    const [mentorList, setMentorList] = useState([]);

    const [studentList, setStudentList] = useState([
        // {
        //     id: generateRandomId(),
        //     sapid: generateRandomId(),
        //     Name: "Student 1",
        //     Department: "FC"
        // },
        // {
        //     id: generateRandomId(),
        //     sapid: generateRandomId(),
        //     Name: "Student 2",
        //     Department: "SE"
        // },
        {
            id: generateRandomId(),
            sapid: generateRandomId(),
            Name: "Student 3",
            Department: "CA"
        },
        // {
        //     id: generateRandomId(),
        //     sapid: generateRandomId(),
        //     Name: "Student 4",
        //     Department: "CS"
        // },
        // {
        //     id: generateRandomId(),
        //     sapid: generateRandomId(),
        //     Name: "Student 5",
        //     Department: "MLT"
        // },
        // {
        //     id: generateRandomId(),
        //     sapid: generateRandomId(),
        //     Name: "Student 6",
        //     Department: "DPT"
        // },
        // {
        //     id: generateRandomId(),
        //     sapid: generateRandomId(),
        //     Name: "Student 7",
        //     Department: "xyz"
        // },
        // {
        //     id: generateRandomId(),
        //     sapid: generateRandomId(),
        //     Name: "Student 8",
        //     Department: "xyz"
        // },
        // {
        //     id: generateRandomId(),
        //     sapid: generateRandomId(),
        //     Name: "Student 9",
        //     Department: "xyz"
        // },
        // {
        //     id: generateRandomId(),
        //     sapid: generateRandomId(),
        //     Name: "Student 10",
        //     Department: "xyz"
        // },
        // {
        //     id: generateRandomId(),
        //     sapid: generateRandomId(),
        //     Name: "Student 11",
        //     Department: "xyz"
        // },
        // {
        //     id: generateRandomId(),
        //     sapid: generateRandomId(),
        //     Name: "Student 12",
        //     Department: "xyz"
        // },
        // {
        //     id: generateRandomId(),
        //     sapID: generateRandomId(),
        //     Department: "xyz"
        // },
        // {
        //     id: generateRandomId(),
        //     sapid: generateRandomId(),
        //     Name: "Student 14",
        //     Department: "xyz"
        // },
        // {
        //     id: generateRandomId(),
        //     sapid: generateRandomId(),
        //     Name: "Student 15",
        //     Department: "xyz"
        // },
        // {
        //     id: generateRandomId(),
        //     sapid: generateRandomId(),
        //     Name: "Student 16",
        //     Department: "xyz"
        // },
        // {
        //     id: generateRandomId(),
        //     sapid: generateRandomId(),
        //     Name: "Student 17",
        //     Department: "xyz"
        // },
        // {
        //     id: generateRandomId(),
        //     sapid: generateRandomId(),
        //     Name: "Student 18",
        //     Department: "xyz"
        // },
        // {
        //     Name: "Student 19",
        //     id: generateRandomId(),
        //     sapid: generateRandomId(),
        //     Department: "xyz"
        // },
        // {
        //     id: generateRandomId(),
        //     sapid: generateRandomId(),
        //     Name: "Student 20",
        //     Department: "xyz"
        // }
    ]);

    return (
        <>
            {
                selectedSemester ? (<div className="mentor-list-container">
                    {
                        selectedMentor ? (<MenteesDataGrid data={studentList} setStudentList={setStudentList} selectedMentor={selectedMentor} setSelectedMentor={setSelectedMentor} />
                        ) : (<>
                            <h1 style={{ textAlign: "center", fontSize: "22px" }}>Mentor's List</h1>
                            <hr style={{ width: "100px", margin: "4px auto 30px auto", padding: "1px" }} />
                            <div>
                                <h1 style={{ textAlign: "center", fontSize: "18px", marginBottom: "10px" }}>Semester: {selectedSemesterTemp}</h1>
                            </div>
                            <div className="mentor-list">
                                {mentorList?.map((mentor, index) => (
                                    <div onClick={() => { setSelectedMentor(mentor) }} style={{ cursor: "pointer", border: "2px solid #15375c", transition: "transform 300ms ease-in-out 0s" }} key={index} className="mentor-card hover:scale-110">
                                        <h2>SAP ID: {mentor.sapID}</h2>
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
    )
}

export default AssignMentees
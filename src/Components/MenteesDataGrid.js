import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ToastContainer, { FailedToast } from './toast';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import axios from 'axios';


const MenteesDataGrid = ({ data, setStudentList, selectedMentor, setSelectedMentor }) => {
    const [gridWidth, setGridWidth] = useState(0);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => { setOpen(true); };
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedOption, setSelectedOption] = useState();
    const [suggestionArray, setSuggestionArray] = useState([]);
    const [fetchAgain, setFetchAgain] = useState(false)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_PORT}/assign/students/unassigned`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            }
        }).then((res) => {
            setSuggestionArray(res.data.data);
            setSuggestions(res.data.data.slice(0, 5))
        }).catch(err => {
            FailedToast(err.response.data.message)
        })
    }, [fetchAgain])
    const updateData = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_PORT}/assign`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            }
        }).then((res) => {
            const data = res.data.data[0].assignedStudents?.map((Item) => {
                return { sapID: Item.sapID, Department: Item.department, id: Item.sapID };
            });
            setStudentList(data);
        }).catch(err => {
            FailedToast(err.response.data.message)
        })
    }
    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        // Show suggestions based on input
        const filteredSuggestions = suggestionArray.filter(suggestion =>
            suggestion.sapid.toLowerCase().startsWith(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions.slice(0, 5)); // Limit to 5 suggestions
    };

    const AssignStudent = () => {
        axios.post(`${process.env.REACT_APP_BACKEND_PORT}/assign`, {
            mentorID: selectedMentor.mentorID,
            studentID: selectedOption._id,
            sapid: selectedOption.sapid,
            dept: selectedOption.dept
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            }
        }).then((res) => {
            setFetchAgain(!fetchAgain)
            setInputValue("");
            updateData();
            ToastContainer("Student Assigned")
        }).catch(err => {
            FailedToast(err.response.data.message)
        })
    }


    const DeleteStudent = (sapId) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_PORT}/assign?mentorID=${selectedMentor.mentorID}&sapId=${sapId}`, {
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            }
        }).then((res) => {
            setFetchAgain(!fetchAgain)
            updateData();
            ToastContainer("Deleted Successfully")
        }).catch(err => {
            FailedToast(err.response.data.message)
        })
    }


    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion.sapid);
        setSelectedOption(suggestion)
        setSuggestions([]); // Clear suggestions when a suggestion is clicked
    };


    const handleClose = () => {
        setOpen(false);
        setStudentData(Defaultterms)
    };

    const Defaultterms = {
        sapID: "",
        Department: ""
    }

    let [studentData, setStudentData] = useState(Defaultterms)

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
    const handleDelete = (id) => {
        const updatedData = data.filter(arr => arr.sapID !== id);
        setStudentList(updatedData)
        ToastContainer("Student Removed from the mentor!")
    }
    const columns = [
        {
            field: 'sapID',
            headerName: 'SAP ID',
            width: gridWidth > 800 ? 200 : gridWidth > 500 ? 150 : 75,
            renderCell: (params) => (
                <div style={{ fontSize: `${gridWidth > 500 ? '20px' : '13px'}` }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'Department',
            headerName: 'Department',
            width: gridWidth > 800 ? 330 : gridWidth > 550 ? 210 : 130,
            renderCell: (params) => (
                <div style={{ fontSize: `${gridWidth > 500 ? '17px' : '13px'}` }}>
                    {
                        gridWidth > 500 ? `${params.value}` : `${params.value.split(" ")[0]}`
                    }
                </div>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <button style={{ padding: "5px 10px", backgroundColor: "rgb(0, 122, 255)", color: "#fff", borderRadius: "5px" }} onClick={() => DeleteStudent(params.id)}>Delete</button>
            ),
        },

    ];

    const rows = data || [];

    return (
        <div style={{ height: '100%', width: "100%", margin: "10px 20px", position: "relative" }}>
            <div onClick={() => { setSelectedMentor(null) }} style={{ position: 'absolute', top: -20, left: '4%', color: '#000', display: 'flex', alignItems: 'center', cursor: 'pointer', marginTop: '10px' }}>
                <ArrowLeftIcon style={{ fontSize: '30px' }} />
                <p>Go Back</p>
            </div>
            <div className='flex flex-column pt-10'>
                <h1 style={{ fontFamily: 'sans-serif', fontWeight: 'bold', padding: '0 0 10px 0' }}>Mentor SAP ID: <span style={{ fontWeight: 'normal' }}>{selectedMentor.sapID}</span></h1>
                <h1 style={{ fontFamily: 'sans-serif', fontWeight: 'bold', padding: '10px 0' }}>Students Assigned: <span style={{ fontWeight: 'normal' }}>{selectedMentor?.assignedStudents?.length}</span></h1>
                <button onClick={handleClickOpen} style={{ padding: "5px 10px", fontSize: "17px", width: "150px", margin: "auto", backgroundColor: "#007aff", marginTop: "10px", color: "#fff", marginBottom: "10px" }}>Add Student</button>
            </div>

            <DataGrid
                rows={rows}
                columns={columns}
                style={{ fontSize: '15px', maxWidth: "690px", margin: "20px auto 20px auto" }}
            />
            {
                <React.Fragment>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle style={{ fontSize: "20px" }} id="alert-dialog-title">
                            Add New Student to Mentor having SAP ID {selectedMentor.sapID}
                        </DialogTitle>
                        <hr style={{ margin: "0 20px" }} />
                        <DialogContent>
                            <h1 style={{ paddingBottom: '4px', fontSize: '14px', marginTop: "10px" }} className='font-semibold'>SAP ID: </h1>
                            <input onChange={handleChange} className="border rounded-md p-2 w-[100%] shadow-sm" type="text" placeholder='SAP ID' value={inputValue} />
                            {suggestions.length > 0 && (
                                <ul className="border rounded-md mt-1 shadow-md">
                                    {suggestions.map((suggestion, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            className="px-2 py-1 cursor-pointer hover:bg-gray-200"
                                        >
                                            <p>SAP ID:  {suggestion?.sapid} <span className="mr-6"></span>  Department: {suggestion?.dept}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}

                        </DialogContent>
                        <DialogActions>
                            <Button style={{ fontSize: '14px', border: '1px solid #ccc', backgroundColor: "#15375c", color: "#fff" }} onClick={handleClose}>Close</Button>
                            <Button disabled={!selectedOption} style={{ fontSize: '14px', border: '1px solid #ccc', backgroundColor: "#15375c", color: "#fff" }} onClick={() => { AssignStudent(); ToastContainer("Student Assigned Successfully!"); handleClose() }} autoFocus>
                                Add Student
                            </Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>
            }
        </div>
    )
}

export default MenteesDataGrid
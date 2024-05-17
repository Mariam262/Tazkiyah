import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Woman2Icon from '@mui/icons-material/Woman2';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AssignMentees = ({ currentDept, setCurrentDept, closeSideBar, sidebarshow, setSideBarShow, setProceed, selectedSemester, setSelectedSemester, selectDpt, setSelectDpt }) => {
    let [onClick, setOnClick] = useState(false);
    const userId = useSelector(state=>state.userId);
    const [data, setData] = useState();
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_PORT}/register/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            }
        }).then((res) => {
            setData(res.data.data)
        }).catch(err => {
        })
    }, [])
    return (
        <>
            <p style={{ color: '#fff', fontSize: '17px', marginTop: '15px' }}>Select your Department: </p>
            <div style={{ paddingLeft: '10px', marginBottom: '10px' }}>
                <NavLink className={`${data?.dept === 'FC' ? 'block' : 'hidden'}`} to="/assign-mentees">
                    <li onClick={() => { setOnClick(!onClick); setCurrentDept('FC'); setSelectedSemester(null) }} style={{ backgroundColor: `${currentDept === 'FC' || currentDept === 'Software Engineering' || currentDept === 'Computer Science' || currentDept === 'Computer Arts' ? '#3f6184' : ''}`, borderRadius: `${currentDept === 'FC' || currentDept === 'Software Engineering' || currentDept === 'Computer Science' || currentDept === 'Computer Arts' ? '14px' : ''}`, marginTop: '10px', paddingLeft: '20px', width: '90%', paddingTop: '10px', paddingBottom: '10px' }}>
                        <PeopleIcon style={{ fontSize: '30px', marginRight: '10px' }} />
                        FC
                        {
                            onClick ? <ArrowDownwardIcon style={{ fontSize: '20px', marginLeft: '1px' }} /> : <ArrowRightAltIcon style={{ fontSize: '20px', marginLeft: '4px' }} />
                        }
                    </li>
                </NavLink>
                {
                    onClick && <div className={`${data?.subDept === 'Software Engineering' ? 'block' : 'hidden'}`} style={{ paddingLeft: '20px', marginBottom: '10px' }}>
                        <NavLink to="/assign-mentees">
                            <li  onClick={() => {
                                setCurrentDept('Software Engineering');
                                closeSideBar && setSideBarShow(!sidebarshow); setProceed(false);
                                setSelectDpt(!selectDpt);
                                setSelectedSemester(null)
                            }} style={{ backgroundColor: `${currentDept === 'Software Engineering' ? '#3f6184' : ''}`, borderRadius: `${currentDept === 'Software Engineering' ? '14px' : ''}`, marginTop: '10px', paddingLeft: '21px', width: '100%', paddingTop: '10px', paddingBottom: '10px'}}>
                                Software Engineering
                            </li>
                        </NavLink>
                        <NavLink className={`${data?.subDept === 'Computer Science' ? 'block' : 'hidden'}`} to="/assign-mentees">
                            <li onClick={() => {
                                setCurrentDept('Computer Science');
                                setSelectDpt(!selectDpt);
                                setSelectedSemester(null)
                                closeSideBar && setSideBarShow(!sidebarshow); setProceed(false);
                            }} style={{ backgroundColor: `${currentDept === 'Computer Science' ? '#3f6184' : ''}`, borderRadius: `${currentDept === 'Computer Science' ? '14px' : ''}`, marginTop: '10px', paddingLeft: '21px', width: '100%', paddingTop: '10px', paddingBottom: '10px' }}>
                                Computer Science
                            </li>
                        </NavLink>
                        <NavLink className={`${data?.subDept === 'Computer Arts' ? 'block' : 'hidden'}`} to="/assign-mentees">
                            <li onClick={() => {
                                setCurrentDept('Computer Arts');
                                setSelectDpt(!selectDpt);
                                setSelectedSemester(null)
                                closeSideBar && setSideBarShow(!sidebarshow); setProceed(false);
                            }} style={{ backgroundColor: `${currentDept === 'Computer Arts' ? '#3f6184' : ''}`, borderRadius: `${currentDept === 'Computer Arts' ? '14px' : ''}`, marginTop: '10px', paddingLeft: '21px', width: '100%', paddingTop: '10px', paddingBottom: '10px' }}>
                                Computer Arts
                            </li>
                        </NavLink>
                    </div>
                }
                <NavLink className={`${data?.dept === 'Pharmacy' ? 'block' : 'hidden'}`} to="/assign-mentees">
                    <li onClick={() => {
                        setCurrentDept('Pharmacy'); closeSideBar && setSideBarShow(!sidebarshow); setProceed(false);
                        setSelectDpt(!selectDpt);
                        setSelectedSemester(null)
                    }} style={{ backgroundColor: `${currentDept === 'Pharmacy' ? '#3f6184' : ''}`, borderRadius: `${currentDept === 'Pharmacy' ? '14px' : ''}`, marginTop: '10px', paddingLeft: '20px', width: '90%', paddingTop: '10px', paddingBottom: '10px' }}>
                        <PeopleIcon style={{ fontSize: '30px', marginRight: '10px' }} />
                        Pharmacy
                    </li>
                </NavLink>

                <NavLink className={`${data?.dept === 'DBD' ? 'block' : 'hidden'}`} to="/assign-mentees">
                    <li onClick={() => {
                        setCurrentDept('DBD'); closeSideBar && setSideBarShow(!sidebarshow); setProceed(false);
                        setSelectDpt(!selectDpt);
                        setSelectedSemester(null)
                    }} style={{ backgroundColor: `${currentDept === 'DBD' ? '#3f6184' : ''}`, borderRadius: `${currentDept === 'DBD' ? '14px' : ''}`, marginTop: '10px', paddingLeft: '20px', width: '90%', paddingTop: '10px', paddingBottom: '10px' }}>
                        <Woman2Icon style={{ fontSize: '30px', marginRight: '10px' }} />
                        DBD
                    </li>
                </NavLink>

                <NavLink className={`${data?.dept === 'Psychology' ? 'block' : 'hidden'}`}  to="/assign-mentees">
                    <li onClick={() => {
                        setCurrentDept('Psychology'); closeSideBar && setSideBarShow(!sidebarshow); setProceed(false);
                        setSelectDpt(!selectDpt);
                        setSelectedSemester(null)
                    }} style={{ backgroundColor: `${currentDept === 'Psychology' ? '#3f6184' : ''}`, borderRadius: `${currentDept === 'Psychology' ? '14px' : ''}`, marginTop: '10px', paddingLeft: '20px', width: '90%', paddingTop: '10px', paddingBottom: '10px' }}>
                        <PublicIcon style={{ fontSize: '30px', marginRight: '10px' }} />
                        Psychology
                    </li>
                </NavLink>
            </div>
        </>
    )
}

export default AssignMentees
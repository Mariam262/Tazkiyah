import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Woman2Icon from '@mui/icons-material/Woman2';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const PerformanceAnalyticsSideBar = ({ currentDept, setCurrentDept, closeSideBar, sidebarshow, setSideBarShow, setProceed, selectDpt, setSelectDpt, setSelectedSemester }) => {
    let [onClick, setOnClick] = useState(false)
    return (
        <>
            <p style={{ color: '#fff', fontSize: '17px', marginTop: '15px' }}>Select your Department: </p>
            <div style={{ paddingLeft: '10px', marginBottom: '10px' }}>
                <NavLink to="/performance">
                    <li onClick={() => { setOnClick(!onClick); setCurrentDept('FC'); }} style={{ backgroundColor: `${currentDept === 'FC' || currentDept === 'CS' || currentDept === 'SE' || currentDept === 'CA' ? '#3f6184' : ''}`, borderRadius: `${currentDept === 'FC' || currentDept === 'CS' || currentDept === 'SE' || currentDept === 'CA' ? '14px' : ''}`, marginTop: '10px', paddingLeft: '20px', width: '90%', paddingTop: '10px', paddingBottom: '10px' }}>
                        <PeopleIcon style={{ fontSize: '30px', marginRight: '10px' }} />
                        FC
                        {
                            onClick ? <ArrowDownwardIcon style={{ fontSize: '20px', marginLeft: '1px' }} /> : <ArrowRightAltIcon style={{ fontSize: '20px', marginLeft: '4px' }} />
                        }
                    </li>
                </NavLink>
                {
                    onClick && <div style={{ paddingLeft: '20px', marginBottom: '10px' }}>
                        <NavLink to="/performance">
                            <li onClick={() => {
                                setCurrentDept('SE');
                                closeSideBar && setSideBarShow(!sidebarshow); setProceed(false);
                                setSelectDpt(!selectDpt);
                                setSelectedSemester(null);
                            }} style={{ backgroundColor: `${currentDept === 'SE' ? '#3f6184' : ''}`, borderRadius: `${currentDept === 'SE' ? '14px' : ''}`, marginTop: '10px', paddingLeft: '21px', width: '100%', paddingTop: '10px', paddingBottom: '10px' }}>
                                Software Engineering
                            </li>
                        </NavLink>
                        <NavLink to="/performance">
                            <li onClick={() => {
                                setCurrentDept('CS');
                                setSelectDpt(!selectDpt)
                                closeSideBar && setSideBarShow(!sidebarshow); setProceed(false);
                                setSelectedSemester(null);
                            }} style={{ backgroundColor: `${currentDept === 'CS' ? '#3f6184' : ''}`, borderRadius: `${currentDept === 'CS' ? '14px' : ''}`, marginTop: '10px', paddingLeft: '21px', width: '100%', paddingTop: '10px', paddingBottom: '10px'}}>
                                Computer Science
                            </li>
                        </NavLink>
                        <NavLink to="/performance">
                            <li onClick={() => {
                                setCurrentDept('CA');
                                setSelectDpt(!selectDpt)
                                closeSideBar && setSideBarShow(!sidebarshow); setProceed(false);
                            }} style={{ backgroundColor: `${currentDept === 'CA' ? '#3f6184' : ''}`, borderRadius: `${currentDept === 'CA' ? '14px' : ''}`, marginTop: '10px', paddingLeft: '21px', width: '100%', paddingTop: '10px', paddingBottom: '10px' }}>
                                Computer Arts
                            </li>
                        </NavLink>
                    </div>
                }
                <NavLink to="/performance">
                    <li onClick={() => { setCurrentDept('Pharmacy'); closeSideBar && setSideBarShow(!sidebarshow); setProceed(false); setSelectDpt(!selectDpt);setSelectedSemester(null); }} style={{ backgroundColor: `${currentDept === 'Pharmacy' ? '#3f6184' : ''}`, borderRadius: `${currentDept === 'Pharmacy' ? '14px' : ''}`, marginTop: '10px', paddingLeft: '20px', width: '90%', paddingTop: '10px', paddingBottom: '10px' }}>
                        <PeopleIcon style={{ fontSize: '30px', marginRight: '10px' }} />
                        Pharmacy
                    </li>
                </NavLink>
                <NavLink to="/performance">
                    <li onClick={() => {
                        setCurrentDept('DBD');
                        setSelectDpt(!selectDpt)
                        closeSideBar && setSideBarShow(!sidebarshow); setProceed(false);
                        setSelectedSemester(null);
                    }} style={{ backgroundColor: `${currentDept === 'DBD' ? '#3f6184' : ''}`, borderRadius: `${currentDept === 'DBD' ? '14px' : ''}`, marginTop: '10px', paddingLeft: '20px', width: '90%', paddingTop: '10px', paddingBottom: '10px' }}>
                        <Woman2Icon style={{ fontSize: '30px', marginRight: '10px' }} />
                        DBD
                    </li>
                </NavLink>
                <NavLink to="/performance">
                    <li onClick={() => {
                        setCurrentDept('Psychology');
                        setSelectDpt(!selectDpt)
                        setSelectedSemester(null);
                        closeSideBar && setSideBarShow(!sidebarshow); setProceed(false);
                    }} style={{ backgroundColor: `${currentDept === 'Psychology' ? '#3f6184' : ''}`, borderRadius: `${currentDept === 'Psychology' ? '14px' : ''}`, marginTop: '10px', paddingLeft: '20px', width: '90%', paddingTop: '10px', paddingBottom: '10px' }}>
                        <PublicIcon style={{ fontSize: '30px', marginRight: '10px' }} />
                        Psychology
                    </li>
                </NavLink>
            </div>
        </>
    )
}

export default PerformanceAnalyticsSideBar;
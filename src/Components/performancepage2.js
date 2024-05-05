import { useSelector } from "react-redux"
import React, { useEffect, useState } from 'react';
import '../Pages/styles.css';
import ApexCharts from 'apexcharts';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import StudentDataItems from "./StudentList";
import MentorList from "./MentorLists";
import { validateMentorEmail } from "../utils/validateEmail";
import axios from "axios";

export const Performancepage2 = ({ selectedSemester, setSelectedSemester, selectedMentor, setSelectedMentor, currentDept }) => {
    //eslint-disable-next-line
    const [email, setemail] = useState(useSelector(state => state)?.email);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [sapId, setId] = useState();
    const [studentLogined, setStudentLogined] = useState(false);
    const [studentList, setStudentList] = useState([]);
    const setterId = useState(useSelector(state => state)?.userId)
    const [data, setData] = useState(null);

    useEffect(() => {
        if (email !== "tarbiyah@gmail.com" && email !== "manager@gmail.com" && !validateMentorEmail(email)) {
            setStudentLogined(true)
            setSelectedStudent(true)
        }
        if(email === "manager@gmail.com"){
            setSelectedSemester(1)
        }
        if(validateMentorEmail(email)){
            setSelectedSemester(1)
            // setSelectedMentor({name: "Mentor Name"})
        }
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_PORT}/performanceAnalytics/${selectedStudent?._id ?? setterId[0]}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((res) => {
            setData([res.data.completedGoals ?? 0, res.data.notCompletedGoals ?? 0, res.data.pendingGoals ?? 0])
        }).catch(err => {
        }
        );
    }, [selectedStudent])

    useEffect(() => {
        if (data && (selectedStudent || studentLogined)) {
            const barChartOptions = {
                series: [
                    {
                        data: data,
                        name: 'Products',
                    },
                ],
                chart: {
                    type: 'bar',
                    background: 'transparent',
                    height: 350,
                    toolbar: {
                        show: false,
                    },
                },
                colors: ['#2962ff', '#2962ff', '#2962ff', '#2962ff', '#2962ff'],
                plotOptions: {
                    bar: {
                        distributed: true,
                        borderRadius: 4,
                        horizontal: false,
                        columnWidth: '40%',
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                fill: {
                    opacity: 1,
                },
                grid: {
                    borderColor: '#000',
                    yaxis: {
                        lines: {
                            show: true,
                        },
                    },
                    xaxis: {
                        lines: {
                            show: true,
                        },
                    },
                },
                legend: {
                    labels: {
                        colors: '#000',
                    },
                    show: true,
                    position: 'top',
                },
                stroke: {
                    colors: ['transparent'],
                    show: true,
                    width: 2,
                },
                tooltip: {
                    shared: true,
                    intersect: false,
                    theme: 'dark',
                },
                xaxis: {
                    categories: ['Completed', 'Not Completed', 'Pending'],
                    title: {
                        style: {
                            color: '#000',
                        },
                    },
                    axisBorder: {
                        show: true,
                        color: '#000',
                    },
                    axisTicks: {
                        show: true,
                        color: '#000',
                    },
                    labels: {
                        style: {
                            colors: '#000',
                        },
                    },
                },
                yaxis: {
                    title: {
                        text: 'Count',
                        style: {
                            color: '#000',
                        },
                    },
                    axisBorder: {
                        color: '#000',
                        show: true,
                    },
                    axisTicks: {
                        color: '#000',
                        show: true,
                    },
                    labels: {
                        style: {
                            colors: '#000',
                        },
                    },
                },
            };
            const barChart = new ApexCharts(document.getElementById('bar-chart'), barChartOptions);
            barChart.render();

            // AREA CHART
            const pieChartOptions = {
                series: data,
                chart: {
                    type: 'pie',
                    background: 'transparent',
                    height: 350,
                },
                labels: ['Completed', 'Not Completed', 'Pending'],
                colors: ['#2962ff', '#ff6b78',  '#4caf50'],
                legend: {
                    labels: {
                        colors: '#15375c',
                    },
                    show: true,
                    position: 'top',
                },
                dataLabels: {
                    enabled: true,
                },
                tooltip: {
                    enabled: true,
                    y: {
                        formatter: function (val) {
                            return val + ' orders';
                        },
                    },
                },
            };
            const areaChart = new ApexCharts(document.getElementById('area-chart'), pieChartOptions);
            areaChart.render();
        }
        //eslint-disable-next-line
    }, [selectedStudent, data]);

    return (
        <>
            {
                selectedStudent ?
                    <div className="grid-container mt-10 mb-10 pl-2 pr-2">
                        <header className="headerssss1 mb-7">
                            <div style={{ position: "relative" }} className="centersss">
                                {
                                    (email === "tarbiyah@gmail.com" || email === "manager@gmail.com" || validateMentorEmail(email)) && <div onClick={() => { setSelectedStudent(null) }} style={{ position: "absolute", top: 0, left: 10, cursor: 'pointer' }}>
                                        <ArrowLeftIcon style={{ color: "#000", fontWeight: "bold", fontSize: "25px" }} />
                                    </div>
                                }
                                <p className='text-center text-3xl font-bold main'>Performance Analytics</p>
                            </div>
                            <div className="menu-icon">
                                <span className="material-icons-outlined">menu</span>
                            </div>
                        </header>
                        <main className="main-container">
                            {
                                (email === "tarbiyah@gmail.com" ||email === "manager@gmail.com") && <div style={{ color: '#000' }} className="flex justify-center flex-col items-center">
                                    <p style={{ fontSize: "18px" }}>SAP ID: <span>{sapId}</span></p>
                                    <p style={{ fontSize: "18px", margin: "10px 10px 0 10px" }}>Student Name: <span>{selectedStudent.name}</span></p>
                                    <p style={{ fontSize: "18px", margin: "0 10px 10px 10px" }}>Mentor Name: <span>{selectedMentor.name}</span></p>
                                </div>
                            }
                            <div className="main-cards">
                                <div class="card">
                                    <div class="card-inner">
                                        <h3>EVENTS</h3>
                                        <span class="material-icons-outlined">inventory_2</span>
                                    </div>
                                    <h1>249</h1>
                                </div>
                                <div class="card">
                                    <div class="card-inner">
                                        <h3>EBOOKS</h3>
                                        <span class="material-icons-outlined">category</span>
                                    </div>
                                    <h1>25</h1>
                                </div>
                                <div class="card">
                                    <div class="card-inner">
                                        <h3>FACULTY</h3>
                                        <span class="material-icons-outlined">groups</span>
                                    </div>
                                    <h1>1500</h1>
                                </div>
                                <div class="card">
                                    <div class="card-inner">
                                        <h3>NOTIFICATIONS</h3>
                                        <span class="material-icons-outlined">notification_important</span>
                                    </div>
                                    <h1>56</h1>
                                </div>
                            </div>

                            <div className="charts" style={{ display: 'flex', flexDirection: 'column', maxWidth: '600px', margin: '60px auto' }}>
                                <div className="charts-card">
                                    <h2 className="chart-title color">Performance</h2>
                                    <div id="bar-chart"></div>
                                </div>
                                <div className="charts-card">
                                    <h2 className="chart-title color">Purchase and Sales Orders</h2>
                                    <div id="area-chart"></div>
                                </div>
                            </div>
                        </main>
                    </div> : <div>
                        {
                            !selectedSemester && <div className='flex flex-col justify-center items-center' style={{ height: '50vh' }}>
                                <h1 style={{ fontWeight: 'bold', fontSize: '23px', textAlign: 'center', lineHeight: '3.5rem' }}>Please Select the Desired Department and Semester.</h1>
                            </div>
                        }
                        {
                            selectedSemester && !selectedMentor && <MentorList currentDept={currentDept}selectedSemester={selectedSemester}  selectedMentor={selectedMentor} setSelectedMentor={setSelectedMentor} studentList={studentList} setStudentList={setStudentList}/>
                        }
                        {
                            selectedSemester && selectedMentor && !selectedStudent && <StudentDataItems setStudentData={setSelectedStudent} mentorName={selectedMentor} semester={selectedSemester} setid={setId} setmentor={setSelectedMentor} studentList={studentList}/>
                        }
                    </div>
            }
        </>
    );
};

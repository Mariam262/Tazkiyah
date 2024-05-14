import { RegisterUser } from "../Components/Registeration/Register";
import { LoginUser } from "../Components/Registeration/Login";
import { Route, Routes } from "react-router-dom";
import { ContactUs } from "../Components/Contact/ContactUs";
import { SetGoal } from "../Components/Goal/setgoal";
import { ViewGoals } from "../Components/Goal/ViewGoals";
import { MainPage } from "../Components/MainPage";
import { AttendenceTable } from "../Components/MuiTable/AttendenceTable";
import { Ebook } from "../Components/ebook";
import { TimeLine } from "../Components/timeline";
import { Performancepage2 } from "../Components/performancepage2";
import { useSelector } from 'react-redux'
import Calendar from "../Components/EventsCalender/Calender";
import AssignMentees from "../Components/AssignMentees";
import MentorTraining from "../Components/MentorTraining/MentorTraining";
import GoalAcheivement from "../Components/Goal/GoalAcheivement";
import ViewGoalDataGrid from "../Components/Goal/ViewGoalGrid";
import StudentTraining from "../Components/StudentTraining/StudentTraining";
import MentorMaterial from "../Components/MentorMaterial";

export const ReactRoutes = ({ finalGoal, setFinalGoal, isLogin, setIsLogin, proceed, setProceed, corner, setcorner, currentDept, setCurrentDept, selectedSemester, setSelectedSemester, forgetPasswordPopup, setForgetPasswordPopup, selectedSemesterTemp, selectedMentor, setSelectedMentor, setEditUploadContentPopup, fetchData, setFetchData, fetchMentorTraining, setFetchMentorTraining, sidebarshow, onmobile }) => {
    //eslint-disable-next-line
    // const [email, setemail] = useState(useSelector(state => state.email));
    return (
        <>
            <Routes>
                <Route path='/contact' element={<ContactUs />} />
                <Route path='/register' element={<RegisterUser setIsLogin={setIsLogin}/>} />
                <Route path='/login' element={<LoginUser isLogin={isLogin} setIsLogin={setIsLogin} forgetPasswordPopup={forgetPasswordPopup} setForgetPasswordPopup={setForgetPasswordPopup}/>} />
                <Route path='/goal' element={<SetGoal finalGoal={finalGoal} setFinalGoal={setFinalGoal} proceed={proceed} setProceed={setProceed} corner={corner} setcorner={setcorner} />} />
                <Route path='/view-goal' element={window.innerWidth<700 ? <ViewGoals finalGoal={finalGoal} setFinalGoal={setFinalGoal} /> : <ViewGoalDataGrid finalGoal={finalGoal} setFinalGoal={setFinalGoal}/>} />
                <Route path='/' element={<MainPage sidebarshow={sidebarshow} onmobile={onmobile}/>} />
                <Route path='/performance' element={<Performancepage2 selectedSemester={selectedSemester} setSelectedSemester={setSelectedSemester} selectedMentor={selectedMentor} setSelectedMentor={setSelectedMentor} currentDept={currentDept}/>}/>
                <Route path='/ebook' element={<Ebook />} />
                <Route path='/assign-mentees' element={<AssignMentees selectedSemester={selectedSemester} selectedMentor={selectedMentor} setSelectedMentor={setSelectedMentor} selectedSemesterTemp={selectedSemesterTemp} currentDept={currentDept}/>} />
                <Route path='/timeline' element={<TimeLine />} />
                <Route path='/calendar' element={<Calendar />} />
                <Route path="/attendence" element={<AttendenceTable currentDept={currentDept} setCurrentDept={setCurrentDept} />} />
                <Route path="/training" element={useSelector(state => state.email).includes('student') ?  <StudentTraining fetchMentorTraining={fetchMentorTraining}  setFetchMentorTraining={setFetchMentorTraining}/> : <MentorTraining fetchMentorTraining={fetchMentorTraining} setFetchMentorTraining={setFetchMentorTraining}/>} />
                <Route path="/achieved-goals" element={<GoalAcheivement />} />
                <Route path="/uploaded/material" element={<MentorMaterial setEditUploadContentPopup={setEditUploadContentPopup} fetchData={fetchData} setFetchData={setFetchData}/>} />
            </Routes>
        </>
    )
}
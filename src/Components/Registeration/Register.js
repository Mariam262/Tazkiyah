import React, { useRef, useState } from 'react'
import './Registeration.css'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/Tazkiyah Logo Bg.png'
import ToastContainer, { FailedToast } from './../toast';
import axios from "axios"

export const RegisterUser = ({ setIsLogin }) => {
  let sapid = useRef(), pass = useRef(), c_pass = useRef();
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [subDepartment, setSubDepartment] = useState("");
  const departmentList = ['FC', 'Pharmacy', 'DBD', 'Psychology', ''];
  const subDepartmentList = ['Software Engineering', 'Computer Science', 'Computer Arts'];

  let navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!sapid.current.value || !email || !pass.current.value || !c_pass.current.value) {
      FailedToast("all fields are required")
      return;
    }
    else if (pass.current.value !== c_pass.current.value) {
      FailedToast("password must match with confirm password")
      return;
    }
    else if (!(/[@/$%#*&{}()]/.test(pass.current.value) && pass.current.value.length >= 6)) {
      FailedToast("Password must be at least 6 characters long and contain at least one of these @/$%#*&{}()");
      return;
    } else if (email.includes('student') || email.includes('mentor')) {
      if (!department) {
        FailedToast("Select your Department")
        return;
      } else if (department === 'FC' && !subDepartment) {
        FailedToast("Select your Sub Department")
        return;
      }
    }

    axios.post(`${process.env.REACT_APP_BACKEND_PORT}/register`, {
      sapid: sapid.current.value,
      email: email,
      password: pass.current.value,
      dept: department,
      subDept: subDepartment
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then((res) => {
      ToastContainer("Successfully Registered")
      navigate('/login')
    }).catch(err => {
      if (err.response.data.message.includes("duplicate")) {
        FailedToast("Email already registered")
      } else {
        FailedToast(err.response.data.message)
      }
    }
    );
  }
  return (
    <>
      <div className='main-login flex pb-5'>
        <div className="left-login l-login dark:bg-slate-800 rounded-tl-3xl rounded-bl-3xl">
          <div className="sign-in mt-10 px-10">
            <p className='signin font-light dark:text-white text-center'>Sign Up</p>
            {/* <i className="fa-brands fa-google fa-beat text-gray-600 google dark:text-white"></i> */}
          </div>
          <form onSubmit={handleRegister} className="below-name mt-5 ml-10">
            <label className='mt-2 font dark:text-white' htmlFor="name">SAP ID</label>
            <input onChange={(e) => { sapid.current.value = e.target.value }} className='bg-gray-200 dark:bg-slate-500 dark:placeholder:text-white' type="text" name="text" id
              ="name" placeholder='SAP ID' ref={sapid} required={true} />
            <label className='font dark:text-white' htmlFor="name">Email</label>
            <input className='bg-gray-200 dark:bg-slate-500  dark:placeholder:text-white' type="email" name="email" id="name" placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} required={true} />
            <label className='font dark:text-white mt-3' htmlFor="pass ">Password</label>
            <input onChange={(e) => { pass.current.value = e.target.value }} className='bg-gray-200 dark:bg-slate-500 dark:placeholder:text-white' type="password" name="pass" id="pass" placeholder='Password' ref={pass} required={true} />
            <label className='font dark:text-white mt-3' htmlFor="pass ">Confirm Password</label>
            <input onChange={(e) => { c_pass.current.value = e.target.value }} className='bg-gray-200 dark:bg-slate-500 dark:placeholder:text-white' type="password" name="pass" id="pass" placeholder='Confirm Password' ref={c_pass} required={true} />
            {
              (email?.includes('student') || email?.includes('mentor') || email?.includes('manager')) && (
                <div className='mt-4'>
                  <label className='font dark:text-white mt-3 mr-3' htmlFor="pass">Department</label>
                  <select onChange={(e) => { setDepartment(e.target.value) }} className="font cursor-pointer bg-gray-100 rounded-2xl px-4 py-2">
                    <option value='' key='' disabled={true} selected={true}>Select Department</option>
                    {
                      departmentList.map((Item) => (
                        <option key={Item}>{Item}</option>
                      ))
                    }
                  </select>
                </div>
              )
            }
            {
              department === 'FC' && <div className='mt-4'>
                <label className='font dark:text-white mt-3 mr-3' htmlFor="pass ">SUB DEPARTMENT</label>
                <select onChange={(e) => { setSubDepartment(e.target.value) }} className="font cursor-pointer bg-gray-100 rounded-2xl px-4 py-2">
                  <option value='' key='' disabled={true} selected={true}>Select Sub Department</option>
                  {
                    subDepartmentList.map((Item) => (
                      <option>{Item}</option>
                    ))
                  }
                </select>
              </div>
            }
            <button type="submit" className='btn-signin'>Sign Up</button>
            <div className="google-signin flex justify-center mt-4 mr-4">
            </div>
            <hr className='hr-resourse' />
          </form>
        </div>
        <div className="right-login-main">
          <div className="right-login r-login">
            <img style={{ margin: "20px 0" }} src={Logo} className='logoimg' alt="" />
            <h1 className='font-extrabold text-gray-700 welcome1'>Welcome to Register</h1>
            <p className='text-gray-700 font-lg my-4  font-semibold'>Already have an account</p>
            <button onClick={() => { navigate('/login') }} className='signbtn'>Login</button>
          </div>
                </div>
      </div>
    </>
  )
}
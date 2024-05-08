import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import VerificationBox from './VerificationBox';
import ToastContainer from './toast';
import { FailedToast } from './toast';
import axios from 'axios';

export const ForgetPassword = ({ forgetPasswordPopup, setForgetPasswordPopup }) => {
    const [otpModel, setOtpModel] = useState(false)
    const [verify, setverify] = useState(false)
    const [otp, setOtp] = useState(new Array(8).fill(''));
    let [userEmail, setUserEmail] = useState('');

    const [tempPass, setTempPass] = useState('')
    const [tempPassFinal, setTempPassFinal] = useState('')
    const handleConfirmPasswordChange = async () => {
        if(tempPassFinal !== tempPass){
            FailedToast("Password does not match")
            return;
        }
        axios.patch(`${process.env.REACT_APP_BACKEND_PORT}/register/password?email=${userEmail}&password=${tempPass}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            }
        }).then((res) => {
            ToastContainer("Password Changed Successfully")
            setOtp(new Array(8).fill(''))
            setOtpModel(false);
            setverify(!verify);
        }).catch(err => {
            console.log(err)
        })
    }
    const sendVerificationEmail = () => {
        if (!userEmail) {
            FailedToast("Please Enter Email")
            return;
        }
        axios.get(`${process.env.REACT_APP_BACKEND_PORT}/register/forget-password?email=${userEmail}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            }
        }).then((res) => {
            ToastContainer("Please check your Email")
            setOtpModel(true);
            setForgetPasswordPopup(!forgetPasswordPopup);
        }).catch(err => {
        })
    }
    return (
        <>
            <React.Fragment>
                <Dialog
                    open={forgetPasswordPopup}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Email Verify</h1>
                        <hr style={{ margin: '10px 0 0 0' }} />
                    </DialogTitle>
                    <div style={{ padding: "0 20px" }}>
                        <p style={{ fontSize: '14px', textAlign: 'justify', marginBottom: '20px' }}>Enter your Email to Verify that the account belongs to you</p>
                        <h1 style={{ paddingBottom: '4px', fontSize: '14px' }} className='font-semibold'>Enter Your Email: </h1>
                        <input onChange={(e) => { setUserEmail(e.target.value) }} type="email" style={{ width: '100%', padding: "5px 5px", margin: "10px 0" }} placeholder='Email' value={userEmail} />
                        <DialogActions>
                            <Button style={{ fontSize: '12px', border: '1px solid #ccc', backgroundColor: "#15375c", color: "#fff" }} onClick={() => { setForgetPasswordPopup(!forgetPasswordPopup) }}>Cancel</Button>
                            <Button style={{ fontSize: '12px', border: '1px solid #ccc', backgroundColor: "#15375c", color: "#fff" }} onClick={() => { sendVerificationEmail() }} autoFocus>
                                Verify
                            </Button>
                        </DialogActions>
                    </div>
                </Dialog>
            </React.Fragment >
            {
                !verify && <VerificationBox otpModel={otpModel} setOtpModel={setOtpModel} verify={verify} setverify={setverify} otp={otp} setOtp={setOtp} VerificationLength={8} heading="Verify Activation Code" para="This Verification is a part of procedure to Change your account password." email={userEmail} />
            }
            {
                <React.Fragment>
                    <Dialog
                        open={verify}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Password Change</h1>
                            <hr style={{ margin: '10px 0 0 0' }} />
                        </DialogTitle>
                        <div style={{ padding: "0 20px" }}>
                            <p style={{ fontSize: '14px', textAlign: 'justify', marginBottom: '20px' }}>Write your new Password and confirm the password</p>
                            <h1 style={{ paddingBottom: '4px', fontSize: '14px' }} className='font-semibold'>New Password: </h1>
                            <input onChange={(e) => { setTempPass(e.target.value) }} type="email" style={{ width: '100%', padding: "5px 5px" }} placeholder='New Password' value={tempPass} />
                            <h1 style={{ paddingBottom: '4px', fontSize: '14px', marginTop: "20px" }} className='font-semibold'>Confirm Password: </h1>
                            <input onChange={(e) => { setTempPassFinal(e.target.value) }} type="email" style={{ width: '100%', padding: "5px 5px" }} placeholder='confirm New Password' value={tempPassFinal} />
                            <DialogActions>
                                <Button style={{ fontSize: '12px', border: '1px solid #ccc', backgroundColor: "#15375c", color: "#fff" }} onClick={() => { setverify(!verify) }}>Cancel</Button>
                                <Button style={{ fontSize: '12px', border: '1px solid #ccc', backgroundColor: "#15375c", color: "#fff" }} onClick={() => { handleConfirmPasswordChange() }} autoFocus>
                                    Change Password
                                </Button>
                            </DialogActions>
                        </div>
                    </Dialog>
                </React.Fragment >
            }
        </>
    )
}
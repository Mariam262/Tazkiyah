import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import ToastContainer, { FailedToast } from '../toast';
import axios from 'axios';
import { useSelector } from 'react-redux';


export const EditProfile = ({ editProfilePopup, setEditProfilePopup }) => {
    const [changePassword, setChangePassword] = React.useState(true);
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [profileDescription, setProfileDescription] = React.useState('');
    const [profilePicture, setProfilePicture] = React.useState('');
    const [finalNewPassword, setFinalNewPassword] = React.useState('');
    const userEmail = useSelector(state => state.email);
    const userId = useSelector(state => state.userId);

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_PORT}/register/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            }
        }).then((res) => {
            setName(res.data.data.name);
            setProfileDescription(res.data.data.profileDescription);
            setProfilePicture(res.data.data.profilePicture);
        }).catch(err => {
            console.log(err);
        })
    }, [])
    const ChangeProfileData = () => {
        axios.put(`${process.env.REACT_APP_BACKEND_PORT}/register/${userId}`, {
            name: name,
            profileDescription: profileDescription,
            profilePicture: profilePicture
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            }
        }).then((res) => {
            setEditProfilePopup(!editProfilePopup);
        }).catch(err => {
            console.log(err);
        })
    }
    const changePass = () => {
        axios.put(`${process.env.REACT_APP_BACKEND_PORT}/register/forget-password?email=${userEmail}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            }
        }).then((res) => {
            ToastContainer("Password Changed SuccessFully")
            setChangePassword(!changePassword);
        }).catch(err => {
            console.log(err);
            setChangePassword(!changePassword);
            FailedToast(err.response.data.error)
            setCurrentPassword('');
            setNewPassword('');
            setFinalNewPassword('');
        })
    }

    const ImageUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const img = new Image();

                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    const maxWidth = 300; // Set your desired maximum width
                    const maxHeight = 150; // Set your desired maximum height

                    let width = img.width;
                    let height = img.height;

                    // Resize the image if necessary
                    if (width > maxWidth || height > maxHeight) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }

                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    const compressedBase64 = canvas.toDataURL("image/jpeg", 0.4);
                    setProfilePicture(compressedBase64);
                };

                img.src = reader.result;
            };

            reader.readAsDataURL(file);
        }
    };


    return (
        <>
            <React.Fragment>
                <Dialog
                    open={editProfilePopup}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Edit Profile</h1>
                        <hr style={{ margin: '10px 0 0 0' }} />
                    </DialogTitle>
                    {
                        changePassword ? (<>
                            <div style={{ margin: '0px 20px' }} >
                                <p style={{ fontSize: '14px', textAlign: 'justify', marginBottom: '20px' }}>You may Verify your account detail and can change your name, Reset Password and change your profile picture.</p>
                                <label style={{ fontSize: '14px', marginTop: '14px' }} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Change Profile Picture</label>
                                <input onChange={ImageUpload} style={{ fontSize: '15px', marginBottom: '20px', padding: '10px' }} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" accept='image/*' />
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between', alignItems: "center", margin: "10px 0 20px 0" }}>
                                    <div>
                                        <h1 style={{ paddingBottom: '4px', fontSize: '14px', flex: 1, }} className='text-sm font-semibold text-gray-600'>Your Name: </h1>
                                        <input onChange={(e) => { setName(e.target.value) }} value={name} type="text" style={{ width: '240px' }} placeholder='Name' />
                                    </div>
                                    <div>
                                        <button onClick={() => { setChangePassword(!changePassword) }} style={{ backgroundColor: "#15375c", padding: "5px 15px", color: "#fff", borderRadius: "7px" }}>Password</button>
                                    </div>
                                </div>
                                <div>
                                    About Me
                                    <textarea onChange={(e) => { setProfileDescription(e.target.value) }} style={{ width: '100%', height: '100px', padding: "3px 10px", margin: "10px 0" }} placeholder='About Me' value={profileDescription} cols="30" rows="10"></textarea>
                                </div>
                            </div>
                            <DialogActions>
                                <Button style={{ fontSize: '12px', border: '1px solid #ccc', backgroundColor: "#15375c", color: "#fff" }} onClick={() => { setEditProfilePopup(!editProfilePopup) }}>Close</Button>
                                <Button style={{ fontSize: '12px', border: '1px solid #ccc', backgroundColor: "#15375c", color: "#fff" }} onClick={ChangeProfileData} autoFocus>
                                    Save
                                </Button>
                            </DialogActions>
                        </>) : (<div style={{ padding: "0 20px" }}>
                            <p style={{ fontSize: '14px', textAlign: 'justify', marginBottom: '20px' }}>You cam change your password. Your password should consist of Upper Case and Lower Case Letters(A-Z, a-z) and numbers(1-9)</p>
                            <h1 style={{ paddingBottom: '4px', fontSize: '14px' }} className='font-semibold'>Current Password: </h1>
                            <input onChange={(e) => { setCurrentPassword(e.target.value) }} type="password" style={{ width: '240px' }} placeholder='***********' value={currentPassword} />
                            <h1 style={{ paddingBottom: '4px', fontSize: '14px', marginTop: "10px" }} className='font-semibold'>New Password: </h1>
                            <input onChange={(e) => { setNewPassword(e.target.value) }} type="password" style={{ width: '240px' }} placeholder='***********' value={newPassword} />
                            <h1 style={{ paddingBottom: '4px', fontSize: '14px', marginTop: "10px" }} className='font-semibold'>Confirm New Password: </h1>
                            <input onChange={(e) => { setFinalNewPassword(e.target.value) }} type="password" style={{ width: '240px' }} placeholder='***********' value={finalNewPassword} />
                            <DialogActions>
                                <Button style={{ fontSize: '12px', border: '1px solid #ccc', backgroundColor: "#15375c", color: "#fff" }} onClick={() => { setChangePassword(!changePassword) }}>Close</Button>
                                <Button style={{ fontSize: '12px', border: '1px solid #ccc', backgroundColor: "#15375c", color: "#fff" }} onClick={() => { changePass(); }} autoFocus>
                                    Save
                                </Button>
                            </DialogActions>
                        </div>)
                    }
                </Dialog>
            </React.Fragment >

        </>
    )
}
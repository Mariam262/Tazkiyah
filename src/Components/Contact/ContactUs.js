import React, { useState } from 'react';
import './Contact.css';
import { Link } from 'react-router-dom';
import shape from '../../assets/shape.png';
import emailIcon from '../../assets/email.png';
import locationIcon from '../../assets/location.png';
import phoneIcon from '../../assets/phone.png';
import logo from '../../assets/Tazkiyah Logo Bg.png';
import axios from 'axios';
import ToastContainer from '../toast';

export const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            axios.post(`${process.env.REACT_APP_BACKEND_PORT}/contact`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                });
                ToastContainer("Contact Form Submitted")
            })
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form. Please try again later.');
        }
    };

    return (
        <div className="containerssss">
            <span className="big-circle"></span>
            <img src={shape} className="square" alt="" />
            <div className="form">
                <div className="contact-info">
                    <h3 className="title">Let's get in touch</h3>
                    <img src={logo} className='logos' alt="" />

                    <div className="info">
                        <div className="information">
                            <img src={locationIcon} className="icon" alt="" />
                            <p>92 Cherry Drive Uniondale, NY 11553</p>
                        </div>
                        <div className="information">
                            <img src={emailIcon} className="icon" alt="" />
                            <p>lorem@ipsum.com</p>
                        </div>
                        <div className="information">
                            <img src={phoneIcon} className="icon" alt="" />
                            <p>123-456-789</p>
                        </div>
                    </div>

                    <div className="social-media">
                        <p>Connect with us :</p>
                        <div className="social-icons">
                            <Link to="https://www.facebook.com/RiphahUniversity">
                                <i className="fab fa-facebook-f"></i>
                            </Link>
                            <Link to="https://www.linkedin.com/school/riphah-international-university/">
                                <i className="fab fa-linkedin-in"></i>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="contact-form">
                    <span className="circle one"></span>
                    <span className="circle two"></span>

                    <form className='form1' onSubmit={handleSubmit}>
                        <h3 className="title mb-4">Contact us</h3>
                            <input
                                style={{ color: "#fff", padding: "10px 20px" }}
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={(event) => {
                                    setFormData({ ...formData, name: event.target.value.replace(/[^a-zA-Z]/g, '') });
                                }}
                                className="border-none bg-transparent w-full h-[35px] outline-none"
                                placeholder="sapid"
                                required
                            />
                            <input
                                style={{ fontSize: "14px", color: "#fff", padding: "10px 20px" }}
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border-none mt-4 bg-transparent w-full h-[35px] outline-none"
                                placeholder="Email"
                                required
                            />
                            <input
                                style={{ fontSize: "14px", color: "#fff", padding: "10px 20px" }}
                                type="number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="border-none mt-4 bg-transparent w-full h-[35px] outline-none"
                                placeholder="Contact Number"
                                required
                            />
                            <textarea
                                style={{ fontSize: "14px", color: "#fff", padding: "10px 20px" }}
                                name="message"
                                rows={10}
                                value={formData.message}
                                onChange={handleChange}
                                className="mt-4 bg-transparent w-full outline-none"
                                placeholder="Message"
                                required
                            ></textarea>
                        <div className='flex justify-center items-start mt-3'>
                            <input
                                style={{ fontSize: "16px", padding: "10px 40px", backgroundColor: "rgb(27, 71, 119)", color: "#fff" }}
                                type="submit"
                                value="Send"
                                className="btn"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
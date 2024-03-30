import Navbar from "../../Components/Sidebar/Navbar";
import React from 'react';
import './About.css'; // Assuming this CSS file is in the same directory as your component
import webdesigning from './images/webdesigning.png.png'; // Importing the image for Web Designing
import imglang from './images/imglang.png'; // Importing the image for C Programming
import { Card } from "antd";

const About = () => {
    return (
        <Navbar>
            <div className="container p-15">
                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                        <div className="card">
                            <h2 className="card-title">About Us</h2>
                            <p className="card-content">Welcome to <b>SIIT</b>, your educational platform for computer courses. We are dedicated to providing high-quality education and empowering individuals with the skills they need to succeed in the digital world.</p>
                        </div>
                        <div className="card-container">

                            <Card className="card">
                                <h3 className="card-title">Our Courses</h3>

                                <img src={webdesigning} alt="Web Designing" className="programmingimage" />
                                <div className="card-content1">
                                    <div className="course-group">
                                        <ul>
                                            <li>
                                                Web Designing
                                            </li>
                                            <li>CCC Course</li>
                                            <li>Tally ERP</li>
                                            <li>C Programming</li>
                                            <li>HTML</li>
                                            <li>CSS Styling</li>
                                        </ul>
                                    </div>
                                    <div className="course-group">
                                        <ul>
                                            <li>PHP Development</li>
                                            <li>Python</li>
                                            <li>Javascript Development</li>
                                            <li>C++ Programming</li>
                                            <li>Java Programming</li>
                                        </ul>
                                    </div>


                                </div>
                            </Card>

                            <Card className="card">
                                <h3 className="card-title">Speciality In</h3>
                                <img src={imglang} alt="C Programming" className="imglang" />
                            </Card>
                        </div>
                        <div className="card">
                            <h3 className="card-title">Our Mission</h3>
                            <p className="card-content">Our mission is to make quality education accessible to everyone. We strive to create a supportive and engaging learning environment that fosters creativity, critical thinking, and practical skills.</p>
                        </div>
                        <div className="card">
                            <h3 className="card-title">Our Team</h3>
                            <p className="card-content"> <b>SIIT</b> is led by <b>Suryadeep Yadav, Ankit Yadav & Shivam Kashyap</b>, an experienced instructor with over 5 years of teaching experience in various computer courses. With a passion for education and a strong background in the field, <b>Suryadeep</b> is dedicated to providing high-quality learning experiences to students.</p>
                        </div>
                        <div className="card contact-info">
                            <h3 className="card-title">Contact Us</h3>
                            <p className="card-content">If you have any questions or inquiries, please feel free to reach out to us. We are here to assist you in your learning journey.</p>
                            <p><b>Email:</b> <a href="mailto:suryayadav1012002@gmail.com">suryayadav1012002@gmail.com</a></p>
                            <p><b>Phone:</b> 7084516342</p>
                            <p><b>Email:</b> <a href="mailto:shivam.r.vatham@gmail.com">shivam.r.vatham@gmail.com</a></p>
                            <p><b>Phone:</b> 9408954477</p>
                            <p><b>Email:</b> <a href="mailto:ankityadav1022@gmail.com">ankityadav1022@gmail.com</a></p>
                            <p><b>Phone:</b> 7844915732</p>
                        </div>

                    </div>
                </div>
            </div>
        </Navbar>
    );
}

export default About;

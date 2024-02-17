import Navbar from "../../Components/Sidebar/Navbar";
// import Header from "../../Components/Header/Header";
const About = () => {
    return (
        <Navbar>
                    {/* <Header Title={"About us"} Address={"About"} /> */}
        <div className="container  p-15">
            <div className="row" style={{paddingLeft:'5px'}}>
                <div className="col-lg-10 offset-lg-2 rounded-lg">
                    <div className="p-3 mb-4" style={{ backgroundColor: '#fcfffe', borderRadius: '10px' }}>
                        <h2 className="text-center text-#062659" style={{ color: '#062659' }}> <b>About Us</b></h2>
                        <p className="text-center text-#062659">Welcome to <b> SIIT</b>, your educational platform for computer courses. We are dedicated to providing high-quality education and empowering individuals with the skills they need to succeed in the digital world.</p>
                    </div>
                    <div className="p-3 mb-4 rounded-lg" style={{ backgroundColor: '#fcfffe', borderRadius: '10px' }}>
                        <h3 className="text-center" style={{ color: '#062659' }}> <b>Our Courses</b></h3>
                        <p>At <b>SIIT</b>, we offer a wide range of courses to cater to different learning needs. Whether you are a beginner or an experienced professional looking to enhance your skills, we have courses designed for you.</p>
                        <ul className="bg-#062659 p-2" type="1">
                            <li><b> Web Designing</b></li>
                            <li> <b>C Programming</b></li>
                            <li> <b>C++ Programming </b></li>
                            <li> <b>Java Programming</b></li>
                            <li> <b>Python</b></li>
                            <li> <b> PHP Development</b></li>
                            <li> <b>Html</b></li>
                            <li> <b>CSS Styling</b></li>
                            <li> <b>JavaScript Development</b></li>
                            <li> <b>CCC Course</b></li>
                            <li> <b>Tally ERP</b></li>
                            {/* Add more courses as needed */}
                        </ul>
                    </div>
                    <div className="p-3 mb-4 rounded-lg" style={{ backgroundColor: '#fcfffe', borderRadius: '10px' }}>
                        <h3 style={{ color: '#062659' }}> <b>Our Mission</b></h3>
                        <p>Our mission is to make quality education accessible to everyone. We strive to create a supportive and engaging learning environment that fosters creativity, critical thinking, and practical skills.</p>
                    </div>
                    <div className="p-3 mb-4 rounded-lg" style={{ backgroundColor: '#fcfffe', borderRadius: '10px' }}>
                        <h3 style={{ color: '#062659' }}> <b>Our Team</b></h3>
                        <p> <b>SIIT</b> is led by <b> Suryadeep Yadav,Ankit Yadav & shivam kashyap</b>, an experienced instructor with over 5 years of teaching experience in various computer courses. With a passion for education and a strong background in the field, <b>Suryadeep</b> is dedicated to providing high-quality learning experiences to students.</p>
                    </div>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: '#fcfffe', borderRadius: '10px' }}>
                        <h3 style={{ color: '#062659' }}> <b>Contact Us</b></h3>
                        <p>If you have any questions or inquiries, please feel free to reach out to us. We are here to assist you in your learning journey.</p>
                        <p> <b>Email: suryayadav1012002@gmail.com</b></p>
                        <p> <b>Phone: 7084516342</b></p>
                        <p> <b>Email: shivam.r.vatham@gmail.com</b></p>
                        <p> <b>Phone: 9408954477</b></p>
                        <p> <b>Email: ankityadav1022@gmail.com</b></p>
                        <p> <b>Phone: 7844915732</b></p>
                    </div>
                </div>
            </div>
        </div>
        </Navbar>
    );
}

export default About;

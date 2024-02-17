// import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import AdminRegistration from "../Pages/Login/AdminRegistration";
import Admin from "../Pages/Admin/Admin";
import Youtube from "../Pages/Youtube/Youtube";
import About from "../Pages/Youtube/About";
import Tutor from "../Pages/Tutor/Tutor";
import Student from "../Pages/Student/Student";
import Quizzes from "../Pages/Quizzes/Quizzes";
import Content from "../Pages/Contents/Content";
import SingleContent from "../Pages/SingleContent/SingleContent";
import Doubts from "../Pages/Doubts/Doubts";
import SingleDoubt from "../Pages/SingleDoubt/SingleDoubt";
import LeaderBoard from "../Pages/LeaderBoard/LeaderBoard";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/AdminRegistration" element={<AdminRegistration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/tutor" element={<Tutor />} />
        <Route path="/student" element={<Student />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/content/:id" element={<SingleContent />} />
        <Route path="/contents" element={<Content />} />
        <Route path="/doubts" element={<Doubts />} />
        <Route path="/youtube" element={<Youtube />} />
        <Route path="/about" element={<About />} />
        <Route path="/doubt/:id" element={<SingleDoubt />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default Router;

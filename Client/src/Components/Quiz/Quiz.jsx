// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuiz } from "../../Redux/quiz/action";
import {useNavigate } from "react-router-dom";
import "./Quiz.css";

const Quiz = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    user: { userType },
  } = useSelector((store) => store.auth.data);

  const deleteQuizFunc = (id) => {
    dispatch(deleteQuiz(id));
  };
  const handleStartQuiz = (id) => {
    console.log(id)
    return navigate(`/startquizzes/${id}`);
  };
  return (
    <div className="quizDiv">
      <div>
        <img src="https://akm-img-a-in.tosshub.com/aajtak/2023-02/quiz_01.png" alt="thumbnail" />
      </div>
      <div>
        <div>
          <p>{data.title}</p>
          <p>{data.subject}</p>
          <p>Class {data.class}</p>
          <p className="quizTime">{data.totalTime} mins</p>
        </div>
        <div>
          <p className="quizPoint">Questions : {data.noOfQuestions}</p>
          <p className="quizPoint">Points : {data.totalPoint}</p>
          {userType == "Admin" || userType == "Tutor" ? (
            <button
              className="deleteQuiz"
              onClick={() => deleteQuizFunc(data._id)}
            >
              Delete Quiz
            </button>
          ) : (
            <button className="startQuiz" onClick={()=>handleStartQuiz(data._id)}>Start Quiz</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;

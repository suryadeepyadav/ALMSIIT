import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleQuizzesData } from "../../Redux/quiz/action";
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";
import "./StartQuizzes.css";
import { Card,  Col, Row } from 'antd';

const StartQuizzes = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  // Redux states
  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);

  const { singleQuiz } = useSelector((store) => store.quiz);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentIndex, setCurrentQuestionIndex] = useState(0);

  
  useEffect(() => {
    dispatch(getSingleQuizzesData(params.id));
  }, [dispatch, params.id]);

  // Calculate total points
  const calculateTotalPoints = () => {
    return singleQuiz ? singleQuiz.totalPoint : 0;
  };

  // Handle selecting answer for a question
  const handleSelectAnswer = (questionIndex, selectedOption) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedOption,
    }));
  };

  let prevq = currentIndex > 0;
  let hasnextq = currentIndex < singleQuiz.questionData.length - 1;

  // next question
  const handleNextQuestion = () => {
    if (hasnextq) {
      setCurrentQuestionIndex(currentIndex + 1);
    }
  };

  //  previous question
  const handlePreviousQuestion = () => {
    if (prevq > 0) {
      setCurrentQuestionIndex(currentIndex - 1);
    }
  };

  // Handle quiz submission
  const handleSubmitQuiz = () => {
    console.log("Selected answers:", selectedAnswers);
    // Here you can dispatch an action to submit the quiz answers to the backend
    // Example: dispatch(submitQuizAnswers(singleQuiz._id, selectedAnswers));
    // After submission, you can redirect the user to a result page or display a success message
  };

  useEffect(() => {
    // If user is not authenticated, redirect to home
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const renderQuizDetails = () => {
    if (!singleQuiz) {
      return <div>Loading...</div>;
    }

    const currentQuestion = singleQuiz.questionData[currentIndex];

    return (
      <div>
           
        <Row gutter={16} >
      <Col span={24}>
      <Card style={{ margin: "8px", textAlign: "center" ,fontSize:"50px"}}size="small" title={singleQuiz.title}>
          <Row gutter={16} style={{justifyContent:"center"}}>
            <Col span={8}>
              <p>Class: {singleQuiz.class}</p>
              <p>Subject: {singleQuiz.subject}</p>
              <p>Total Questions: {singleQuiz.noOfQuestions}</p>
            </Col>
            <Col span={8}>
              <p>Total Points: {calculateTotalPoints()}</p>
              <p>Total Time: {singleQuiz.totalTime} minutes</p>
              <p>Creator: {singleQuiz.creator}</p>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>


        {/* <h2>Question {currentIndex + 1}:</h2> */}
        <div className="question">
          <p >Question{currentIndex + 1}:
            {currentQuestion.question}
          </p>
          <p>(choose any one Answer)</p>
          <div>
            {Object.entries(currentQuestion).map(([key, value]) => {
              if (key.startsWith("option")) {
                return (
                  <label key={key}>
                    <input
                      type="radio"
                      name={`question_${currentIndex}`}
                      value={value}
                      checked={selectedAnswers[`question_${currentIndex}`] === value}
                      onChange={() => handleSelectAnswer(`question_${currentIndex}`, value)}
                    />
                    {value}
                  </label>
                );
              }
              return null;
            })}
          </div>
        </div>
        <div className="next-prev">
          <button className="next" onClick={handlePreviousQuestion} disabled={!prevq}>Previous</button>
          <button className="next" onClick={handleNextQuestion} disabled={!hasnextq}>Next</button>
          <button className="submitquizz" onClick={handleSubmitQuiz}>Submit </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navbar>
        <Header Title={"Start Quizzes"} Address={"Quizzes"} />
        <h1
          style={{
            marginLeft: 10,
            textAlign: "center",
            color: "blue",
            marginBottom: "4px",
          }}
        >
          Quizzes are started now
        </h1>
        {renderQuizDetails()}
      </Navbar>
    </div>
  );
};

export default StartQuizzes;

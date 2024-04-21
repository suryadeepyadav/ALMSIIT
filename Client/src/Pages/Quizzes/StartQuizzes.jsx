import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleQuizzesData } from "../../Redux/quiz/action";
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";

const StartQuizes = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  // Redux states
  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);

  const { singleQuiz } = useSelector((store) => store.quiz); // Corrected property name

  const [selectedAnswers, setSelectedAnswers] = useState({});

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

  // Handle quiz submission
  const handleSubmitQuiz = () => {
    // Send selected answers to the backend for evaluation
    // You can dispatch an action to send the selectedAnswers to the backend
    // Example: dispatch(submitQuizAnswers(singleQuiz._id, selectedAnswers));
    // After submission, you can redirect the user to a result page or display a success message
    console.log("Selected answers:", selectedAnswers);
  };

  // Render quiz details
  const renderQuizDetails = () => {
    if (!singleQuiz) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>{singleQuiz.title}</h1>
        <p>Class: {singleQuiz.class}</p>
        <p>Subject: {singleQuiz.subject}</p>
        <p>Total Questions: {singleQuiz.noOfQuestions}</p>
        <p>Total Points: {calculateTotalPoints()}</p>
        <p>Total Time: {singleQuiz.totalTime} minutes</p>
        <p>Creator: {singleQuiz.creator}</p>
        <h2>Questions:</h2>
        {singleQuiz.questionData.map((question, index) => (
          <div key={index}>
            <p>{question.question}</p>
            <div>
              {Object.entries(question).map(([key, value]) => {
                if (key.startsWith("option")) {
                  return (
                    <label key={key}>
                      <input
                        type="radio"
                        name={`question_${index}`}
                        value={value}
                        checked={
                          selectedAnswers[`question_${index}`] === value
                        }
                        onChange={() =>
                          handleSelectAnswer(`question_${index}`, value)
                        }
                      />
                      {value}
                    </label>
                  );
                }
                return null;
              })}
            </div>
          </div>
        ))}
        <button onClick={handleSubmitQuiz}>Submit Quiz</button>
      </div>
    );
  };

  useEffect(() => {
    // If user is not authenticated, redirect to home
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

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

export default StartQuizes;

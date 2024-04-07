import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleQuizzesData } from "../../Redux/quiz/action";
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";

const StartQuizes = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  //redux states
  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(getSingleQuizzesData(params.id));
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);
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
          {" "}
          Quizzes are started now
        </h1>
      </Navbar>
    </div>
  );
};

export default StartQuizes;

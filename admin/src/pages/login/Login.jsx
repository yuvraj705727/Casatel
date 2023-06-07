import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import "./login.scss";
import { AuthContext } from "../../context/authContext";
import Google from "../../img/google.png";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const googleAuth = async () => {

    fetch("http://localhost:8000/api/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
    .then((response) => {
      if (response.status === 200) return response.json();
      throw new Error("authentication has been failed!");
    })
    .then(async (resObject) => {
      const user= resObject.user;

      const username = user.displayName;
      const password= user.id;
      
      dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("http://localhost:8000/api/auth/login", {username, password}, {withCredentials: true});
              if (res.data.isAdmin) {
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
                window.open("/", "_self");
              } else {
                dispatch({type: "LOGIN_FAILURE", payload: { message: "You are not allowed!" }});
              }
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const google = async () => {
    window.open("http://localhost:8000/api/auth/google", "_self");
    googleAuth();
  };

  return (
    <div className="login">
      <h1 className="loginTitle">Admin Login</h1>
      <div className="wrapper">
        
        <div className="center">
        </div>
        <div className="right">
        <input type="text" placeholder="username" id="username" onChange={handleChange} />
        <input type="password" placeholder="password" id="password" onChange={handleChange} />
        <button disabled={loading} onClick={handleClick} className="submit">Login</button>
        {error && <span>{error.message}</span>}
        </div>
      </div>
    </div>
  );
};

export default Login;
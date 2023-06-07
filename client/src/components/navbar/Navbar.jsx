import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from 'antd';

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const handleRegister = () => {
    navigate("/registration", { state: {} });
  };

  const handleLogin = () => {
    navigate("/login", { state: {} });
  };

  useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      } else {
        setUser(null);
      }
  }, []);

  const oauthLogout = async () => {
    window.open("http://localhost:8000/api/auth/oauthLogout", "_self");
    localStorage.removeItem("user");
    setUser(null);
  };

  const jwtLogout = async () => {
    await axios.get("http://localhost:8000/api/auth/logout", {withCredentials: true});
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  }

  return (
    <div className="navbar">
      <div className="navContainer">
      <Link to="/" className="logo">
        <span className="logo">Casatel</span>
      </Link>
        <div className="navItems">
          {user ? (
            <>
            {user.displayName ? (
              <>
                <span className="navUsername">{user.displayName}</span>
                <Button className="navButton" onClick={oauthLogout}>
                  Logout
                </Button>
              </>
            ):(
              <>
                <span className="navUsername">{user.username}</span>
                <Button className="navButton" onClick={jwtLogout}>
                  Logout
                </Button>
              </>
            )}
            </>
          ) : (
            <>
              <Button className="navButton" onClick={handleRegister}>
                Register
              </Button>
              <Button className="navButton" onClick={handleLogin}>
                Login
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
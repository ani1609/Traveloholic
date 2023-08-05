import { Link } from 'react-router-dom';
import React, { useRef, useEffect, useState } from "react";
import "../styles/Navbar.css";
import "../index.css";
import Logo from "../images/logof.png";
import axios from "axios";

function Navbar()
{
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  const userToken = JSON.parse(localStorage.getItem('token'));
  const [user, setUser] = useState({name:"",email:"",profilePic:""});

  const fetchDataFromProtectedAPI = async (userToken) => 
  {
      try 
      {
        const config = {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
        };
        const response = await axios.get("http://localhost:3000/api/user", config);
        setUser(response.data.user);
      }
      catch (error)
      {
        console.error("Error fetching data:", error);
      }
  };

  useEffect(() =>
  {
    if (userToken)
    {
      fetchDataFromProtectedAPI(userToken);
    }
    // console.log(userToken);
  }, []);

  useEffect(() => 
  {
    const handleScroll = () =>
    {
      if (window.scrollY > 50) 
      {
        setNavbarScrolled(true);
      } 
      else 
      {
        setNavbarScrolled(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleLoginMouseEnter = () =>
  {
    setSignup(false);
    setLogin(true);
  };

  const handleLoginMouseLeave = () =>
  {
    setLogin(false);
    setSignup(true);
  };


  const handleLogout = () => 
  {
    localStorage.clear();
    setShowProfile(false);
  };

  return (
    <div className={navbarScrolled?"navbar_parent opaque":"navbar_parent transparent"}>
        <a href="" className="logo_container">
          <img src={Logo} alt="logo" className="logo"/>
          <p className={navbarScrolled ? "color":"color"}>Trekwise</p>
        </a>
        <ul>
          <li className={navbarScrolled ? "color":"white"}>Home</li>
          <li className={navbarScrolled ? "color":"white"}>Places</li>
          <li className={navbarScrolled ? "color":"white"}>Hotels</li>
          <li className={navbarScrolled ? "color":"white"}>About Us</li>
          <li className={navbarScrolled ? "color":"white"}>Contact</li>
          {!userToken && <li className="login_signup_container">
            <Link to="/login">
              <button
                onMouseEnter={handleLoginMouseEnter}
                onMouseLeave={handleLoginMouseLeave}
                className={login ? navbarScrolled ? "login_button login_entered white" : "login_button login_entered white" : navbarScrolled ? "login_button login_left color" : "login_button login_left white"}
              >
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button
                className={signup ? "signup_button signup_entered" : "signup_button signup_left"}
                >Sign Up
              </button>
            </Link>
          </li>}
          {userToken &&  <li className="profile" onClick={() => setShowProfile(!showProfile)}>
                {user.profilePic === undefined ? (
                  <h4>{user.name.charAt(0)}</h4>
                )
                : 
                <img src={user.profilePic} alt="profile" className="profile_pic"/>}
                <i class="fa-solid fa-angle-down"></i>
                {showProfile && <div className="profile_dropdown">
                  <Link to={"/profile"} style={{ textDecoration: 'none' }}><p>Profile</p></Link>
                  <p onClick={handleLogout}>Log Out</p>
                </div>}
            </li>}
        </ul>
    </div>
  );
};



export default Navbar;
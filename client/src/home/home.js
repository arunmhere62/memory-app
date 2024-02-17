import React, { useMemo, useState } from "react";
import AllPosts from "../components/Posts/AllPosts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost, getPosts } from "../store/postSlice";
import Form from "../components/Form/Form";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../constants/auth";
import Cookies from "js-cookie";
import "../style.css"

const Home = () => {
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  

  const isUserAuthenticated = isAuthenticated();

  useEffect(() => {
    dispatch(getPosts());
    if (currentId !== 0) {
      dispatch(getPost(currentId));
    }
  }, [dispatch]);

  const handleLogin = () => {
    navigate("/auth");
  };
 


  const handleLogout = () => {
    Cookies.remove("userToken");
    navigate("/auth");
    console.log("Before removal:", Cookies.get("userToken"));
    Cookies.remove("userToken");
    console.log("After removal:", Cookies.get("userToken"));
    window.location.reload()
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-8'>
          <h1>Memories</h1>
        </div>
        <div className='col-4'>
          {isUserAuthenticated ? <button className="mt-2 buttonStyle" onClick={handleLogout}> Logout </button> : <button className="mt-2 buttonStyle" onClick={handleLogin}> Login </button>}
        </div>
      </div>
      <div className='row'>
        <div className='col-8'>
          <AllPosts setCurrentId={setCurrentId} />
        </div>
        <div className='col-4'>
          <Form
            currentId={currentId}
            setCurrentId={setCurrentId}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

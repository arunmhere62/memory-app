import React, { useEffect, useState } from "react";
import Input from "./input";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { signUp, userLogin } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated } from "../../constants/auth.js";
import "../../style.css";
import axios from "axios";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signIn, setSignIn] = useState(false);
  const isUserAuthenticated = isAuthenticated();

  const initialValue = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

  const [form, setForm] = useState(initialValue);

  const { data: loginDetails, status: status, error: error } = useSelector((state) => state.googleLogin);

  const handleChange = (e) => {
    setForm((prevFrom) => ({ ...prevFrom, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (signIn) {
      // Implement sign up logic
      dispatch(signUp(form));
    } else {
      try {
        // Make a POST request to your backend endpoint
        const response = await axios.post("http://localhost:5000/user/localSignin", {
          email: form.email,
          password: form.password,
        });

        // Handle successful login
        console.log("Login successful");
        console.log(response.data); // If your backend sends back any data, you can access it here

        // For now, let's just navigate to the homepage after successful login
        navigate("/");
      } catch (error) {
        // Handle errors
        console.error("Login failed:", error.message);
      }
    }
  };

  useEffect(() => {
    if (status === "success" && loginDetails.token) {
      const token = loginDetails.token;

      Cookies.set("userToken", token, { expires: 7 });

      // Add cleanup function to navigate when the component is unmounted
      navigate("/");
    }
  }, [status, loginDetails.token, navigate]);

  const googleSuccess = async (res) => {
    let credentialResponseDecoded = jwtDecode(res.credential);
    dispatch(
      userLogin({
        googleUserId: credentialResponseDecoded.sub,
        email: credentialResponseDecoded.email,
        name: credentialResponseDecoded.name,
      })
    );
  };

  const switchMode = (e) => {
    e.preventDefault();
    setSignIn((previousSignIn) => !previousSignIn);
  };

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h2>{signIn ? "Sign Up" : "Sign In"}</h2>
          </div>
          <div className='col-4'>
            <form
              className='form-style'
              action=''
            >
              {signIn && (
                <>
                  <Input
                    value={form.firstName}
                    name='firstName'
                    placeholder='firstName'
                    onChange={handleChange}
                    type='text'
                  />
                  <Input
                    value={form.lastName}
                    name='lastName'
                    placeholder='lastName'
                    onChange={handleChange}
                    type='text'
                  />
                </>
              )}
              <Input
                value={form.email}
                name='email'
                placeholder='email'
                onChange={handleChange}
                type='email'
              />
              <Input
                value={form.password}
                name='password'
                placeholder='password'
                onChange={handleChange}
                type='password'
              />
              {signIn && (
                <Input
                  value={form.confirmPassword}
                  name='confirmPassword'
                  placeholder='confirmPassword'
                  onChange={handleChange}
                  type='password'
                />
              )}
              <button
                className='buttonStyle '
                onClick={handleSubmit}
                type='submit'
              >
                {signIn ? "Sign Up" : "Sign In"}
              </button>
              <button
                className='buttonStyle mx-2'
                onClick={switchMode}
              >
                {signIn ? "Already have an account ?" : "Dont't have and account ?"}
              </button>
              <GoogleLogin
                onSuccess={googleSuccess}
                onError={() => {
                  console.log("Login Failed");
                }}
                size='100%'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

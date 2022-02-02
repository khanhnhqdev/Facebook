import "./login.css";
import React, {useContext, useRef} from "react";
import { CircularProgress } from "@material-ui/core";
import {AuthContext} from "../../context/AuthContext";
import {loginCall} from "../../apiCall";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const {isFetching, dispatch} = useContext(AuthContext);


    const handleClick = (e) => {
        console.log(isFetching);
        e.preventDefault();
        loginCall({email: email.current.value, password: password.current.value}, dispatch);
        console.log(isFetching);
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Facebook</h3>
                    <span className="loginDesc">
            Connect with friends and the world around you on Facebook.
          </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <div className="loginBox">
                            <input placeholder="Email"
                                   className="loginInput"
                                   type="email"
                                   required
                                   ref={email}
                            />
                            <input placeholder="Password"
                                   className="loginInput"
                                   type="password"
                                   required
                                   minLength="4"
                                   ref={password}
                            />
                            <button className="loginButton" disabled={isFetching} type="submit">
                                {isFetching ? (<CircularProgress color="white" size="20px" />) : ("Log In")}
                            </button>
                            <span className="loginForgot">Forgot Password?</span>
                            <button className="loginRegisterButton">
                                Create a New Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

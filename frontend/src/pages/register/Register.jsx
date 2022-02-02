import "./register.css";
import React, {useRef} from "react";
import {useHistory} from "react-router";
import axios from "axios";

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match!");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try {
                await axios.post("/auth/register", user);
                history.push("/login");
            } catch (err) {
                console.log(err);
            }
        }
    };
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
                        <input placeholder="Username"
                               required
                               ref={username}
                               className="loginInput"/>
                        <input placeholder="Email"
                               required
                               ref={email}
                               className="loginInput"
                               type="email"/>
                        <input placeholder="Password"
                               className="loginInput"
                               required
                               ref={password}
                               type="password"
                               minLength="4"/>
                        <input placeholder="Password Again"
                               className="loginInput"
                               required
                               ref={passwordAgain}
                               type="password"/>
                        <button className="loginButton">Sign Up</button>
                        <button className="loginRegisterButton">
                            Log into Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import './CustomerAuth.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CustomerAuth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    // Login State
    const [loginVal, setLoginVal] = useState({ email: "", password: "" });
    
    // Register State
    const [regVal, setRegVal] = useState({ name: "", email: "", password: "" });

    const handleLoginChange = (e) => setLoginVal({ ...loginVal, [e.target.name]: e.target.value });
    const handleRegChange = (e) => setRegVal({ ...regVal, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3003/wholewatch/customerLogin", loginVal);
            if (res.data) {
                alert("Successfully Logined");
                localStorage.setItem("customer_token", JSON.stringify(res.data.token));
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            alert("Login Failed");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3003/wholewatch/addCustomer", regVal);
            if (res.data) {
                alert("Successfully Registered");
                setIsSignUp(false); // Switch to login after register
            }
        } catch (error) {
            console.error(error);
            alert("Registration Failed");
        }
    };

    return (
        <div className="auth-body">
            <div className={`auth-container ${isSignUp ? "right-panel-active" : ""}`}>
                
                {/* Sign Up Form */}
                <div className="form-container sign-up-container">
                    <form onSubmit={handleRegister}>
                        <h1 className="form-title">Create Account</h1>
                        <div className="input-group">
                            <i className="fa fa-user"></i>
                            <input type="text" placeholder="Name" name="name" value={regVal.name} onChange={handleRegChange} required />
                        </div>
                        <div className="input-group">
                            <i className="fa fa-envelope"></i>
                            <input type="email" placeholder="Email" name="email" value={regVal.email} onChange={handleRegChange} required />
                        </div>
                        <div className="input-group">
                            <i className="fa fa-lock"></i>
                            <input type="password" placeholder="Password" name="password" value={regVal.password} onChange={handleRegChange} required />
                        </div>
                        <button type="submit" className="auth-btn yellow-btn">SIGN UP</button>
                    </form>
                </div>

                {/* Sign In Form */}
                <div className="form-container sign-in-container">
                    <form onSubmit={handleLogin}>
                        <h1 className="form-title">Sign In to <br/> Your Account</h1>
                        <div className="input-group">
                            <i className="fa fa-envelope"></i>
                            <input type="email" placeholder="Email" name="email" value={loginVal.email} onChange={handleLoginChange} required />
                        </div>
                        <div className="input-group">
                            <i className="fa fa-lock"></i>
                            <input type="password" placeholder="Password" name="password" value={loginVal.password} onChange={handleLoginChange} required />
                        </div>
                        <a href="#" className="forgot-password">forgot password!</a>
                        <button type="submit" className="auth-btn yellow-btn">SIGN IN</button>
                    </form>
                </div>

                {/* Overlay Container */}
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us plese<br/>login with your personal info</p>
                            <button className="auth-btn ghost" onClick={() => setIsSignUp(false)}>SIGN IN</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello Friend!</h1>
                            <p>Enter your personal details and<br/>start your journey with us</p>
                            <button className="auth-btn ghost" onClick={() => setIsSignUp(true)}>SIGN UP</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CustomerAuth;

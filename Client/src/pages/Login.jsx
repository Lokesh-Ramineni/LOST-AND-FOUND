import { useState } from 'react'
import './style/Login.css'

import axios from 'axios'
import { redirect, useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password,setPassword]=useState('')
    const [error, setError] = useState("");
    const navigate =useNavigate()
    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            )

            // store token
            localStorage.setItem("token", res.data.token)

            // go to home page
            navigate("/home")

        } catch (error) {

            alert(error.response.data.message)

        }
    }
        
    return(
        <div className="page">
            <div className="left-section">

                {/* floating icons */}
                <div className="glass-icon icon-top">📦</div>
                <div className="glass-icon icon-right">📍</div>

                {/* circle element */}
                <div className="outer-circle">
                    <div className="inner-circle">
                        <div className="center-icon">📦</div>
                    </div>
                </div>

                {/* text */}
                <div className="logo">
                    <h1>Campus Find</h1>
                    <p>Helping students reconnect with their lost items.</p>
                </div>

                {/* slider */}
                <div className="slider">
                    <div className="slider-line"></div>
                    <div className="slider-dot"></div>
                    <div className="slider-line"></div>
                </div>

            </div>

            <div className="right-section">

                <div className="login-container">

                <h2>Welcome Back</h2>
                <p className="subtitle">Login to your Campus Find account</p>

                <form onSubmit={handleSubmit}>

                    <label>Email Address</label>
                    <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    />

                    <label>Password</label>
                    <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    />
                    {error && <p className="error" style={{color:'red'}}>{error}</p>}
                    <p className="forgot">
                    <a href="#">Forgot Password?</a>
                    </p>

                    <button type="submit" className="login-btn">
                    Login
                    </button>

                    <p className="signup">
                    Don't have an account? <a href="/Register">Sign Up</a>
                    </p>

                </form>
                </div>
            </div>
        </div>
  );
}

export default Login
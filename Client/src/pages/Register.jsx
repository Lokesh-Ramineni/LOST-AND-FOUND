import { useState } from 'react'
import "./style/Register.css"
import axios from 'axios'
function Register() {
    const [username, setUsername] = useState('')
    const [email,setemail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const handlerequest=async(e) =>{
        e.preventDefault()
        try{
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
            else{
                setUsername('')
                setemail('')
                setPassword('')
                setConfirmPassword('')
            }
            await axios.post("http://localhost:5000/api/auth/Register",{
                username,
                email,
                password
            })
            alert("User registerd succesfully.")
        }
        catch(e){
            console.log(e)
        }
        
    }
    return(
        <div className="register-page">

            <div className="logo-section">
                <div className="logo">🔍</div>
                <h1>Campus Find</h1>
                <p>Join our lost and found community</p>
            </div>

            <div className="register-container">

                <div className="form-header">
                    <h2>Create Account</h2>
                    <p>Sign up to get started with Campus Find</p>
                </div>

                <form onSubmit={handlerequest}>

                    <label>Full Name</label>
                    <input
                        type="text"
                        placeholder="Enter your full name"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        required
                    />

                    <label>Email Address</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e)=>setemail(e.target.value)}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />

                    <label>Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Sign Up</button>

                </form>
                <p className="login-link">
                    Already have an account? <a href="/Login">Login</a>
                </p>
            </div>
        </div>
    );
}
export default Register
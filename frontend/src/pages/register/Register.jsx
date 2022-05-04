import axios from 'axios';
import { useRef } from 'react';
import {useNavigate} from 'react-router-dom'
import'./register.css';

export default function Register() {
    const username= useRef();
    const email= useRef();
    const password= useRef();
    const confirPassword= useRef();

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password.current.value !== confirPassword.current.value){
            confirPassword.current.setCustomValidity("Confirm Password don't match")
        }else{
            const user ={
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
                confirPassword:confirPassword.current.value,
            };
            try {
                const resp = await axios.post('/auth/register', user)
                localStorage.setItem("user", JSON.stringify(resp.data))
                navigate('/')
            } catch (error) {
                console.log(error);
            }
        }
    }
  return (
    <div className='register'>
        <div className="registerWrapper">
            <div className="registerLeft">
                <h3 className="registerLogo">HssnSocial</h3>
                <span className="registerDesc">Connect with Friends and the the word around you on HssnSocial</span>
            </div>
            <form className="registerRight" onSubmit={handleSubmit}>
                <div className="registerBox">
                    <input type="text" placeholder='Username' className="registerInput" required ref={username}/>
                    <input type="text" placeholder='Email' className="registerInput"required ref={email} />
                    <input type="password" placeholder='Password' className="registerInput" minLength='6' required ref={password}/>
                    <input type="password" placeholder='Confirm password' className="registerInput" required ref={confirPassword}/>
                    <button className="registerBtn" type='submit'>Sign Up </button> 
                    <button className="registerRegister">Log into your Account</button>
                </div>
            </form>
        </div>
    </div>
  )
}

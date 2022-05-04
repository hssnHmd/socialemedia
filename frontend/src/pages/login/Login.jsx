import { useContext, useRef } from 'react'
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import'./login.css';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';

export default function Login() {
    const email = useRef()
    const password = useRef();
    const {isFetching, error, user, dispatch} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        loginCall({email: email.current.value, password: password.current.value},dispatch)
    } 
  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">HssnSocial</h3>
                <span className="loginDesc">Connect with Friends and the the word around you on HssnSocial</span>
            </div>
            <form className="loginRight" onSubmit={handleSubmit}>
                <div className="loginBox">
                    <input type="text" placeholder='Email' required className="loginInput" ref={email} />
                    <input type="password" placeholder='Password' required minLength="6" className="loginInput" ref={password} />
                    <button type='submit' className="loginBtn"  disabled={isFetching}>{isFetching ? <CircularProgress color="success" size="20px" />: "Log In"}</button>
                    <span className="forgotPassword">Forgot password?</span>
                    <Link className="loginRegister" to='/register'>Create new Account</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

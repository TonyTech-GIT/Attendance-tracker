import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const Login = ({ dataReceived }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const handleIconVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleRedirectChange = (e) => {
        e.preventDefault()

        const user = {
            email: email,
            password: password,
        };

        if (!email || !password) {
            return alert('Please fill in the required fields!')
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email.match(emailRegex)) {
                return alert('Please enter a valid email!')
            }
        }

        axios
            .post('http://localhost:5000/auth/login', user)
            .then((response) => {
                const userData = response.data;

                dataReceived(userData)

                const userRole = response.data.role
                if (userRole === 'admin') {
                    navigate('/auth/admin')
                } else {
                    navigate('/auth/student')
                }

                // console.log(userRole);
                console.log(response)
                console.log(response.data)
                // alert('Login successful')
            })
            .catch((err) => {

                if (err.response &&
                    err.response.status === 401 &&
                    err.response.data.message === 'Please enter a password...') {
                    // return alert("Please enter a password...")
                    setErrorMessage('Please enter a password...')
                } else if (err.response &&
                    err.response.status === 400 &&
                    err.response.data.message === 'Invalid password!'
                ) {
                    // return alert('Invalid password!')
                    setErrorMessage('Invalid password!')
                } else if (err.response &&
                    err.response.status === 400 &&
                    err.response.data.message === 'user does not exist'
                ) {
                    // return alert('user does not exist')
                    setErrorMessage('User does not exist')
                } else {
                    console.log(err)
                    // alert('An error occurred. Try again')
                    setErrorMessage('An error occurred. Try again')
                }
            })




    }

    return (
        <div>
            <h1>Login Page</h1>
            <main className="auth-container">

                <form className="login-form flex" action="" method="get">
                    {errorMessage && (
                        <>

                            <div className="error-msg"><FontAwesomeIcon className="error-icon" icon={faExclamationCircle} />{errorMessage}</div>
                        </>


                    )}

                    {/* Easy identification of labels with inputs within... */}

                    <label className="emailLabel label">
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email..." />

                    </label>

                    <label className="passwordLabel password-wrapper label">
                        Password:
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} placeholder="Enter a password..." />

                        <button type='button' onClick={handleIconVisibility} className='password-toggle-btn'>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>

                    </label>


                    <div className="cta">

                        <button type="button" onClick={handleRedirectChange} className="signUp-btn">Login</button>
                        <p>Don't have an account.<Link to='/auth'>SignUp</Link></p>
                    </div>

                </form>
            </main>
        </div>
    )
}

export default Login

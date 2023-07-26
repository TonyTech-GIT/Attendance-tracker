import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'



const Auth = ({ dataReceived }) => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [role, setRole] = useState('admin')
    // const [duplicateUser, setDuplicateUser] = useState(false)




    const handleIconVisibility = () => {

        // setShowPassword((prevShowPassword) => !prevShowPassword)
        setShowPassword(!showPassword)
    }

    const handleRoleChange = (event) => {
        setRole(event.target.value)
    }

    const handleRedirectChange = async (e) => {
        e.preventDefault()

        // Create user instance...

        const user = {
            userName,
            email,
            password,
            role
        }


        // check if all fields are filled...
        if (!userName || !email || !password) {
            return alert("Please fill all the fields")
        } else {


            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // check if email is valid...
            if (!email.match(emailRegex)) {

                return alert('Please enter a valid email')
            }



            // Send POST request to backend using axios....

            axios
                .post('http://localhost:5000/auth', user)
                .then((response) => {

                    const responseData = response.data

                    dataReceived(responseData)


                    // redirect based on user roles...
                    const userRole = response.data.role


                    if (userRole === 'student') {
                        navigate('/auth/student')
                    } else {
                        navigate('/auth/admin')
                    }

                    // console.log(responseData)
                    // console.log(responseData.userName)

                    alert('user created successfully')

                })
                .catch((err) => {
                    // error handlers...
                    if (err.response &&
                        err.response.status === 401 &&
                        err.response.data.message === "user already exists!") {
                        // setDuplicateUser(true);
                        return alert('User already exists!');
                    } else {
                        console.log('Error:', err)

                    }
                })

        }

    }

    return (
        <div>
            <h1>Authorization Page</h1>


            <main className="auth-container">
                <form className="auth-form flex" action="" method="get">

                    {/* Easy identification of labels with inputs within... */}
                    <label className="nameLabel label">
                        Username:
                        <input className="nameText"
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)} placeholder="Enter your name..." />

                    </label>

                    <label className="emailLabel label">
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email..." />

                    </label>

                    <label className="passwordLabel label password-wrapper">
                        Password:
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} placeholder="Enter a password..."
                        />
                        <button type='button' onClick={handleIconVisibility} className='password-toggle-btn'>
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                        </button>



                    </label>

                    <label className="roleLabel label flex flex-ai_c">
                        Role:
                        <div className="roles ">
                            <label >
                                Admin
                                <input type="radio" value='admin' checked={role === 'admin'} onChange={handleRoleChange} />
                            </label>

                            <label >
                                Student
                                <input type="radio" value='student' checked={role === 'student'} onChange={handleRoleChange} />
                            </label>

                        </div>

                    </label>

                    <div className="cta">
                        <button onClick={handleRedirectChange} className="signUp-btn">SignUp</button>
                        <p>Already have an account.<Link to='/login'>Login</Link></p>
                    </div>

                </form>

            </main>


        </div>
    )
}

export default Auth;

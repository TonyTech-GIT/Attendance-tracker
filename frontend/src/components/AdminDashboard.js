import DashBtn from "./DashBtn"
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faUser, faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"
import Chart from 'react-apexcharts'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios'

// import AdminDataContext from "./AdminDataContext"


const AdminDashboard = ({ authDetails }) => {
    const [showModal, setShowModal] = useState(false)
    const [modalMe, setModalMe] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [menuButton, setMenuButton] = useState(false)

    const [date, setDate] = useState(new Date())


    const [newAdmin, setNewAdmin] = useState(null)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [regNo, setRegNo] = useState('')
    const [contact, setContact] = useState('')
    const [course1, setCourse1] = useState(false)
    const [course2, setCourse2] = useState(false)
    const [course3, setCourse3] = useState(false)

    // const options = ['CSC 442', 'CSC 414', 'CSC 422']

    // const validData = useContext(AdminDataContext)

    const [testData, setTestData] = useState({
        options: {
            // colors: ['#E91E63', '#FF9800'],
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]
            }
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            },
            // {
            //     name: "series-2",
            //     data: [3, 60, 35, 80, 59, 60, 20, 95]
            // }
        ]
    }
    )

    console.log(setTestData);

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        // Retrieve data from localStorage
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setUserName(userData.userName);
            setEmail(userData.email);
        }
    }, [])

    const navigate = useNavigate()

    const handleAdminProfile = () => {
        return setShowModal(!showModal)
    }
    const handleAdminIcon = () => {
        return setModalMe(!modalMe)
    }

    if (showModal || modalMe) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const handleMeAdmin = () => {
        return setModalMe(!modalMe)
    }

    const handleMeCancel = () => {
        setModalMe(!modalMe)

        setErrorMessage('')
    }



    const handleMeConfirm = () => {
        // return setModalMe(!modalMe)

        const selectedCourses = [];
        if (course1) {
            selectedCourses.push('CSC 442');
        }
        if (course2) {
            selectedCourses.push('CSC 414');
        }
        if (course3) {
            selectedCourses.push('CSC 422');
        }

        const adminData = {

            firstName,
            lastName,
            gender,
            courses: selectedCourses,
            contact,
            regNo

        };

        if (!firstName || !lastName || !gender || !contact || !regNo) {
            alert('Please fill all fields')
            return setErrorMessage('Please fill all fields')
        } else {
            const validRegNo = /^LECT\/\d{2}\/\d{1,6}$/
            if (!regNo.match(validRegNo)) {
                alert('invalid reg number')
                return setErrorMessage('Invalid Registration number format!')
            }
        }

        // Check if at least one course checkbox is selected
        if (!course1 && !course2 && !course3) {
            alert('Please select at least one course');
            return setErrorMessage('Please select at least one course');
        }


        // axios POST request for valid admin...

        axios
            .post('http://localhost:5000/auth/admin', adminData)
            .then((response) => {

                const testData = response.data

                setNewAdmin(testData)

                alert('Admin registered successfully!')
                console.log(newAdmin);

            })
            .catch((err) => {
                if (err.response &&
                    err.response.status === 400 &&
                    err.response.data.message === 'No admins found') {
                    setErrorMessage('No admins found')
                } else if (err.response &&
                    err.response.status === 400 &&
                    err.response.data.message === 'Admin already exists!') {
                    setErrorMessage("Admin with this registration no' already exists!")
                } else {
                    console.log("Error fetching data", err)

                }
            })

    }

    const handleMeUpdate = () => {


        axios
            .put(`http://localhost:5000/auth/admin/:id`)
            .then((res) => {
                const updatedAdmin = res.data

                console.log('updated admin data', updatedAdmin);
            })
        // setModalMe(!modalMe)
    }



    const navigateReportPage = () => {
        navigate('/auth/admin/report')
    }

    const navigateAttendancePage = () => {
        navigate('/auth/admin/attendance')
    }


    const toggleMenu = () => {

        const menuOverlay = document.getElementById('mobileOverlay')
        if (menuButton === true) {
            // menuOverlay.style.right = "-50%"
            menuOverlay.style.display = "none"

        } else {
            // menuOverlay.style.right = "0"
            menuOverlay.style.display = "block"
        }

        setMenuButton(!menuButton)
        console.log("hello");
    };





    // const handleCourseSelection = (e) => {
    //     const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value)

    //     setCourses(selectedOptions)
    // }


    return (
        <div className="admin-dash">
            {/* ADMIN HEADER SECTION STARTS... */}
            <section className="admin-header flex flex-jc_sb flex-ai_c">
                <div className="pg-title">
                    <h1>Admin Dashboard</h1>
                </div>

                <div className="log-profile flex flex-ai_c">
                    <Link onClick={handleMeAdmin}>
                        <div className="profile">
                            <FontAwesomeIcon className="profile-icon" icon={faUser} />
                            {/* <img src={<FontAwesomeIcon icon={'/'} />} alt="" /> */}
                        </div>
                    </Link>

                    {modalMe && (<main className="modal-me">

                        <div className="profile-modal">
                            <FontAwesomeIcon className="modal-1_icon" onClick={handleAdminIcon} icon={faClose} />

                            {errorMessage && (
                                <>
                                    <div className="error-msg"><FontAwesomeIcon className="error-icon" icon={faExclamationCircle} />{errorMessage}</div>
                                </>


                            )}

                            <label className="label-firstName">
                                FirstName:
                                <input className="label-firstName-text" type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Enter your first name" />


                            </label>
                            <label className="label-lastName">
                                LastName:
                                <input className="label-lastName-text" type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Enter your last name" />


                            </label>
                            <label className="label-gender">
                                Gender:
                                <input className="label-gender-text" type="text"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    placeholder="Enter your gender" />


                            </label>
                            <label className="label-regNo">
                                RegNo:
                                <input className="label-regNo-text" type="text"
                                    value={regNo}
                                    onChange={(e) => setRegNo(e.target.value)}
                                    placeholder="Enter your RegNo" />

                            </label>

                            <label htmlFor='options' className="label-courses">
                                Courses:

                                <label  >
                                    CSC 442
                                    <input type="checkbox"
                                        name='checkbox_1'
                                        checked={course1}
                                        value='CSC 442'
                                        onChange={() => setCourse1(!course1)} />

                                </label>

                                <label>
                                    CSC 414
                                    <input type="checkbox"
                                        name="checkbox_2"
                                        checked={course2}
                                        value='CSC 414'
                                        onChange={() => setCourse2(!course2)} />

                                </label>

                                <label>
                                    CSC 422
                                    <input type="checkbox"
                                        name="checkbox_3"
                                        checked={course3}
                                        value='CSC 422'
                                        onChange={() => setCourse3(!course3)} />

                                </label>

                            </label>


                            <label className="label-contact">
                                Contact:
                                <input className="label-contact-text" type="number"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    placeholder="Enter your Phone Number" />


                            </label>


                            <div className="admin-me-cta flex">

                                <button onClick={handleMeCancel} className="cancel-btn">Cancel</button>

                                <button onClick={handleMeConfirm} className="confirm-btn">Confirm</button>

                                <button onClick={handleMeUpdate} className="update-btn">Update</button>

                            </div>
                        </div>


                    </main>)}


                    <div className="logout">
                        <Link to={'/'}>
                            <DashBtn btnText={'Sign Out'} />

                        </Link>
                    </div>

                    <div className={`menuBtn ${menuButton ? "change" : ""}`} onClick={toggleMenu}>
                        <div className="bar-1"></div>
                        <div className="bar-2"></div>
                        <div className="bar-3"></div>
                    </div>

                    <div className="menuOverlay" id="mobileOverlay">
                        <ul>

                            <li onClick={handleAdminProfile}> Admin Profile</li>

                            <li onClick={navigateReportPage}>Report</li>

                            <li onClick={navigateAttendancePage}>Attendance</li>
                            {/* <li>Courses</li> */}
                            <li>Student Profile</li>

                            <Link to={'/'}>
                                <button className="mobile-btn">Sign Out</button>

                            </Link>



                            {/* Static view of admin profile */}
                            {showModal && (
                                <div className="modal-1">
                                    <main className="content">
                                        <FontAwesomeIcon className="modal-1_icon" onClick={handleAdminProfile} icon={faClose} />
                                        <div className="label-info">
                                            <label className="content-name label">
                                                UserName:
                                                {/* <p>{authDetails.userName}</p> */}
                                                <p>{userName}</p>
                                            </label>
                                            <label className="content-name label">
                                                FirstName:
                                                <p>{firstName}</p>
                                            </label>
                                            <label className="content-name label">
                                                LastName:
                                                <p>{lastName}</p>
                                            </label>
                                            <label className="content-email label">
                                                Email:
                                                {/* <p>{authDetails.email}</p> */}
                                                <p>{email}</p>
                                            </label>
                                            <label className="content-gender label">
                                                Gender:
                                                <p>{gender}</p>
                                            </label>



                                            <label className="content-course label">
                                                Course(s):
                                                {course1 && <p>CSC 442</p>}
                                                {course2 && <p>CSC 414</p>}
                                                {course3 && <p>CSC 422</p>}


                                            </label>
                                            <label className="content-phoneNo label">
                                                Contact:
                                                <p>{contact}</p>
                                            </label>
                                        </div>

                                    </main>

                                </div>
                            )}


                        </ul>
                    </div>
                </div>

            </section>
            {/* ADMIN HEADER SECTION ENDS... */}


            {/* ADMIN BODY SECTION START... */}
            <section className="admin-body-section grid">

                <aside className="admin-aside-left">
                    {/* <h1>Left aside</h1> */}
                    <div className="aside-lists">
                        <ul>

                            <li onClick={handleAdminProfile}> Admin Profile</li>

                            <li onClick={navigateReportPage}>Report</li>

                            <li onClick={navigateAttendancePage}>Attendance</li>
                            {/* <li>Courses</li> */}
                            <li>Student Profile</li>

                            {/* Static view of admin profile */}
                            {showModal && (
                                <div className="modal-1">
                                    <main className="content">
                                        <FontAwesomeIcon className="modal-1_icon" onClick={handleAdminProfile} icon={faClose} />
                                        <div className="label-info">
                                            <label className="content-name label">
                                                UserName:
                                                {/* <p>{authDetails.userName}</p> */}
                                                <p>{userName}</p>
                                            </label>
                                            <label className="content-name label">
                                                FirstName:
                                                <p>{firstName}</p>
                                            </label>
                                            <label className="content-name label">
                                                LastName:
                                                <p>{lastName}</p>
                                            </label>
                                            <label className="content-email label">
                                                Email:
                                                {/* <p>{authDetails.email}</p> */}
                                                <p>{email}</p>
                                            </label>
                                            <label className="content-gender label">
                                                Gender:
                                                <p>{gender}</p>
                                            </label>



                                            <label className="content-course label">
                                                Course(s):
                                                {course1 && <p>CSC 442</p>}
                                                {course2 && <p>CSC 414</p>}
                                                {course3 && <p>CSC 422</p>}


                                            </label>
                                            <label className="content-phoneNo label">
                                                Contact:
                                                <p>{contact}</p>
                                            </label>
                                        </div>

                                    </main>
                                </div>
                            )}

                        </ul>
                    </div>
                </aside>

                <main className="admin-main">
                    {/* <h1>Admin-main</h1> */}

                    {/* ADMIN ANALYTICS FIRST-DIV CONTAINER... */}
                    <div className="analytics flex">
                        <div className="analy-1">
                            <Chart
                                options={testData.options}
                                series={testData.series}
                                type="bar"
                                width="300"
                                height='200'
                            />
                        </div>

                        {/* ADMIN ANALYTICS SECOND-DIV CONTAINER... */}
                        <div className="analy-2">
                            <Chart
                                options={testData.options}
                                series={testData.series}
                                type="line"
                                width="300"
                                height='200'
                            />
                        </div>
                    </div>
                    <div className="analytics-overall flex">
                        <Chart
                            options={testData.options}
                            series={testData.series}
                            type="area"
                            width="620"
                            height='250'
                        />
                    </div>
                    <footer className="main-footer">
                        <p>Attendance-Tracker project &copy; 2023</p>
                    </footer>
                </main>

                <aside className="admin-aside-right">
                    {/* <h1>Aside-right</h1> */}
                    <div className="aside-sched">
                        <Calendar onChange={setDate} value={date} />
                    </div>
                </aside>

            </section>


            {/* ADMIN BODY SECTION END... */}

        </div>
    )
}

export default AdminDashboard

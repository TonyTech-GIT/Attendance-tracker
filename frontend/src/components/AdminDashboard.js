import DashBtn from "./DashBtn"
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faUser } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"
import Chart from 'react-apexcharts'
// import TextField from '@material-ui/core/TextField'
// import AutoComplete from '@material-ui/lab/Autocomplete'

// import AdminDataContext from "./AdminDataContext"


const AdminDashboard = ({ authDetails }) => {
    const [showModal, setShowModal] = useState(false)
    const [modalMe, setModalMe] = useState(false)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    // const [courses, setCourses] = useState(false)
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
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            }
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            },
            {
                name: "series-2",
                data: [3, 60, 35, 80, 59, 60, 20, 95]
            }
        ]
    }
    )

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
        // console.log(courses)
    }

    const handleMeConfirm = () => {
        return setModalMe(!modalMe)
    }

    const navigateReportPage = () => {
        navigate('/auth/admin/report')
    }

    const navigateAttendancePage = () => {
        navigate('/auth/admin/attendance')
    }



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

                            </div>
                        </div>


                    </main>)}


                    <div className="logout">
                        <Link to={'/'}>
                            <DashBtn btnText={'Sign Out'} />

                        </Link>
                    </div>
                </div>

            </section>

            {/* ADMIN HEADER SECTION ENDS... */}

            {/* ADMIN BODY SECTION START... */}
            <section className="admin-body-section grid">

                <aside className="admin-aside-left">
                    <h1>Left aside</h1>
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
                    <h1>Admin-main</h1>

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
                        <p>This is a nice project by me &copy; 2023</p>
                    </footer>
                </main>

                <aside className="admin-aside-right">
                    <h1>Aside-right</h1>
                    <div className="aside-sched">

                    </div>
                </aside>

            </section>




            {/* ADMIN BODY SECTION END... */}

        </div>
    )
}

export default AdminDashboard

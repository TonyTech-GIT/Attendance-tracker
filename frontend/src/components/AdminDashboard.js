import DashBtn from "./DashBtn"
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faUser } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
// import TextField from '@material-ui/core/TextField'
// import AutoComplete from '@material-ui/lab/Autocomplete'

// import AdminDataContext from "./AdminDataContext"

const AdminDashboard = ({ authDetails }) => {
    const [showModal, setShowModal] = useState(false)
    const [modalMe, setModalMe] = useState(false)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [courses, setCourses] = useState([])
    const [contact, setContact] = useState('')

    // const options = ['CSC 442', 'CSC 414', 'CSC 422']

    // const validData = useContext(AdminDataContext)

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

    const handleCourseSelection = (course) => {
        if (courses.includes(course)) {
            setCourses(courses.filter(selected => selected !== course))
        } else {
            setCourses([...courses, course])
        }
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



                                {/* <select className="label-courses-text" name="options"
                                    multiple={true}
                                    value={courses}
                                    onChange={handleCourseSelection}>
                                    <option value="CSC 442">CSC 442</option>
                                    <option value="CSC 414">CSC 414</option>
                                    <option value="CSC 422">CSC 422</option>
                                    <option value="CSC 411">CSC 411</option>
                                    <option value="CSC 421">CSC 421</option>
                                </select> */}
                                {/* <input className="label-courses-text" type="text"
                                    value={courses}
                                    onChange={(e) => setCourses(e.target.value)}
                                    placeholder="Enter your courses" /> */}

                                <label  >
                                    CSC 442
                                    <input type="checkbox"
                                        value='CSC 442'
                                        onChange={() => handleCourseSelection('CSC 442')} />

                                </label>

                                <label>
                                    CSC 414
                                    <input type="checkbox"
                                        value='CSC 414'
                                        onChange={() => handleCourseSelection('CSC 414')} />

                                </label>

                                <label>
                                    CSC 422
                                    <input type="checkbox"
                                        value='CSC 422'
                                        onChange={() => handleCourseSelection('CSC 422')} />

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
                            <li>Courses</li>
                            <li>Student Profile</li>

                            {showModal && (
                                <div className="modal-1">
                                    <main className="content">
                                        <FontAwesomeIcon className="modal-1_icon" onClick={handleAdminProfile} icon={faClose} />
                                        <div className="label-info">
                                            <label className="content-name label">
                                                UserName:
                                                <p>{authDetails.userName}</p>
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
                                                <p>{authDetails.email}</p>
                                            </label>
                                            <label className="content-gender label">
                                                Gender:
                                                <p>{gender}</p>
                                            </label>

                                            {/* <label className="content-role label">
                                                Role:
                                                <p>sdfgsdgfd</p>
                                            </label> */}

                                            <label className="content-course label">
                                                Course(s):
                                                <p>{courses.join(', ')}</p>
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
                    <div className="analytics flex">
                        <div className="analy-1"></div>
                        <div className="analy-2"></div>
                    </div>
                    <div className="analytics-overall flex">

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

import DashBtn from "./DashBtn"
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faUser } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const AdminDashboard = () => {
    const [showModal, setShowModal] = useState(false)
    const [modalMe, setModalMe] = useState(false)

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

    const navigateReportPage = () => {
        navigate('/auth/admin/report')
    }

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
                        <div className="profile">
                            <label className="label-firstName">
                                FirstName:
                                <input className="label-firstName-text" type="text" placeholder="Enter your first name" />


                            </label>
                            <label className="label-lastName">
                                LastName:
                                <input className="label-lastName-text" type="text" placeholder="Enter your last name" />


                            </label>
                            <label className="label-gender">
                                Gender:
                                <input className="label-gender-text" type="text" placeholder="Enter your gender" />


                            </label>
                            <label className="label-courses">
                                Courses:
                                <input className="label-courses-text" type="text" placeholder="Enter your courses" />


                            </label>
                            <label className="label-contact">
                                Contact:
                                <input className="label-contact-text" type="number" placeholder="Enter your Phone Number" />


                            </label>


                            <div className="admin-me-cta flex">

                                <button onClick={handleMeAdmin} className="cancel-btn">Cancel</button>



                                <button onClick={handleMeAdmin} className="confirm-btn">Confirm</button>


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




                            <li>Attendance</li>
                            <li>Courses</li>
                            <li>Student Profile</li>

                            {showModal && (
                                <div className="modal-1">
                                    <main className="content">
                                        <FontAwesomeIcon className="modal-1_icon" onClick={handleAdminProfile} icon={faClose} />
                                        <div className="label-info">
                                            <label className="content-name label">
                                                UserName:
                                                <p>sdsfsdf</p>
                                            </label>
                                            <label className="content-email label">
                                                Email:
                                                <p>sdfsgsfga</p>
                                            </label>
                                            <label className="content-gender label">
                                                Gender:
                                                <p>sdfgSDGsgSFd</p>
                                            </label>
                                            <label className="content-role label">
                                                Role:
                                                <p>sdfgsdgfd</p>
                                            </label>
                                            <label className="content-course label">
                                                Course:
                                                <p>dfsfasdfd</p>
                                            </label>
                                            <label className="content-phoneNo label">
                                                Contact:
                                                <p>adfSfgSDg</p>
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

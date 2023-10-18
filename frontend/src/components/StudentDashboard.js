import DashBtn from "./DashBtn"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faExclamationCircle, faUser } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import axios from "axios"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import Report from "./admin-sub/Report"



const StudentDashboard = ({ authDetails }) => {
    const [showModal, setShowModal] = useState(false)
    const [modalMe, setModalMe] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const [date, setDate] = useState(new Date())


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [courses, setCourses] = useState('')
    const [contact, setContact] = useState('')
    const [guardianNum, setGuardianNum] = useState('')
    const [regNo, setRegNo] = useState('')
    const [department, setDepartment] = useState('')
    const [homeAddress, setHomeAddress] = useState('')
    const [secondContact, setSecondContact] = useState('')


    const [dataStuTest, setDataStuTest] = useState(null)


    // const navigate = useNavigate()


    const handleAdminProfile = () => {
        return setShowModal(!showModal)
    }

    if (showModal || modalMe) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }



    // Confirm button...
    const handleMeConfirm = () => {

        // axios GET request for valid students...

        axios
            .get('http://localhost:5000/auth/studentReg')
            .then((response) => {

                const testData = response.data

                // validStudentData(dataStuTest)

                setDataStuTest(testData)

                // console.log(dataStuTest);

                console.log('from student dashBoard', dataStuTest);

                // console.log(testData)

            })
            .catch((err) => {
                console.log("Error fetching data", err)
            })





        // if (authDetails) {
        //     console.log(authDetails)
        //     console.log(authDetails.userName)
        // } else {
        //     console.log('ygugiyho')
        // }


        const studentData = {

            firstName,
            lastName,
            gender,
            courses,
            contact,
            guardianNum,
            regNo,
            department,
            homeAddress,
            secondContact

        };

        if (!firstName || !lastName || !gender || !courses || !contact || !guardianNum || !regNo || !department || !homeAddress || !secondContact) {
            alert('Please fill all fields')
            return setErrorMessage('Please fill all fields')
        } else {
            const validRegNo = /^[A-Z]{3,4}\/\d{2}\/\d{6}$/
            if (!regNo.match(validRegNo)) {
                alert('invalid reg number')
                return setErrorMessage('Invalid Registration number format!')
            }
        }

        // axios
        //     .get('http://localhost:5000/auth')
        //     .then((response) => {
        //         console.log(response.data)
        //     })
        //     .catch((err) => {
        //         console.error("Error:", err);
        //     })


        axios
            .post('http://localhost:5000/auth/studentReg', studentData)
            .then((response) => {

                // console.log(response.data)

                // const validDataValue = response.data

                // validStudentData(validDataValue)
                alert('Student registered successfully!')
                return setErrorMessage('')
            })
            .catch((err) => {


                if (err.response &&
                    err.response.status === 400 &&
                    err.response.data.message === 'No students found') {
                    setErrorMessage('No students found')
                } else if (err.response &&
                    err.response.status === 400 &&
                    err.response.data.message === 'Student already exists!') {
                    setErrorMessage("Student with this registration no' already exists!")
                } else if (err.response &&
                    err.response.status === 400 &&
                    err.response.data.message === 'Please enter a valid Phone Number!') {
                    setErrorMessage('Please enter a valid Phone Number!')
                } else {
                    alert('bad request, debug')

                }

            })

        // return setModalMe(!modalMe)
    }
    // setErrorMessage()

    const handleMeStudent = () => {
        return setModalMe(!modalMe)
    }

    const handleModalCancel = () => [
        setModalMe(!modalMe),

        setErrorMessage('')
    ]

    // const navigateReportPage = () => {
    //     navigate('/auth/admin/report')
    // }

    return (
        <div>


            {/* STUDENT HEADER SECTION STARTS... */}
            <section className="student-header flex flex-jc_sb flex-ai_c">
                <div className="pg-title">
                    <h1>Student Dashboard</h1>
                </div>

                <div className="log-profile flex flex-ai_c">
                    <Link onClick={handleMeStudent}>
                        <div className="profile">
                            <FontAwesomeIcon className="profile-icon" icon={faUser} />
                            {/* <img src={<FontAwesomeIcon icon={'/'} />} alt="" /> */}
                        </div>
                    </Link>

                    {modalMe && (<main className="student-modal-me">
                        <div className="profile ">
                            {errorMessage && (
                                <>
                                    <div className="error-msg"><FontAwesomeIcon className="error-icon" icon={faExclamationCircle} />{errorMessage}</div>
                                </>


                            )}
                            <div className="profile-container flex">

                                {/* PROFILE-1 SECTION */}

                                <div className="profile-1">
                                    <label className="label-firstName">
                                        FirstName:
                                        <input className="label-firstName-text" type="text"
                                            placeholder="Enter your first name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />


                                    </label>
                                    <label className="label-lastName">
                                        LastName:
                                        <input className="label-lastName-text" type="text"
                                            placeholder="Enter your last name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />


                                    </label>
                                    <label className="label-gender">
                                        Gender:
                                        <input className="label-gender-text" type="text"
                                            placeholder="Enter your gender"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                        />


                                    </label>
                                    <label className="label-courses">
                                        Courses:
                                        <input className="label-courses-text" type="text"
                                            placeholder="Enter your courses"
                                            value={courses}
                                            onChange={(e) => setCourses(e.target.value)}
                                        />


                                    </label>
                                    <label className="label-contact">
                                        Contact:
                                        <input className="label-contact-text" type="number"
                                            placeholder="Enter your Phone Number"
                                            value={contact}
                                            onChange={(e) => setContact(e.target.value)}
                                        />


                                    </label>
                                </div>

                                {/* PROFILE-2... */}

                                <div className="profile-2">
                                    <label className="label-guardian-num">
                                        Guardian Contact:
                                        <input className="label-guardianNum-text" type="text"
                                            placeholder="Enter your guardians contact"
                                            value={guardianNum}
                                            onChange={(e) => setGuardianNum(e.target.value)}
                                        />


                                    </label>
                                    <label className="label-RegNo">
                                        RegNo:
                                        <input className="label-regNo-text" type="text"
                                            placeholder="Enter your Reg Number"
                                            value={regNo}
                                            onChange={(e) => setRegNo(e.target.value)}
                                        />


                                    </label>
                                    <label className="label-department">
                                        Department:
                                        <input className="label-department-text" type="text"
                                            placeholder="Enter your department"
                                            value={department}
                                            onChange={(e) => setDepartment(e.target.value)}
                                        />


                                    </label>
                                    <label className="label-homeAddress">
                                        Home Address:
                                        <input className="label-homeAddress-text" type="text"
                                            placeholder="Enter your Home address"
                                            value={homeAddress}
                                            onChange={(e) => setHomeAddress(e.target.value)}
                                        />


                                    </label>
                                    <label className="label-secondContact">
                                        Second Contact:
                                        <input className="label-secondContact-text" type="number"
                                            placeholder="Enter your Second Contact"
                                            value={secondContact}
                                            onChange={(e) => setSecondContact(e.target.value)}
                                        />


                                    </label>

                                    {/* <label className="label-facialRecog">
                                        Facial Recognition:
                                        <button className="facial-recog-btn ">Facial Capture</button>


                                    </label> */}
                                </div>


                            </div>

                            <div className="admin-me-cta ">

                                <button onClick={handleModalCancel} className="cancel-btn">Cancel</button>

                                <button onClick={handleMeConfirm} className="confirm-btn">Confirm</button>

                                <button onClick={handleModalCancel} className="update-btn">Update</button>

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

            {/* STUDENT HEADER SECTION ENDS... */}

            {/* STUDENT BODY SECTION START... */}
            <section className="admin-body-section grid">

                <aside className="admin-aside-left">
                    {/* <h1>Left aside</h1> */}
                    <div className="aside-lists">
                        <ul>

                            <li onClick={handleAdminProfile}> Student Profile</li>

                            {/* <li onClick={navigateReportPage}>Attendance Report</li> */}




                            {/* <li>Attendance</li> */}
                            {/* <li>Courses</li> */}
                            {/* <li>Student Profile</li> */}

                            {showModal && (
                                <div className="modal-1">

                                    <main className="content">
                                        <FontAwesomeIcon className="modal-1_icon" onClick={handleAdminProfile} icon={faClose} />

                                        <div className="student-label-info flex flex-jc_sb">

                                            <div className="label-info-1">
                                                <label className="content-name label">
                                                    UserName:
                                                    <p>{authDetails?.userName}</p>
                                                </label>

                                                <label className="content-firstName label">
                                                    Firstname:
                                                    <p>{firstName}</p>
                                                </label>

                                                <label className="content-lastName label">
                                                    LastName:
                                                    <p>{lastName}</p>
                                                </label>

                                                <label className="content-email label">
                                                    Email:
                                                    <p>{authDetails?.email}</p>
                                                </label>

                                                <label className="content-gender label">
                                                    Gender:
                                                    <p>{gender}</p>
                                                </label>

                                                <label className="content-course label">
                                                    Course:
                                                    <p>{courses}</p>
                                                </label>

                                                <label className="content-phoneNo label">
                                                    Contact:
                                                    <p>{contact}</p>
                                                </label>
                                            </div>

                                            {/* PROFILE-SECTION-2 */}

                                            <div className="label-info-2">
                                                <label className="content-name label">
                                                    Guardian Contact:
                                                    <p>{guardianNum}</p>
                                                </label>
                                                <label className="content-email label">
                                                    Reg.No:
                                                    <p>{regNo}</p>
                                                </label>
                                                <label className="content-gender label">
                                                    Department:
                                                    <p>{department}</p>
                                                </label>
                                                <label className="content-role label">
                                                    Home Address:
                                                    <p>{homeAddress}</p>
                                                </label>
                                                <label className="content-course label">
                                                    second-contact:
                                                    <p>{secondContact}</p>
                                                </label>

                                                {/* <label className="content-phoneNo label">
                                                    Facial Recognition:
                                                    <p>adfSfgSDg</p>
                                                </label> */}
                                            </div>

                                        </div>

                                    </main>
                                </div>
                            )}

                        </ul>
                    </div>
                </aside>

                <main className="admin-main">
                    {/* <h1>Student-main</h1> */}
                    {/* <div className="analytics flex">
                        <div className="analy-1"></div>
                        <div className="analy-2"></div>
                    </div> */}
                    <div className="student-overall flex">
                        <div className="student-overall_img1">
                            <img src={process.env.PUBLIC_URL + '/assets/graduation-4474213_1280.png'} alt="student-profile" />
                        </div>
                        <div className="student-overall_img2">
                            <img src={process.env.PUBLIC_URL + '/assets/reading.png'} alt="reading" />
                        </div>

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

                {/* {<Report testDataOne={dataStuTest} />} */}

            </section>

            {/* <AdminDataContext.Provider value={validStudent}>
                {children}
            </AdminDataContext.Provider> */}

            {/* STUDENT BODY SECTION END... */}
        </div>
    )
}

export default StudentDashboard

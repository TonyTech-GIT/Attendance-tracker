import React from 'react'
import { useLocation } from 'react-router'

const IndividualStu = () => {
    const location = useLocation()
    const studentData = location.state?.studentData || null

    const attendanceRate = studentData ? studentData.attendanceRate.toFixed(2) + '%' : 'N/A'

    console.log(attendanceRate)
    console.log(studentData);
    return (
        <div>
            <h1>Individual Student Report</h1>

            <main className="student-report">
                <h2 className='header'>Student Report</h2>
                <p className='report-text'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia laudantium eum nisi itaque debitis voluptatibus asperiores explicabo ad maiores repellendus.</p>

                <form className='report-form'>
                    <div className="class-present-container flex">
                        <label>
                            Classes present

                        </label>
                        <label>
                            {/* {studentData && `${studentData}`} */}
                        </label>

                        {/* <input type="text" value={studentData?.firstName || ''} /> */}
                    </div>

                    <div className="class-absent-container flex">
                        <label >
                            Classes absent

                        </label>
                        <label>
                            {/* {studentData ? `${studentData}` : 'No data'} */}
                        </label>
                        {/* <input type="text" value={studentData?.firstName || ''} /> */}
                    </div>

                    <div className="attendance-rate-container flex">
                        <label >
                            Attendance Rate

                        </label>
                        <label>
                            {attendanceRate}
                        </label>
                        {/* <input type="text" value={studentData?.firstName || ''} /> */}
                    </div>


                    <div className="btn-container">
                        <button className='download-btn'>Download</button>
                        <button className='cancel-btn'>Cancel</button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default IndividualStu

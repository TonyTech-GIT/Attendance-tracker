import React, { useState } from 'react'

import { Link } from 'react-router-dom';

import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

const Report = () => {

    const [isLoading, setIsLoading] = useState(false)

    const [getStudentsData, setGetStudentsData] = useState(null)


    const testBtn = () => {

        setIsLoading(true)
        axios
            .get('http://localhost:5000/auth/studentReg')
            .then((res) => {
                console.log("data", res.data)

                const studentsWithValidCourse = res.data.filter(student => student.courses === "CSC 442")

                setGetStudentsData(studentsWithValidCourse)

                console.log('hyvyfyufy', getStudentsData)
                setIsLoading(false)

            })
            .catch((err) => {
                alert(`Error ${err}`)
            })


    }


    return (
        <section className='admin-report'>
            <h1>Report Page</h1>

            <header className='report-header'>Students Reports</header>

            <button className='reportBtn' onClick={testBtn}>
                Generate Students
            </button>

            <main className='student-list'>
                {/* function to map through list of students offering a course... */}
                {isLoading ? (
                    <p>Loading...</p>
                ) : getStudentsData?.length > 0 ? (
                    getStudentsData?.map((getStudentData, index) => (
                        <Link to={`/auth/admin/report/${getStudentData.firstName}`} className='student-links' key={index} >

                            <li className='student'>
                                <p><strong>FirstName:</strong> {getStudentData.firstName}</p>
                                <p><strong>Reg Number:</strong> {getStudentData.regNo}</p>
                                <p><strong>Course(s):</strong> {getStudentData.courses}</p>
                            </li>

                        </Link>
                    ))

                ) : (
                    <p>No student yet..</p>
                )}


            </main>
        </section>
    )
}

export default Report

import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom';

import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

const Report = () => {

    const [isLoading, setIsLoading] = useState(false)

    const [getStudentsData, setGetStudentsData] = useState()


    // Load data from local storage on component mount...
    useEffect(() => {
        const storedData = localStorage.getItem('studentsData')


        if (storedData) {

            setGetStudentsData(JSON.parse(storedData).students)



            const storedTimestamp = JSON.parse(storedData).timestamp
            const currentTime = new Date().getTime()
            const elapsedTime = currentTime - storedTimestamp


            const dateExpirationTime = 60 * 60 * 1000 // 1hour in milliseconds
            const remainingTime = dateExpirationTime - elapsedTime


            if (remainingTime > 0) {
                setTimeout(() => {
                    localStorage.removeItem('studentsData');
                    setGetStudentsData([]);
                }, remainingTime);
            } else {
                localStorage.removeItem('studentsData')
                setGetStudentsData([])
            }

        }

    }, [])


    const testBtn = () => {

        setIsLoading(true)
        axios
            .get('http://localhost:5000/auth/studentReg')
            .then((res) => {
                console.log("data", res.data)

                const studentsWithValidCourse = res.data.filter(student => student.courses === "CSC 442")

                setGetStudentsData(studentsWithValidCourse)

                const dataToStore = {
                    students: studentsWithValidCourse,
                    timestamp: new Date().getTime() // Stores the current timestamp
                }

                // Store data in local storage along with timestamp...
                localStorage.setItem('studentsData', JSON.stringify(dataToStore))

                console.log(dataToStore)

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
                        <Link to={
                            // `/auth/admin/report/${getStudentData.firstName}`

                            {
                                pathname: `/auth/admin/report/${getStudentData.firstName}`,
                                state: { studentData: getStudentData }
                            }
                        }
                            className='student-links'
                            key={index} >

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

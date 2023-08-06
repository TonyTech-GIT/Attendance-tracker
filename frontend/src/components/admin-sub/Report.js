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

                setGetStudentsData(res.data)

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
                        <Link to={`/auth/admin/report/${getStudentData._id}`} className='student-links' key={index} >

                            <li className='student'>
                                <h3>{getStudentData.firstName}</h3>
                                <p>{getStudentData.regNo}</p>
                            </li>

                        </Link>
                    ))

                ) : (
                    <p>No student yet..</p>
                )}

                {/* {studentsList.length === 0 ? (
                    <p>No Students Yet</p>
                ) : (
                    <>
                        {studentsList.map((studentsLi, index) => (
                            <Link to={`/auth/admin/report/${studentsLi.id}`} className='student-links' key={index} >

                                <li className='student'>
                                    <h3>{studentsLi.name}</h3>
                                    <p>{studentsLi.subject}</p>
                                </li>

                            </Link>
                        ))}


                    </>
                )} */}

            </main>
        </section>
    )
}

export default Report

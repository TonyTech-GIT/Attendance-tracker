import React from 'react'
// import { useState } from 'react';
import { useContext } from 'react'

import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom'
import AdminDataContext from '../AdminDataContext';

const Report = () => {
    const { validStudent } = useContext(AdminDataContext)

    // const studentsList = [
    //     {
    //         id: 1, name: "John Doe", subject: 'Math'
    //     },
    //     {
    //         id: 2, name: "Mark Bro", subject: "Science"
    //     }
    // ]


    return (
        <section className='admin-report'>
            <h1>Report Page</h1>

            <header className='report-header'>Students Reports</header>

            <main className='student-list'>
                {/* function to map through list of students offering a course... */}
                {validStudent?.length > 0 ? (
                    <p>No Students Yet</p>
                ) : (
                    <>
                        {validStudent?.map((validStu, index) => (
                            <Link to={`/auth/admin/report/${validStudent.id}`} className='student-links' key={index} >

                                <li className='student'>
                                    <h3>{validStu.userName}</h3>
                                    <p>{validStu.regNo}</p>
                                </li>

                            </Link>
                        ))}


                    </>
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

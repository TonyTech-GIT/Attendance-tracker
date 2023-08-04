import React, { useState } from 'react'

import { Link } from 'react-router-dom';

import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'
// import AdminDataContext from '../AdminDataContext';

const Report = ({ validStudentsReceived, testRun, testDataOne }) => {
    // const { validStudent } = useContext(AdminDataContext)

    const [loading, setLoading] = useState(true)


    const testBtn = () => {

        // console.log(validStudentsReceived)
        console.log('from report component', testDataOne);
        // console.log(testRun)
        // if (validStudentsReceived && validStudentsReceived?.length > 0) {
        //     setLoading(false)
        //     console.log(validStudentsReceived)

        // } else {
        //     console.log('hello world');
        // }
    }

    // console.log('useEffect student data', validStudentsReceived);



    useEffect(() => {
        // Check if data is received

        if (testDataOne) {
            // setLoading(false)
            console.log('useEffect student data', testDataOne);

        }

    }, [testDataOne]);

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

            <button onClick={testBtn}>
                Click me
            </button>

            <main className='student-list'>
                {/* function to map through list of students offering a course... */}
                {loading ? (
                    <p>Loading...</p>
                ) : validStudentsReceived?.length > 0 ? (
                    validStudentsReceived?.map((validStudentReceived, index) => (
                        <Link to={`/auth/admin/report/${validStudentReceived.id}`} className='student-links' key={index} >

                            <li className='student'>
                                <h3>{validStudentReceived.userName}</h3>
                                <p>{validStudentReceived.regNo}</p>
                            </li>

                        </Link>
                    ))
                    // <>

                    // </>
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

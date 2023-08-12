import { useState } from "react"
import axios from 'axios'

const Attendance = () => {

    const [studentLists, setStudentLists] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    // const [incrementStatus, setIncrementStatus] = useState([])
    // const [decrementStatus, setDecrementStatus] = useState([])



    const handleAttendanceList = () => {
        axios
            .get('http://localhost:5000/auth/studentReg')
            .then((res) => {
                const attendanceData = res.data.filter(student => student.courses === "CSC 442")

                setStudentLists(attendanceData)

                setIsLoading(false)

                console.log('students lists fetched', studentLists);
            })
            .catch((err) => {
                console.log('Error fetching students list', err);
                setIsLoading(false)
            })
    }

    const handleButtonPresent = (listIndex, studentIndex) => {
        // setIncrementPresent(incrementPresent + 1)
        setStudentLists(prevLists => {
            const updatedLists = [...prevLists];
            updatedLists[listIndex].students[studentIndex].presentCount++;

            return updatedLists
        })
    }

    const handleButtonAbsent = (listIndex, studentIndex) => {
        // setIncrementAbsent(incrementAbsent + 1)
        setStudentLists(prevLists => {
            const updatedLists = [...prevLists]
            updatedLists[listIndex].students[studentIndex].absentCount++;

            return updatedLists
        })
    }

    const handleResetButton = () => {
        // setIncrementPresent(0)

        // setIncrementAbsent(0)

        const resetLists = studentLists.map(studentList => ({
            ...studentList,
            students: studentList.student.map(student => ({
                ...student,
                presentCount: 0,
                absentCount: 0
            }))
        }))

        setStudentLists(resetLists)
    }


    return (
        <section className='attendance-section'>
            <h1>Where attendance is taken....</h1>

            <button className="attendance-btn" onClick={handleAttendanceList}>Generate Attendance</button>

            <main className="table-container">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    !isLoading && studentLists.length === 0 ? (<p>No attendance list yet...</p>
                    ) : (
                        <div>

                            <table >
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>RegNo</th>
                                        <th>Status</th>
                                        <th>Attendance</th>
                                        <th>Rate / Percentage</th>
                                    </tr>
                                </thead>

                                <tbody className='table-body'>
                                    {studentLists.map((studentList, index) => (

                                        <tr key={index}>
                                            {/* <td>{studentList.id}</td> */}
                                            <td>{index + 1}</td>
                                            <td>{studentList.firstName}</td>
                                            <td>{studentList.lastName}</td>
                                            <td>{studentList.regNo}</td>
                                            <td>
                                                <button onClick={handleButtonPresent}>Present</button>
                                                <button onClick={handleButtonAbsent}>Absent</button>
                                                <button onClick={handleResetButton}>Reset</button>
                                            </td>
                                            <td><b>Present:</b> <span>{studentList.students[index].presentCount}</span> <b>Absent:</b> <span>{studentList.students[index].presentCount}</span> </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    )

                )}

            </main>

        </section>
    )
}

export default Attendance

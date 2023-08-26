import { useState, useEffect } from "react"
import axios from 'axios'

const Attendance = () => {

    const [studentLists, setStudentLists] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [selectedStudentIndex, setSelectedStudentIndex] = useState(null)


    // Load data from local storage on component mount...
    useEffect(() => {
        const storedData = localStorage.getItem('attendanceData')


        if (storedData) {

            setStudentLists(JSON.parse(storedData).students)



            const storedTimestamp = JSON.parse(storedData).timestamp
            const currentTime = new Date().getTime()
            const elapsedTime = currentTime - storedTimestamp


            const dateExpirationTime = 60 * 60 * 1000 // 1hour in milliseconds
            const remainingTime = dateExpirationTime - elapsedTime


            if (remainingTime > 0) {
                setTimeout(() => {
                    localStorage.removeItem('studentsData');
                    setStudentLists([]);
                }, remainingTime);
            } else {
                localStorage.removeItem('studentsData')
                setStudentLists([])
            }

        }

    }, [])


    const handleAttendanceList = () => {

        setIsLoading(true)
        axios
            .get('http://localhost:5000/auth/studentReg')
            .then((res) => {
                const attendanceData = res.data.filter(student => student.courses === "CSC 442")

                const studentsWithAttendance = attendanceData.map(studentWithAttendance => ({
                    ...studentWithAttendance,
                    presentCount: 0,
                    absentCount: 0,
                    attendanceRate: 0 // Start with 0
                }))

                setStudentLists(studentsWithAttendance)

                const dataToStore = {
                    students: studentsWithAttendance,
                    timestamp: new Date().getTime() // Stores the current timestamp
                }

                // Store data in local storage along with timestamp...
                localStorage.setItem('attendanceData', JSON.stringify(dataToStore))

                console.log(dataToStore)

                setIsLoading(false)

                console.log('students lists fetched', studentsWithAttendance);
            })
            .catch((err) => {
                console.log('Error fetching students list', err);
                // setIsLoading(false)
            })
    }

    const handleButtonPresent = (studentIndex) => {
        setStudentLists(prevLists => {
            const updatedLists = [...prevLists];
            updatedLists[studentIndex].presentCount++;
            updatedLists[studentIndex].attendanceRate = calcAveragePercentage(
                updatedLists[studentIndex].presentCount,
                updatedLists[studentIndex].absentCount,
                5
            );


            return updatedLists
        })

    }

    const handleButtonAbsent = (studentIndex) => {
        setStudentLists(prevLists => {
            const updatedLists = [...prevLists]
            updatedLists[studentIndex].absentCount++;
            updatedLists[studentIndex].attendanceRate = calcAveragePercentage(
                updatedLists[studentIndex].presentCount++,
                updatedLists[studentIndex].absentCount++,
                5 // Assuming 5 days

            );


            return updatedLists
        })
    }

    const handleResetButton = (studentIndex) => {

        setStudentLists(prevLists => {
            const updatedLists = [...prevLists]
            updatedLists[studentIndex].presentCount = 0;
            updatedLists[studentIndex].absentCount = 0;
            updatedLists[studentIndex].attendanceRate = 0;


            return updatedLists
        })


    }

    const calcAveragePercentage = (presentCount, absentCount, totalDays) => {
        const totalClasses = presentCount + absentCount;

        return (presentCount / totalClasses) * 100;
    }


    return (
        <section className='attendance-section'>
            <h1>Where attendance is taken....</h1>

            <button className="attendance-btn" onClick={handleAttendanceList}>Generate Attendance</button>

            <main className="table-container">
                {isLoading ? (
                    <p>Loading...</p>
                ) : !isLoading && studentLists.length === 0 ? (
                    <p>No attendance list yet...</p>
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
                                            <button onClick={() => handleButtonPresent(index)}>Present</button>
                                            <button onClick={() => handleButtonAbsent(index)}>Absent</button>
                                            <button onClick={() => handleResetButton(index)}>Reset</button>
                                        </td>
                                        <td><b>Present:</b> <span>{studentList.presentCount}</span> <b>Absent:</b> <span>{studentList.absentCount}</span> </td>
                                        <td>{selectedStudentIndex === index && <>
                                            {calcAveragePercentage(
                                                studentList.presentCount,
                                                studentList.absentCount,
                                                5 // Assuming 5 days
                                            ).toFixed(2)}
                                            % </>}

                                        </td>
                                        <button className="atn-btn" onClick={() => setSelectedStudentIndex(index)}>Get Rate</button>



                                        {/* <>{selectedStudentIndex === index ? (
                                                <td>
                                                    {calcAveragePercentage(
                                                        studentList.presentCount,
                                                        studentList.absentCount,
                                                        5 // Assuming 5 days
                                                    ).toFixed(2)}
                                                    %
                                                </td>
                                            ) : (
                                                <button className="atn-btn" onClick={() => setSelectedStudentIndex(index)}>Get Rate</button>
                                            )}</> */}

                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>


                )}

            </main>

        </section>
    )
}

export default Attendance

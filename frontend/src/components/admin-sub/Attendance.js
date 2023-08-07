
const Attendance = () => {
    return (
        <section className='attendance-section'>
            <h1>Where attendance is taken....</h1>

            <main className="table-container">
                <table >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>RegNo</th>
                            <th>Attendance</th>
                            <th>Rate of Attendance</th>
                        </tr>
                    </thead>

                    <tbody className='table-body'>
                        <tr>
                            <td>1</td>
                            <td>John</td>
                            <td>Doe</td>
                            <td>18/CMP/100234</td>
                            <td>
                                <button>Present</button>
                                <button>Absent</button>
                            </td>
                            <td>
                                <label><b>Present:</b></label> <span>0</span> <label><b>Absent:</b></label> <span>0</span>
                            </td>

                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Amy</td>
                            <td>Raquel</td>
                            <td>18/STAT/103021</td>
                            <td>
                                <button>Present</button>
                                <button>Absent</button>
                            </td>
                            <td>
                                <label><b>Present:</b></label> <span>0</span> <label><b>Absent:</b></label> <span>0</span>
                            </td>
                        </tr>
                    </tbody>


                </table>
            </main>

        </section>
    )
}

export default Attendance

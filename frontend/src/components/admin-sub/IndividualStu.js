import React, { useEffect } from 'react'
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer'

const IndividualStu = ({ attendanceReceived }) => {

    // const attendanceRate = studentData ? studentData.attendanceRate.toFixed(2) + '%' : 'N/A'

    const AttendanceReportPDF = ({ attendanceReceived }) => {
        return (
            <Document style={{ margin: '0 auto' }}>
                <Page size="A4">
                    <Text>Attendance Report</Text>
                    <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia laudantium eum nisi itaque debitis voluptatibus asperiores explicabo ad maiores repellendus.</Text>
                    <Text>Attendance: {attendanceReceived}</Text>
                </Page>
            </Document>
        );
    };

    useEffect(() => {
        console.log(attendanceReceived)
    }, [attendanceReceived])

    // console.log(attendanceRate)
    // console.log(studentData);
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
                        <label className='atn-value'>
                            {attendanceReceived}
                        </label>
                        {/* <input type="text" value={studentData?.firstName || ''} /> */}
                    </div>


                    <div className="btn-container">
                        <button className='download-btn'>

                            <PDFDownloadLink
                                document={<AttendanceReportPDF attendanceReceived={attendanceReceived} />}
                                fileName="attendance_report.pdf"
                                style={{ textDecoration: 'none', color: '#000' }}
                            >
                                {({ blob, url, loading, error }) =>
                                    loading ? 'Loading document...' : 'Download PDF'
                                }
                            </PDFDownloadLink>
                        </button>


                        <button className='cancel-btn'>Cancel</button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default IndividualStu

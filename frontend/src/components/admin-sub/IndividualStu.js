import React, { useEffect, useState } from 'react'
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer'
import axios from 'axios';
import { useNavigate } from 'react-router';

const IndividualStu = ({ attendanceReceived, presentReceived, absentReceived, testValidStu }) => {

    const navigate = useNavigate()

    const [detailStu, setDetailStu] = useState()


    const firstName = testValidStu.firstName

    const regNo = testValidStu.regNo

    console.log('stu firstName', firstName);
    console.log('stu regNo', regNo);



    const AttendanceReportPDF = ({ attendanceReceived, firstName, regNo }) => {
        return (
            <Document >
                <Page size="A4" style={{ padding: '0 16px' }}>
                    <Text style={{ textAlign: 'center', padding: '16px 0 16px 0', fontSize: '20px', fontWeight: 'bold' }}>Attendance Report</Text>
                    <Text style={{ padding: '16px 12.8px', fontSize: '16px' }}>This is an attendance report of the student,<Text style={{ fontWeight: 'bold' }}>{firstName}</Text>, with the registration number,<Text style={{ fontWeight: 'bold' }}>{regNo}</Text> based on the attendance to class calculated on the average of five working days from Monday to Friday. The The students rate of attendance is as stated below:</Text>
                    <Text style={{ fontWeight: 'bold' }}>Classes Present: {presentReceived}</Text>
                    <Text style={{ margin: '16px 0 16px 0', fontWeight: 'bold' }}>Classes Absent: {absentReceived}</Text>
                    <Text style={{ fontWeight: 'bold' }}>Attendance Report: {attendanceReceived}%</Text>
                </Page>
            </Document>
        );
    };

    useEffect(() => {

        axios
            .get('http://localhost:5000/auth/studentReg')
            .then((res) => {


                const details = res.data.filter(student => student.courses === "CSC 442")
                console.log(details)

                setDetailStu(details)

                console.log('hbvyvhvivib', detailStu)


            })
            .catch((err) => {
                console.log('Student detail request failed', err);
                // alert('Student detail request failed', err);
            })

        console.log(attendanceReceived)
        console.log('present value', presentReceived);
        console.log('absent value', absentReceived);


    }, [attendanceReceived, presentReceived, absentReceived, detailStu])


    return (
        <div>
            <h1>Individual Student Report</h1>

            <main className="student-report">
                <h2 className='header'>Student Report</h2>
                <p className='report-text'>This is an attendance report of the student, <b>{firstName}</b> with the registration number,<b>{regNo}</b>, based on the attendance to class calculated on the average of five working days from Monday to Friday. The The students rate of attendance is as stated below:</p>


                <form className='report-form'>
                    <div className="class-present-container flex">
                        <label className='present-label'>
                            Classes present

                        </label>
                        <label>
                            <strong>
                                {presentReceived}

                            </strong>
                        </label>

                    </div>

                    <div className="class-absent-container flex">
                        <label className='absent-label'>
                            Classes absent

                        </label>
                        <label>
                            <strong>
                                {absentReceived}

                            </strong>
                        </label>

                    </div>

                    <div className="attendance-rate-container flex">
                        <label >
                            Attendance Rate

                        </label>
                        <label className='atn-value'>
                            <strong>
                                {attendanceReceived}%

                            </strong>
                        </label>

                    </div>


                    <div className="btn-container">
                        <button className='download-btn'>

                            <PDFDownloadLink
                                document={<AttendanceReportPDF attendanceReceived={attendanceReceived}
                                    firstName={firstName}
                                    regNo={regNo} />}
                                fileName="attendance_report.pdf"
                                style={{ textDecoration: 'none', color: '#000' }}
                            >
                                {({ blob, url, loading, error }) =>
                                    loading ? 'Loading document...' : 'Download PDF'
                                }
                            </PDFDownloadLink>
                        </button>


                        <button className='cancel-btn' onClick={() => {
                            navigate('/auth/admin/attendance')
                        }}>Cancel</button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default IndividualStu

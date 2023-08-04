import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Auth from './components/Auth'
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'
import Report from './components/admin-sub/Report';
import StudentDashboard from './components/StudentDashboard'
import IndividualStu from './components/admin-sub/IndividualStu';
import { useState } from 'react';
// import { AdminDataProvider } from './components/AdminDataContext';

const App = () => {
  // to set and update data received from the authorization page...

  const [dataFromAuth, setDataFromAuth] = useState(null)


  const [validStudent, setValidStudent] = useState([])

  // function passed as a prop to auth component and handles the data gotten from it...
  const handleDataForStudent = (data) => {
    setDataFromAuth(data)
  }

  // function to handle student data sent to admin dashboard...
  const handleValidStudent = (data) => {
    setValidStudent(data)

    // console.log('from app component', validStudent)

  }

  const testText = 'testing something'


  return (

    <div className="App">
      <Router>

        <Routes>
          <Route path='/' element={<Welcome />} />

          <Route path='/auth' element={<Auth dataReceived={handleDataForStudent} />} />

          <Route path='/login' element={<Login dataReceived={handleDataForStudent} />} />

          <Route path='/auth/admin' element={<AdminDashboard authDetails={dataFromAuth} />} />
          <Route path='/auth/admin/report' element={<Report validStudentsReceived={validStudent} testRun={testText} />} />
          <Route path={`/auth/admin/report/:studentId`} element={<IndividualStu />} />

          <Route path='/auth/student' element={<StudentDashboard authDetails={dataFromAuth} validStudentData={handleValidStudent} />} />
        </Routes>
      </Router>
    </div>
    // <AdminDataProvider>

    // </AdminDataProvider>

  );
}

export default App;

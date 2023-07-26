import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Auth from './components/Auth'
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'
import Report from './components/admin-sub/Report';
import StudentDashboard from './components/StudentDashboard'
import IndividualStu from './components/admin-sub/IndividualStu';
import { useState } from 'react';

const App = () => {
  // to set and update data received from the authorization page...

  const [dataFromAuth, setDataFromAuth] = useState(null)

  // function passed as a prop to auth component and handles the data gotten from it...
  const handleDataForStudent = (data) => {

    setDataFromAuth(data)

  }


  return (
    <div className="App">
      <Router>

        <Routes>
          <Route path='/' element={<Welcome />} />

          <Route path='/auth' element={<Auth dataReceived={handleDataForStudent} />} />

<<<<<<< HEAD
          <Route path='/login' element={<Login dataReceived={handleDataForStudent} />} />
=======
          <Route path='/login' element={<Login />} />
>>>>>>> 1c5cab29bfee434c0d08399954ab7abe896dc0af

          <Route path='/auth/admin' element={<AdminDashboard />} />
          <Route path='/auth/admin/report' element={<Report />} />
          <Route path={`/auth/admin/report/:studentId`} element={<IndividualStu />} />

          <Route path='/auth/student' element={<StudentDashboard authDetails={dataFromAuth} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

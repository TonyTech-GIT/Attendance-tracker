import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [studentData, setStudentData] = useState({
        userName: '',
        email: '',
        password: '',
        role: '',
    })

<<<<<<< HEAD


    return (
        <>
            <AuthContext.Provider value={{ studentData, setStudentData }}>
                {children}
            </AuthContext.Provider>

            <p>hello we are testing out something here....deleting this s</p>


        </>

=======
    return (
        <AuthContext.Provider value={{ studentData, setStudentData }}>
            {children}
        </AuthContext.Provider>
>>>>>>> 1c5cab29bfee434c0d08399954ab7abe896dc0af
    )
}

export { AuthContext, AuthProvider }

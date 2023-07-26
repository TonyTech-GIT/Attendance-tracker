import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [studentData, setStudentData] = useState({
        userName: '',
        email: '',
        password: '',
        role: '',
    })



    return (
        <>
            <AuthContext.Provider value={{ studentData, setStudentData }}>
                {children}
            </AuthContext.Provider>

            <p>hello we are testing out something here....deleting this s</p>


        </>

    )
}

export { AuthContext, AuthProvider }

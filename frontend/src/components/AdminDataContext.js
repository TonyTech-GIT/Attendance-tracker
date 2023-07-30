import { createContext, useState } from 'react'

const AdminDataContext = createContext();

export const AdminDataProvider = ({ children }) => {
    const [validStudent, setValidStudent] = useState([])

    return (
        <AdminDataContext.Provider value={{ validStudent, setValidStudent }}>
            {children}
        </AdminDataContext.Provider>
    );
};


export default AdminDataContext;
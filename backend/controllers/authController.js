// import Admin from '../models/admin.js';
// import Student from '../models/student.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import User from '../models/user.js';
import asyncHandler from 'express-async-handler';


// @desc get users either admin or student...
// @route GET /auth
// @access private
const getAuthorizedUser = async (req, res) => {
    // get user...
    const user = await User.find()

    if (!user) {
        res.status(400).json({ message: 'user does not exist' })
    }

    if (user) {
        res.status(200).json(user)
    }
}


// @desc create Admin or student
// @route POST /auth
// @access private
const authorizeUser = async (req, res) => {
    // Retrieve user data...
    const { id, userName, email, password, role } = req.body

    // check if all fields are entered...
    if (!userName || !email || !password || !role) {
        res.status(400).json({ message: 'All fields are required!' })
    }


    // Check for duplicate...
    const duplicateUser = await User.findOne({ email })
    if (duplicateUser) {
        res.status(401).json({ message: 'user already exists!' })
        return;
    }

    // Hash passwords...
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const userToken = jwtToken(id)

    // Creating user...
    const user = await User.create({
        _id: id,
        userName,
        email,
        password: hashPassword,
        role,
        token: userToken
    })



    // Check if user is admin or student

    if (req.body.role === 'admin') {
        res.status(200).json(user)
    } else {
        res.status(200).json(user)
    }

}

// @desc login user weather admin or student
// @route POST /auth/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    // Check if all input fields have data...
    const { email, password } = req.body

    // if (!email || !password) {
    //     res.status(400).json({ message: 'all fields are required' })
    // }

    // Find email from User Schema...
    const user = await User.findOne({ email })


    // If an email is found from database...
    if (user) {

        // to compare inputted password and the one in database...
        let authMatch = await bcrypt.compare(password, user.password)


        // Check if password is empty...
        if (!password) {
            res.status(401).json({ message: "Please enter a password..." })
        } else {
            // confirm if password has a value...
            if (password !== undefined) {

                // check if there is an email and if the passwords match together
                if (user && authMatch) {
                    res.status(200).json({
                        _id: user.id,
                        email,
                        password,
                        role: user.role,
                        token: jwtToken(user.id)
                    })
                } else {
                    res.status(400).json({ message: 'Invalid password!' })
                }

            }
        }

    } else {
        res.status(400).json({ message: "user does not exist" })
    }

})



// @desc Update authorized student profile with data from USER model...
// @route PUT /auth/student/:id
// @access public
// const updateStudentProfile = async (req, res) => {
//     const stu = await User.findById(req.params.id)

//     if (!stu) {
//         res.status(400)
//         throw new Error('No student found yet!')
//     }

//     const authUpdate = await User.findByIdAndUpdate(req.params.id, req.body, {
//         new: true
//     })

//     res.status(200).json(authUpdate)
// }

// @desc Delete Student Profile
// @route PUT /auth/student/:id
// @access private
// const deleteAuthStudent = asyncHandler(async (req, res) => {
//     const stu = await User.findById(req.params.id)

//     if (!stu) {
//         res.status(400).json({ message: 'No student found yet!' })
//         // throw new Error('No student found yet!')
//     }

//     await stu.deleteOne()

//     res.status(200).json({ message: `Student ${req.params.id} deleted` })
// })



// @desc get personal user data...
// route GET auth/me
// access private...
const getUser = asyncHandler(async (req, res) => {
    // const user = await User.find({ role: { $in: ['students', 'admins'] } })

    const user = req.user;

    if (user.role === 'admin') {
        res.status(200).json({ message: 'admin', user })
    } else {
        res.status(200).json({ message: 'student', user })
    }

})

// @desc testing purposes...
// @route POST /test
// @access public
// const test = (req, res) => {
//     const { email } = req.body
//     if (email) {
//         res.status(200).json({ message: 'valid email' })
//     } else {
//         throw new Error("Invalid Email")
//     }
// }


// JWT implementation...
const jwtToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        })
}

// @desc authorized Admin dashboard
// @route POST /auth/admin
// @access private
// const authenticateAdmin = asyncHandler(async (req, res) => {


//     res.status(200).json({ message: 'authorize admin' })

// })

// @desc authorized Student dashboard
// @route POST /auth/student
// @access private
// const authenticateStudent = asyncHandler(async (req, res) => {
//     res.status(200).json({ message: 'authorize student' })
// })


export {
    getAuthorizedUser,
    authorizeUser,
    loginUser,
    // updateStudentProfile,
    // deleteAuthStudent,
    getUser,
    // test,
    // authenticateAdmin,
    // authenticateStudent
}

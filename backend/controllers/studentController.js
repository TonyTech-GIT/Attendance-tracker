import Student from '../models/student.js'
import asyncHandler from 'express-async-handler'

// @desc GET list of student
// @route GET /auth/studentReg
// @access private
const getStudent = asyncHandler(async (req, res) => {

    const findStudent = await Student.find()

    if (!findStudent) {
        return res.status(400).json({ message: 'No students found' })
    } else {
        res.status(200).json(findStudent)
    }

})



// @desc POST create student
// @route POST /auth/studentReg
// @access private
const createStudent = asyncHandler(async (req, res) => {
    const { firstName, lastName, gender, courses, contact, guardianNum, regNo, department, homeAddress, secondContact } = req.body;

    // Check if all fields are entered...
    if (!firstName || !lastName || !gender || !courses || !contact || !guardianNum || !regNo || !department || !homeAddress || !secondContact) {
        return res.status(400).json({ message: 'Please provide all required fields' })
    }

    // Check for valid Reg Numbers...
    const validRegNo = /^[A-Z]{3,4}\/\d{2}\/\d{6}$/
    if (!validRegNo) {
        return res.status(400).json({ message: 'Invalid Registration number format!' })
    }

    // Check for duplicate reg numbers...
    const duplicateRegNo = await Student.findOne({ regNo })
    if (duplicateRegNo) {
        return res.status(400).json({ message: 'Student already exists!' })
    }

    // Check for phoneNumber match...
    const regexContact = /^(?:\+234|0)\d{10}$/;
    if (!regexContact.test(contact) || !regexContact.test(guardianNum) || !regexContact.test(secondContact)) {
        return res.status(400).json({ message: 'Please enter a valid Phone Number!' })
    }


    // Creating student...
    const student = await Student.create({
        firstName,
        lastName,
        gender,
        courses,
        contact,
        guardianNum,
        regNo,
        department,
        homeAddress,
        secondContact
    })

    res.status(200).json(student)

    // res.status(200).json({ message: 'created student' })
})




// @desc PUT update student profile with data from STUDENT model..you cant update what you haven't created
// @route PUT /auth/studentReg/:id
// @access public
const updateStudent = asyncHandler(async (req, res) => {

    const Stu = await Student.findById(req.params.id)

    if (!Stu) {
        res.status(400).json({ message: 'No student found!' })
        // throw new Error('No student found!')
    }

    const updatedStu = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatedStu)

    // res.status(200).json({ message: `Student ${req.params.id} updated` })
})


// @desc DELETE delete student
// @route DELETE /auth/studentReg/:id
// @access private
const deleteStudent = asyncHandler(async (req, res) => {

    const stu = await Student.findById(req.params.id)

    if (!stu) {
        res.status(400).json({ message: 'No student to delete' })
    } else {
        await Student.deleteOne({ _id: req.params.id })

        res.status(200).json({ message: `Student ${req.params.id} deleted` })
    }


})

export {
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
}
import Admin from '../models/admin.js'
import asyncHandler from 'express-async-handler'
import { v4 as uuidv4 } from 'uuid';


// @desc GET list of admins
// @route GET /admin
// @access private
const getAdmin = asyncHandler(async (req, res) => {

    const findAdmin = await Admin.find()

    if (!findAdmin) {
        return res.status(400).json({ message: 'No admins found' })
    } else {
        res.status(200).json(findAdmin)
    }

    // res.status(200).json({ message: 'get admin' })
})


// @desc POST create admin
// @route POST /admin
// @access private
const createAdmin = asyncHandler(async (req, res) => {
    const { firstName, lastName, gender, courses, contact, regNo } = req.body;

    // Check if all fields are entered...
    if (!firstName || !lastName || !gender || !courses || !contact || !regNo) {
        return res.status(400).json({ message: 'Please provide all required fields' })
    }


    // Check for duplicate reg numbers...
    const duplicateRegNo = await Admin.findOne({ regNo })
    if (duplicateRegNo) {
        return res.status(400).json({ message: 'Admin already exists!' })
    }

    // Check for phoneNumber match...
    // const regexContact = /^(?:\+234|0)\d{10}$/;
    // if (!regexContact.test(contact) || !regexContact.test(guardianNum) || !regexContact.test(secondContact)) {
    //     return res.status(400).json({ message: 'Please enter a valid Phone Number!' })
    // }

    // Generate a unique UUID for the admin
    const employeeId = uuidv4().slice(0, 6);


    // Creating student...
    const admin = await Admin.create({
        firstName,
        lastName,
        gender,
        courses,
        contact,
        regNo,
        employeeId
    })

    res.status(200).json({ admin, employeeId })
    // res.status(200).json({ message: 'create admin' })
})


// @desc PUT update admins
// @route PUT /admins/:id
// @access public
const updateAdmin = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.params.id)

    if (!admin) {
        res.status(400).json({ message: 'No admin found!' })
        // throw new Error('No student found!')
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatedAdmin)
    // res.status(200).json({ message: `update admin ${req.params.id}` })
})


// @desc DELETE admins
// @route DELETE /admins/:id
// @access private
const deleteAdmin = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.params.id)

    if (!admin) {
        res.status(400).json({ message: 'No admin to delete' })
    } else {
        await Admin.deleteOne({ _id: req.params.id })

        res.status(200).json({ message: `Admin ${req.params.id} deleted` })
    }
    // res.status(200).json({ message: `delete admin ${req.params.id} ` })
})

export {
    getAdmin,
    createAdmin,
    updateAdmin,
    deleteAdmin
}
import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    courses: {
        type: String,
        enum: ['CSC 442', 'CSC 433', 'CSC 414'],
        required: true
    },
    contact: {
        type: Number,
        minlength: [9],
        maxlength: [11],
        match: /^(?:\+234|0)\d{10}$/
    },
    guardianNum: {
        type: Number,
        minlength: [9],
        maxlength: [11],
        required: true,
        match: /^(?:\+234|0)\d{10}$/
    },
    regNo: {
        type: String,
        required: true,
        unique: true,
        match: /^[A-Z]{3,4}\/\d{2}\/\d{1,6}$/
    },
    department: {
        type: String,
        required: true,
    },
    homeAddress: {
        type: String
    },
    secondContact: {
        type: Number,
        minlength: [9],
        maxlength: [11],
        match: /^(?:\+234|0)\d{10}$/

    }

})

const Student = mongoose.model('Student', studentSchema)

export default Student;
import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
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
        type: [String],
        enum: ['CSC 442', 'CSC 433', 'CSC 414'],
        required: true
    },
    contact: {
        type: Number,
        minlength: [9],
        maxlength: [11],
        match: /^(?:\+234|0)\d{10}$/
        // validate(value),
        // if (!/^[0-9]+$/.test(value)) throw new Error("Contact")
    },
    regNo: {
        type: String,
        required: true,
        unique: true,
        match: /^LECT\/\d{2}\/\d{1,6}$/
    }
})

const Admin = mongoose.model('Admin', adminSchema)

export default Admin
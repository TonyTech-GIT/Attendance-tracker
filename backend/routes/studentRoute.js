import express from 'express';
import { getStudent, createStudent, updateStudent, deleteStudent } from '../controllers/studentController.js';

const router = express.Router();

router.route('/').get(getStudent).post(createStudent)

router.route('/:id').put(updateStudent).delete(deleteStudent)


export default router;
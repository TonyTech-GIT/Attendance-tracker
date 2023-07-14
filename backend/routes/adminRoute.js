import express from 'express';
import { getAdmin, createAdmin, updateAdmin, deleteAdmin } from '../controllers/adminController.js';
const router = express.Router();


router.route('/').get(getAdmin).post(createAdmin)

router.route('/:id').put(updateAdmin).delete(deleteAdmin)


export default router;
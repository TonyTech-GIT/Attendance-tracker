import express from 'express'
import { getAuthorizedUser, authorizeUser, loginUser, getUser } from '../controllers/authController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the App!' })
})

// After clicking Get Started button!
// GET request is just for testing purposes for now...
router.route('/auth').get(getAuthorizedUser).post(authorizeUser)

// Login page
router.route('/auth/login').post(loginUser)

// Profile page...
router.route('/auth/me').get(protect, getUser)



// Update and Delete student profile...
// router.route('/auth/student/:id').put(updateStudentProfile).delete(deleteAuthStudent)

// to authorize admin to dashboard
// router.post('/auth/admin', authenticateAdmin)

// to authorize student to dashboard
// router.post('/auth/student', authenticateStudent)

// router.post('/test', test)



export default router;
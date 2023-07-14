// import Admin from '../models/admin'

// @desc GET list of admins
// @route GET /admin
// @access private
const getAdmin = (req, res) => {
    res.status(200).json({ message: 'get admin' })
}


// @desc POST create admin
// @route POST /admin
// @access private
const createAdmin = (req, res) => {
    res.status(200).json({ message: 'create admin' })
}


// @desc PUT update admins
// @route PUT /admins/:id
// @access public
const updateAdmin = (req, res) => {
    res.status(200).json({ message: `update admin ${req.params.id}` })
}


// @desc DELETE admins
// @route DELETE /admins/:id
// @access private
const deleteAdmin = (req, res) => {
    res.status(200).json({ message: `delete admin ${req.params.id} ` })
}

export {
    getAdmin,
    createAdmin,
    updateAdmin,
    deleteAdmin
}
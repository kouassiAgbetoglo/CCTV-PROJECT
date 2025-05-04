const router = express.Router();
const Users = require('../models/users.js');
const bcrypt = require('bcrypt');
const isAuthenticated = require('../Middleware/isAuthenticated.js');



// Modify password
router.post('/modification-password', isAuthenticated, (req, res) =>{
    
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Return if field missing
    if (!oldPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required"});
    };

    // Return if missmatch between newpassword and confirmpassword
    if (newPassword!==confirmPassword) {
        return res.status(400).json({ message: "Password mismatch"});
    };

})




module.exports = router;
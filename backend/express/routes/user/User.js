const express = require('express');
const router = express.Router();
const Register = require('../../models/user/Register');
const Login = require('../../models/user/Login');


router.post('/login', async(req, res)=>{
    const { userName, password } = req.body;

    const checkRegister = await Register.findOne({ userName, password });
    if(checkRegister){

        res.json({ success: true, message: 'Login successful', userId: checkRegister._id  });
    } else {
        res.json({ success: false, message: 'Invalid username or password' });
    }
      
})

router.post('/register', async(req, res)=>{
    const { userName, password, email } = req.body;

    const existingUser = await Register.findOne({ userName });  
    if(existingUser){
        return res.json({ success: false, message: 'User already exists' });
    }
    const newUser = new Register({ userName, password, email });
    await newUser.save();
    res.json({ success: true, message: 'Registration successful', userName: newUser.userName, userId: newUser._id  });

})

module.exports = router;
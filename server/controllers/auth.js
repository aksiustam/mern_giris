const AuthSchema = require('../models/auth.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const register = async(req,res) => {
    try {

        const {username, password,email} = req.body;
        
        const user = await AuthSchema.findOne({email : email});
        
        if(user){
            return res.status(500).json({msg: "Böyle bir kullanıcı zaten var!!"})
        }

        if(password.length < 6){
            return res.status(500).json({msg: "Şifreniz 6 karakterden küçük olmamalı!!"})
        }

        const passwordHash = await bcrypt.hash(password,12);

        if(!isEmail(email))
        {
            return res.status(500).json({msg: "Email formatı dışında birşeyler girdiniz..."})

        }

        const newUser = await AuthSchema.create({username,email,password:passwordHash})

        const token = jwt.sign({id: newUser._id}, "3SKxlMpOJm2de7j0kL69PfICxqDaJw4vS3fY6uxhlgqLMScEluozZ077lzSC87k",{expiresIn:'1h'})
    
        res.status(201).json({
            status: "OK",
            newUser,
            token
        })
    
    } catch (error) {
        return res.status(500).json({msg: error.message})
        
    }
}

const login = async(req,res) => {
    try {
        const {email,password} = req.body

        const user = await AuthSchema.findOne({email: email})

        if(!user){
            return res.status(500).json({msg: "Böyle bir kullanıcı bulunamadı!!"})
        }

        const passwordCompare = await bcrypt.compare(password,user.password)
        
        if(!passwordCompare)
        {
            return res.status(500).json({msg: "Girilen şifre yanlış!!"})
        }

        const token = jwt.sign({id: user._id}, "3SKxlMpOJm2de7j0kL69PfICxqDaJw4vS3fY6uxhlgqLMScEluozZ077lzSC87k",{expiresIn:'1h'})
    
        res.status(200).json({
            status: "OK",
            user,
            token
        })

    } catch (error) {
        return res.status(500).json({msg: error.message})
        
    }
}

function isEmail(emailAdress) 
{
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(emailAdress.match(regex))
        return true;
    else
        return false;
}
module.exports = {register,login}
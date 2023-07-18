const {User}=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const {SECRET_KEY}=process.env;



const login=async(req,res)=>
{
    try
    {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user)
        {
            return res.status(401).send({message:"invalid email or password"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            return res.status(401).send({message:"invalid email or password"});
        }
        const token=jwt.sign({id:user._id},SECRET_KEY);
        res.status(200).send({data:user});
    }
    catch(error)
    {
        return res.status(500).send({message:"Internal Server Error"});
    }
};

module.exports=login;
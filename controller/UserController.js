const User = require("../model/Newuser")
const bcrypt = require('bcryptjs');
const Newuser = require("../model/Newuser");

exports.register =async (req,res)=> {
    try{
        // const username = req.body.username
        // const email = req.body.email

        //taking user infromation from frotend
        let {username, email, password} = req.body
        
        if(!username)
        {
            return res.status(401).send("username is required")
        }
        if(!email)
        {
            return res.status(401).send("email is required")
        }
        if(!password)
        {
            return res.status(401).send("password is required")
        }
        const userexit = await User.findOne({username})
        if(userexit){
            return res.status(401).send("Please Select Other UserName !")
        }
        //encrypt the password
        const newPassword = await bcrypt.hash(password,10)
        password = newPassword

        //store in database frotend information
        const user = await Newuser.create({username, email, password}) 
    
        user.password = undefined
        // give status to frontend
        res.status(201).json({
            sucess : true,
            message : "User Registration Scuessfully",
            user  
        })


    }catch(error)
    {
        console.log(error.message);

        res.status(201).send("Registration Failed !!!!!")
    }
}


exports.getInformation =async (req,res)=>
{
    try{
        //const {userid}=req.body
        const user = await Newuser.findById(req.params.id);
        
        res.status(201).json({
            sucess : true,
            message : "User Information getting Sucessfully",
            user  
        })
    }
    catch(error){
        console.log(error.message);

        res.status(201).send("No data !!!!!")
    }
}


exports.update =async (req,res)=>
{
    try{
        const {email}=req.body
        const data = {email:email} 
        const user = await Newuser.findByIdAndUpdate(req.params.id,data,{new:true});
        
        res.status(201).json({
            sucess : true,
            message : "User Information updated Sucessfully",
            user  
        })
    }
    catch(error){
        console.log(error.message);

        res.status(201).send("No data update !!!!!")
    }
}
exports.userdelete =async (req,res)=>
{
    try{
        const user = await Newuser.findByIdAndDelete(req.params.id);
        
        res.status(201).json({
            sucess : true,
            message : "User Information delete Sucessfully",
        })
    }
    catch(error){
        console.log(error.message);

        res.status(201).send("No delete !!!!!")
    }
}
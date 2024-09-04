import { Router } from 'express';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';


const router = Router();

// Register a new user
router.post('/register', async (req,res) => {
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let password = req.body.password;
    

    const record = await User.findOne({email:email});

    if(record){
        return res.status(400).send({
            message:"Email is already registered"
        })
    }
    else{
        const user = new User({
            name:name,
            email:email,
            phone:phone,
            password:password
        });
    
        const result = await user.save();

        //JWT Token

        const {_id} = await result.toJSON();
        const token = jwt.sign({_id:_id},"secret");
    
        res.cookie("jwt", token,{
            httpOnly:true,
            maxAge:24*60*60*1000,
        });
    
        res.send({
            message:"success",
        })
    }
});


router.post('/login', async (req,res) =>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(404).send({
            message:"User not Found",
        });
    }

    const isPasswordCorrect = (req.body.password === user.password);
    if(!isPasswordCorrect){
        return res.status(404).send({
            message:"Password is Incorrect",
        });
    }

    const token = jwt.sign({_id:user._id},"secret");

    res.cookie("jwt", token,{
        httpOnly:true,
        maxAge:24*60*60*1000,
    });

    res.send({
        message:"success",
    })
});

router.get("/user",async (req,res) =>{
    try{
        console.log("Cookies: ", req.cookies);
        const cookie = req.cookies['jwt'];
        const claims = jwt.verify(cookie,"secret");

        if(!claims){
            return res.status(401).send({
                message:"No token provided",
            });
        }

        const user = await User.findOne({_id:claims._id});

        const {password,...data} = await user.toJSON();

        res.send(data)
    }catch(err){
        return res.status(401).send({
            message:"Unauthenticated"
        });
    }
});

router.post('/logout',(req,res) =>{
    res.cookie("jwt","",{maxAge:0});

    res.send({
        message:"success",
    })
})


export default router;

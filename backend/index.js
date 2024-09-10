const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const dbConnect = require('./dbConnect');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const auth = require('./auth');
const User = require('./models/User');
const Complaint = require('./models/Complaint');

dbConnect();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`server is listening at http://localhost:${PORT}`);
});

app.post("/signup",async (req,res)=>{
    const {email , password, isAdmin} = req.body;
    try{
        const hashedpassword = await bcrypt.hash(password,10);
        const user = new User({
            email:email,
            password:hashedpassword,
            isAdmin:isAdmin
        })
        try{
            await user.save()
            res.status(200).send({
                message:`User(${email}) created successfully`,
                user
            })
        }catch{
            res.status(500).send({
                message:"Email already exists"
            })
        }
    }catch{
        res.status(500).send({
            message:"password not hashed properly"
        })
    }
})

app.post('/login', async (req, res) => {
    const { email, password, isAdmin } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "Email not found" });
        }
        if (typeof isAdmin !== 'undefined' && user.isAdmin !== isAdmin) {
            return res.status(403).send({ message: "Incorrect User Role" });
        }
        const passCheck = await bcrypt.compare(password, user.password);
        if (!passCheck) {
            return res.status(401).send({ message: "Incorrect password" });
        }

        const token = jwt.sign(
            { userId: user._id, userEmail: user.email },
            "TOKEN", 
            { expiresIn: "24h" }
        );

        console.log(`token : ${token}`);
        res.status(200).send({
            message: "Login successful",
            email: user.email,
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ message: "Server error" });
    }
});


app.get('/getuser',auth,async (req,res)=>{
    const user = await User.findOne({_id:req.user.userId})
    console.log(user)
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    res.status(200).send({
        user,
        message: "You are authorized to access"
    });
})

app.post('/raisecomplaint',auth,async (req,res)=>{
    console.log("this is from sever side /raisecomplaint  ")
    try{
        const newComplaint = new Complaint({
            user:req.user.userId,
            description:req.body.description,
        });
        await newComplaint.save();
        // const user = await User.findByIdAndUpdate(
        //     req.user.userId,
        //     { $push:{bookmarks:newComplaint._id}},
        //     {new:true}
        // );
        console.log(newComplaint);
        res.status(201).json(newComplaint);
    }catch(error){
        console.error('Error raising complaint:', error);
        res.status(500).json({ message: "Already raised a complaint", error: 'Internal Server Error' });
    }
})

app.get('/getcomplaints',async (req,res)=>{
    try {
        const complaints = await Complaint.find().populate('user','email');
        console.log(complaints);
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/getUsercomplaints',auth,async (req,res)=>{
    try {
        const userId = req.user.userId;
        const complaints = await Complaint.find({ user: userId }).populate('user', 'email');
        console.log(complaints);
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
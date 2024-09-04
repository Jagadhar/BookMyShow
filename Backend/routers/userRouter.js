import { Router } from 'express';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';


const router = Router();


// Register a new user
router.post('/register', async (req, res) => {
    const { name, email, phone, password } = req.body;
    try {
        const record = await User.findOne({ email: email });

        if (record) {
            return res.json({ success: false, message: "Email is already registered" })
        }

        const newUser = new User({
            name: name,
            email: email,
            phone: phone,
            password: password
        });

        const user = await newUser.save();

        const {_id} = await user.toJSON();
        const token = jwt.sign({_id:_id},process.env.JWT_SECRET);

        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "None",
            secure: true, // Ensure this if using HTTPS
        });

        res.json({ success: true, token, message: "Registration && Login successful" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not Found" })
        }

        const isPasswordCorrect = (password === user.password);
        if (!isPasswordCorrect) {
            return res.json({ success: false, message: "Password is Incorrect" })
        }

        
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);

        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "None",
            secure: true, // Ensure this if using HTTPS
        });

        res.json({ success: true, token, message: "Login successful" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
});

router.get("/user", async (req, res) => {
    try {
        console.log("Cookies: ", req.cookies);
        const cookie = req.cookies['jwt'];
        // Check if token exists
        if (!cookie) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        const claims = jwt.verify(cookie, process.env.JWT_SECRET);

        if (!claims) {
            return res.json({ success: false, message: "Unauthenticated" });
        }

        const user = await User.findOne({ _id: claims._id });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const { password, ...data } = await user.toJSON();

        res.send(data)
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.post('/logout', (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 });

    res.json({ success: true, message: "Logout successful" });
})


export default router;

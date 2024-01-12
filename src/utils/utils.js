import User from "../models/User.js";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken";



export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(404).json({
                success: false,
                message: "alerady exist",
            })
        }
        const hass = await bcrypt.hash(password, 10);

        user = await User.create({ name, email, password: hass });

        // 

        const token = Jwt.sign({ _id: user._id }, process.env.JWT_S);

        res.status(201).cookie("token", token, {
            httpOnly: true,
            maxAge: 5 * 60 * 1000,
            sameSite: process.env.NDE_PHASE === "devlp" ? "lax" : "none",
            secure: process.env.NDE_PHASE === "devlp" ? false : true
        }).json({
            success: true,
            message: "mission done",
        })

        // 
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }


}


export const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "wrong details"
            });
        }

        const isMtch = await bcrypt.compare(password, user.password);

        if (!isMtch)
            return res.status(404).json({
                success: false,
                message: "wrong details"
            });


        const token = Jwt.sign({ _id: user._id }, process.env.JWT_S);

        res.status(201).cookie("token", token, {
            httpOnly: true,
            maxAge: 5 * 60 * 1000,
            sameSite: process.env.NDE_PHASE === "devlp" ? "lax" : "none",
            secure: process.env.NDE_PHASE === "devlp" ? false : true
        }).json({
            success: true,
            message: `hello ${user.name}`,
        })

    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }

}

// this function work at same as  next bottom function we use comment for 
// this because it it use for  when we not use authentication  and when we use authentication 
// then the atuthentication funtion is return req  with user id 
// from databse  so we simple return it by {user:req.user} in next funtion 


// export const getuse = async (req, res) => {

//     try {
//         const { token } = req.cookies;
//         if (!token) {
//             return res.status(404).json({
//                 success: false,
//                 message: "plase login first",
//             })
//         }

//         const decData = Jwt.verify(token, process.env.JWT_S);

//         const user = await User.findById(decData._id);
//         res.status(200).json({
//             success: true,
//             user
//         })
//     }
//     catch (error) {
//         return res.status(500).json({ success: false, message: error.message })

//     }
// }

export const getuse = async (req, res) => {

    try {
        res.status(200).json({
            success: true,
            user: req.user
        })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }
}

export const logout = async (req, res) => {
    try {

        res.status(200).cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NDE_PHASE === "devlp" ? "lax" : "none",
            secure: process.env.NDE_PHASE === "devlp" ? false : true
        }).json({
            success: true,
            user: req.user,
            message: "logout successfully",
        })

    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }
}
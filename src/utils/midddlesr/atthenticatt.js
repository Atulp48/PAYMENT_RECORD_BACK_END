// import User from "../../models/User.js"
// import Jwt from "jsonwebtoken";

// export const authenticatt = async (req, res, next) => {


//     try {
//         const { token } = req.cookies;
//         if (!token) {
//             return res.status(404).json({
//                 success: false,
//                 message: "plase login first",
//             })
//         }

//         Jwt.verify(token, process.env.JWT_S, (err, user) =>{
//             if(err){
//                 return res.status(500).json({success: false, message: err})
//             }
//             req.user = user;
//         })
//         next();

//     }
//     catch (error) {
//         return res.status(500).json({ success: false, message: error.message })

//     }
// }


import User from "../../models/User.js"
import Jwt from "jsonwebtoken";

export const authenticatt = async (req, res, next) => {


    try {
        const { token } = req.cookies;

        if (!token)
          return res.status(404).json({
            success: false,
            message: "plase login first",
          });
      
        const decoded = Jwt.verify(token, process.env.JWT_S);
      
        req.user = await User.findById(decoded._id);
        next();

    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }
}






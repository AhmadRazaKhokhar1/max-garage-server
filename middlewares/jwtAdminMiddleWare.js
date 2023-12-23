import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; dotenv.config();

const verifyAdmin = async (req, res, next)=> {
    try {
        const token = req.header('Authorization')
        if(!token){
                return res.status(404).json({
                success:false, message: "The login session has expired."
            });
        }
        const editToken = token.replace('Bearer', "").trim()
        const jwtToken = jwt.verify(editToken, process.env.JWT_SECRET_KEY);
        const adminVerified = jwtToken.isAdmin;
        if(adminVerified === true){
            next();
        }
        else{
          return  res.status(409).send({
                success:false,
                message:"Unauthorized attempt"
            })
        }
    } catch (error) {
        console.log(`There was an error in the JWT: ${error}`)
        return res.status(500).json({
            success:false, message: "There was an internal server error."
        })
    }
}

export default verifyAdmin;
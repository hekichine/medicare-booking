import jwt from 'jsonwebtoken'
import DoctorSchema from '../models/DoctorSchema.js'
import UserSchema from '../models/UserSchema.js'


export const authenticate = async(req,res,next)=>{

  // get token from headers

  const authToken = req.headers.authorization;
  // 'Bearer ...'
  // check token
  if(!authToken || !authToken.startsWith('Bearer ')){
      return res.status(401).json({
        success:false,
        message: "Not authentication!"
      })
  }
  try {
    const token = authToken.split(' ')[1];

    //verify token 
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

    // console.log(1);
    // set req to use restrict bellow
    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  } catch (error) {
    // console.log(error);
    if(error.name === 'TokenExpiredError'){
      return res.status(401).json({
        message: 'Token is expired'
      })
    }
    return res.status(401).json({
      message: 'Invalid Token!',
      success:false
    })
  }
}

export const restrict = roles =>  async (req,res,next)=>{
  const userId = req.userId;
  let user;

  const patient = await UserSchema.findById(userId)
  const doctor = await DoctorSchema.findById(userId)

  if(patient){
    user = patient;

  }
  if(doctor){
    user = doctor
  }
  // console.log(user);
  if(!roles.includes(user.role)){
    return res.status(401).json({
      success:false,
      message: "You're not authrized!"
    })
  }
  next();
}
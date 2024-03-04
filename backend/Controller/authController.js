import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const generateToken = user => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY,{expiresIn: '15d'})
}

export const register = async (req, res) => {
  const { email, name, password, role, photo, gender } = req.body

  try {
    let user = null
    if (role === 'patient') {
      user = await User.findOne({ email })
    } else if (role === 'doctor') {
      user = await Doctor.findOne({ email })
    }
    //  check user exist
    if (user) {
      return res.status(400).json({
        message: "User already exist!"
      })
    }
    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password, salt);

    if (role === 'patient') {
      user = new User({
        name, email, password: hashPass, photo, gender, role
      })
    }
    if (role === 'doctor') {
      user = new Doctor({
        name, email, password: hashPass, photo, gender, role
      })
    }
    await user.save();
    res.status(200).json({
      message: "Register successfully!",
      success: true
    })

  } catch (error) {
    res.status(500).json({
      message: "Internal server error! Try again",
      success: false
    })
  }
}

export const login = async (req, res) => {
  const { email } = req.body
  try {
    let user = null
    const patient = await User.findOne({ email })
    const doctor = await Doctor.findOne({ email })

    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor
    }
    // check user exist
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }
    // compare password
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordMatch) {
      return res.status(404).json({
        message: "Invalid password",
        status: false
      })
    }

    // get token
    const token = generateToken(user)

    const {password,role,appointment,...rest} = user._doc

    return res.status(200).json({
      message: "Login successfully",
      status: true,
      token,
      data:{...rest},
      role
    })

  } catch (error) {
    return res.status(500).json({
      message: "Login failed",
      status: false
    })
  }
}
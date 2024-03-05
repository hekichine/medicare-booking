
import UserSchema from "../models/UserSchema.js";
import BookingSchema from "../models/BookingSchema.js";
import DoctorSchema from '../models/DoctorSchema.js'

export const updateUser = async (req,res)=>{
  const id = req.params.id

  try {
    
    const updateUser = await UserSchema.findByIdAndUpdate(id,{$set: req.body},{new:true})

    return res.status(200).json({
      success: true,
      message: "Update successfully!",
      data: updateUser
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update!"
    })
  }
}
export const getSingleUser = async (req,res)=>{
  const id = req.params.id

  try {
    
    const findUser = await UserSchema.findById(id).select('-password')

    return res.status(200).json({
      success: true,
      message: "Found user",
      data: findUser
    })
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "User not found!"
    })
  }
}
export const getAllUser = async (req,res)=>{

  try {
    
    const users = await UserSchema.find({}).select('-password')

    return res.status(200).json({
      success: true,
      message: "Found users",
      data: users
    })
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "User not found!"
    })
  }
}
export const getUserProfile = async (req,res)=>{
  const userId = req.userId;
  try {
    const user = await UserSchema.findById(userId)

    if(!user){
      return res.status(404).json({
        success:false,
        message: "Not found"
      })
    }
    const {password,...rest} = user._doc
    return res.status(200).json({
      success:true,
      message: "Profile info",
      data:{...rest}
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message: "Server error"
    })
  }
}
export const getMyAppointment  = async (req,res) => {
  try {
    
    // step 1: retrieve appointments from booking for user
    const bookings = await BookingSchema.find({user:req.userId})
    // step 2: extract doctor ids from appointments booking
    const doctorIds = await bookings.map(el => el.doctor.id)
    // step 3: retrieve doctors using doctor ids
    const doctors = await DoctorSchema.find({_id:{$in:doctorIds}}).select('-password')


    return res.status(200).json({
      success:true,
      message: "Appointment are getting",
      data: doctors
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message: "Server error"
    })
  }
}
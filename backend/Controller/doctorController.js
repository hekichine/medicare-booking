
import doctorSchema from "../models/DoctorSchema.js";

export const updateDoctor = async (req,res)=>{
  const id = req.params.id

  try {
    
    const updateDoctor = await doctorSchema.findByIdAndUpdate(id,{$set: req.body},{new:true})

    return res.status(200).json({
      success: true,
      message: "Update successfully!",
      data: updateDoctor
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update!"
    })
  }
}
export const getSingleDoctor = async (req,res)=>{
  const id = req.params.id

  try {
    
    const findDoctor = await doctorSchema.findById(id).populate('reviews').select('-password')

    return res.status(200).json({
      success: true,
      message: "Found user",
      data: findDoctor
    })
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "User not found!"
    })
  }
}
export const getAllDoctor = async (req,res)=>{

  try {
    const {query} = req.query;

    let doctors;
    if(query){
      doctors = await doctorSchema.find({
        isApproved: 'approved', 
        $or:[
          {name: {$regex: query, $options: 'i'}},
          {specialization: {$regex: query,$options: 'i'}}
        ]
      }).select('-password')
    }
    else{
      doctors = await doctorSchema.find({}).select('-password')
    }

    return res.status(200).json({
      success: true,
      message: "Found doctors",
      data: doctors
    })
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "User not found!"
    })
  }
}
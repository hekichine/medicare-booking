

import DoctorSchema from '../models/DoctorSchema.js'
import ReviewSchema from '../models/ReviewSchema.js'

export const getAllReviews = async (req, res) => {
  try {

    const reviews = await ReviewSchema.find({})

    return res.status(200).json({
      success: true,
      message: "All reviews",
      data: reviews
    })
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Not found"
    })
  }
}

export const createReview = async (req, res) => {

  if(!req.body.doctor) req.body.doctor = req.params.doctorId
  if(!req.body.user) req.body.user = req.userId

  const newReview = new ReviewSchema(req.body)

  try {
     const saveReview = await newReview.save();
     await DoctorSchema.findByIdAndUpdate(req.body.doctor,{
      $push: {reviews: saveReview._id}
     })
     return res.status(200).json({
      success: true,
      message: "Reviews submitted!",
      data:saveReview
     })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Reviews submit failed!"
     })
  }
}
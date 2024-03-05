import React from 'react'

const BloodType = () => {
  return <>
    <select name="bloodType">
      <option value="">Select</option>
      <option value="O">O+</option>
      <option value="A+">A+</option>
      <option value="B+">B+</option>  
      <option value="O">O-</option>
      <option value="A-">A-</option>
      <option value="AB+">AB+</option>
      <option value="B-">B-</option>
      <option value="AB-">AB-</option>
    </select>
  </>
}

export default BloodType
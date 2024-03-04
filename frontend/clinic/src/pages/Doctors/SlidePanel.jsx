import React from 'react'

const SlidePanel = () => {
  return <>
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-c
       justify-between">
        <p className="text__para mt-0 font-semibold">Ticket Price</p>
        <span className='text-[16px] leading-7 lg:text-[32px] text-headingColor font-bold'>500 BDT</span>
       </div>

       <div className="mt-[30px] ">
        <p className='text__para mt-0 font-semibold text-headingColor'>Available time slot: </p>

        <ul className="mt-3">
          <li className="flex items-center justify-between mb-3">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Sunday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              4:00 PM - 9:00 PM
            </p>
          </li>
          <li className="flex items-center justify-between mb-3">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Monday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              1:00 PM - 3:00 PM
            </p>
          </li>
          <li className="flex items-center justify-between mb-3">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Tuesday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              8:00 AM - 2:00 PM
            </p>
          </li>
        </ul>
       </div>
       <button className='btn px-2 w-full rounded-md'>Book Appointment</button>
    </div>
  </>
}

export default SlidePanel
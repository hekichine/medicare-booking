import React, { useState } from "react";
import avatar from '../../assets/images/avatar-icon.png'
import { formateDate } from "../../utils/formateDate";
import {AiFillStar} from 'react-icons/ai'
import FeedbackForm from "./FeedbackForm";

const DoctorFeedback = () => {

  const [showFeedbackForm,setShowFeedbackForm] = useState(false);

  return <>
    <div className="mb-[50px]">
      <h4 className="text-[20px] leading-[30px] font-bold text-headingColor">All review(272)</h4>

      <div className="flex justify-between gap-10 mb-[30px]">
        <div className="flex gap-3">
          <figure className="w-10 h-10 rounded-full"> 
            <img src={avatar} className="w-full" alt="" />
          </figure>

          <div className="">
            <h5 className="text-[16px] leading-6 text-primaryColor font-bold">Ali ahmed</h5>
            <p className="text-[14px] leading-6 text-textColor">{formateDate("02-01-2023")}</p>
            <p className="text__para mt-3 font-medium text-[15px] ">Good services, highly recommend 🫶</p>
          </div>

        </div>

        <div className="flex gap-1">
          {[...Array(5).keys()].map((_,index) => <AiFillStar key={index} color="#0067ff"/>)}
        </div>
      </div>
    </div>

    {!showFeedbackForm && <div className="text-center">
      <button className="btn" onClick={() => setShowFeedbackForm(true
        )}>
        Give feedback
      </button>
    </div>}

    {showFeedbackForm && <FeedbackForm/>}
  </>
};

export default DoctorFeedback;

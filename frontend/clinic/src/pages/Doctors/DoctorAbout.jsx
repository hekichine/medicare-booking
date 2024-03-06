import React from "react";
import { formateDate } from "../../utils/formateDate";

const DoctorAbout = ({ name, about, qualifications, experiences }) => {
  return (
    <>
      <div className="">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About of -
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            {name}
          </span>
        </h3>
        <span className="text_para">{about}</span>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Education
        </h3>
          {!qualifications || qualifications?.length === 0 && (
            <div className="flex items-center rounded-md justify-center py-4 bg-red-300 text-white">
              <span>Not update</span>
            </div>
          ) }
        <ul className="pt-4 md:p-5">
          {qualifications?.map((item, index) => (
            <li
              key={index}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]"
            >
              <div className="">
                <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                  {formateDate(item.startingDate)} -{" "}
                  {formateDate(item.endingDate)}
                </span>
                <p className="text-[16px] leading-6 font-medium text-textColor">
                  {item.degree}
                </p>
              </div>
              <p className="text-[14px] leading-5 font-medium text-textColor">
                {item.university}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Experience
        </h3>
        {!experiences || experiences?.length === 0 && (
            <div className="flex items-center rounded-md justify-center py-4 bg-red-300 text-white">
              <span>Not update</span>
            </div>
          ) }
        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5 ">
          {experiences?.map((item, index) => (
            <li key={index} className="p-4 rounded bg-[#fff9ea]">
              <span className="text-yellowColor text-[15px] leading-6 font-semibold">
                {formateDate(item.startingDate)} -{" "}
                {formateDate(item.endingDate)}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                {item.position}
              </p>
              <p className="text-[14px] leading-5 font-medium text-textColor">
                {item.hospital}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DoctorAbout;

import React, { useState } from "react";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL, API_VERSION } from "../../config";
import Tabs from "./Tabs";
import starIcon from '../../assets/images/Star.png'
import DoctorAbout from "../../pages/Doctors/DoctorAbout";
import Profile from "./Profile";
import Appointments from "./Appointments";

const Dashboard = () => {
  const { data, loading, error } = useFetchData(
    `${BASE_URL}/${API_VERSION}/doctors/profile/me`
  );

  const [tab, setTab] = useState("overview");

  return (
    <>
      <section>
        <div className="max-w-[1170px] px-5 mx-auto">
          {loading && !error && <Loader />}
          {error && !loading && <Error />}

          {!loading && !error && (
            <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
              <Tabs tab={tab} setTab={setTab} />
              <div className="lg:col-span-2">
                {data.isApproved === "pending" && (
                  <div className="flex items-center p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg overflow-hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width={16}
                      height={16}
                      color="currentColor"
                    >
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div className="ml-3 text-sm font-medium">
                      To get approval please complete your profile. We'll review
                      manually and approve within 3days.
                    </div>
                  </div>
                )}
                <div className="mt-8">
                  {tab === "overview" && (
                    <div className="">
                      <div className="flex items-center gap-4 mb-10">
                        <figure className="max-w-[200px] max-h-[200px] overflow-hidden">
                          <img src={data?.photo} alt="" className="w-full" />
                        </figure>
                        <div className="">
                          <span className="bg-[#ccf0f3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold">
                            {data?.specialization} 
                          </span>
                          <h3 className="text-[22px] leading-9 font-bold text-headingColor mt-3">{data.name}</h3>
                          <div className="flex items-center gap-[6px]">
                            <span className="flex items-center gap-[6px] text-headingColor leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                              <img src={starIcon} alt="" />
                            {data.averageRating}
                            </span>
                            <span className="text-textColor leading-5 lg:text-[14px] lg:leading-6 font-semibold">
                            ({data.totalRating})
                            </span>
                          </div>
                          <p className="text__para font-[15px] lg:max-w-[390px] leading-6">{data?.bio}</p>
                        </div>
                      </div>
                      <DoctorAbout name={data.name} about={data.about} qualifications= {data.qualifications}  experiences={data.experiences} />
                    </div>
                  )}
                  {tab === "appointments" && <Appointments appointments={data.appointments} /> }
                  {tab === "settings" && <Profile doctorData={data} />}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;

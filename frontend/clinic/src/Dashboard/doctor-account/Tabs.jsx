import React, { useContext } from "react";
import { BiMenu } from "react-icons/bi";
import { authContext } from '../../context/AuthContext'
import {useNavigate} from 'react-router-dom'


const Tabs = ({ tab, setTab }) => {
  const {dispatch } = useContext(authContext);
  const navigate = useNavigate()
  const handleLogout = ()=>{
    dispatch({type: 'LOG_OUT'});
    navigate('/')
  }
  return (
    <>
      <div className="">
        <span className="lg:hidden">
          <BiMenu className="w-6 h-6 cursor-pointer" />
        </span>
        <div className="hidden sticky lg:top-[80px] lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md">
          <button
            onClick={() => setTab("overview")}
            className={`${
              tab === "overview"
                ? "bg-indigo-100 text-primaryColor "
                : "bg-transparent text-headingColor"
            } w-full btn mt-0 rounded-md`}
          >
            Overview
          </button>
          <button
            onClick={() => setTab("appointments")}
            className={`${
              tab === "appointments"
                ? "bg-indigo-100 text-primaryColor "
                : "bg-transparent text-headingColor"
            } w-full btn mt-0 rounded-md`}
          >
            Appointments
          </button>
          <button
            onClick={() => setTab("settings")}
            className={`${
              tab === "settings"
                ? "bg-indigo-100 text-primaryColor "
                : "bg-transparent text-headingColor"
            } w-full btn mt-0 rounded-md`}
          >
            Settings
          </button>
            <button
              onClick={handleLogout}
              className="w-full mt-[50px] md:mt-[100px] bg-[#181a1e] text-white p-3 text-[16px] leading-7 rounded-md"
            >
              Logout
            </button>
            {/* <button className="w-full bg-red-600 mt-4 text-white p-3 text-[16px] leading-7 rounded-md">Delete Account</button> */}
        </div>
      </div>
    </>
  );
};

export default Tabs;

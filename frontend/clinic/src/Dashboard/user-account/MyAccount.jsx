import React,{useContext, useState} from 'react'
import { authContext } from '../../context/AuthContext'
import MyBookings from './MyBookings'
import Profile from './Profile'
import useFetchData from '../../hooks/useFetchData'
import { BASE_URL,API_VERSION } from '../../config'
import Loading from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'

const MyAccount = () => {

  const [tab,setTab] = useState('bookings')
  const {dispatch } = useContext(authContext);

  const {data:userData,loading,error} = useFetchData(`${BASE_URL}/${API_VERSION}/users/profile/me`);

  const handleLogout = ()=>{
    dispatch({type: 'LOG_OUT'});
  }

  return <>
  <section>
    <div className="max-w-[1170px] px-5 mx-auto">
      {loading && <Loading />}
      {error && <Error errMessage={error} />}
     {
      !loading && !error && ( <div className="grid md:grid-cols-3 gap-10 ">
      <div className="pb-[50px] px-[30px] rounded-md">
        <div className="flex items-center md:items-start flex-col md:flex-row">

          <div className="flex items-center justify-center">
            <figure className='w-[100px] h-[100px] rounded-full overflow-hidden border-2 border-solid border-primaryColor'>
              <img src={userData?.photo} alt="" />
            </figure>
          </div>
          <div className="text-center md:text-left mt-4 md:mt-0 md:ml-3">
            <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">{userData?.name}</h3>
            <p className="text-textColor text-[15px] leading-6 font-semibold">{userData?.email}</p>
            <p className="text-textColor text-[15px] leading-6 font-semibold">{userData?.gender}</p>
            <p className="text-textColor text-[15px] leading-6 font-semibold">Blood type: <span className="ml-2 text-headingColor">{userData?.bloodType}</span></p>
            
          </div>
        </div>
        <div className="mt-[50px] md:mt-[100px]">
          <button onClick={handleLogout} className="w-full bg-[#181a1e] text-white p-3 text-[16px] leading-7 rounded-md">Logout</button>
          {/* <button className="w-full bg-red-600 mt-4 text-white p-3 text-[16px] leading-7 rounded-md">Delete Account</button> */}
        </div>
      </div>
      <div className="md:col-span-2 md:px-[30px]">
        <div className="">
          <button onClick={()=> setTab('bookings')} className={`${tab === 'bookings' && 'bg-primaryColor text-white'} p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>My Booking</button>
          <button onClick={()=> setTab('settings')} className={`${tab === 'settings'  && 'bg-primaryColor text-white'} py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>Profile Settings</button>
        </div>

        {tab ==='bookings' && <MyBookings />}
        {tab === 'settings' && <Profile user={userData} />}
      </div>
    </div>)
     }
    </div>
  </section>
  </>
}

export default MyAccount
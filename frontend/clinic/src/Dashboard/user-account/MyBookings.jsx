import React from 'react'
import useFetchData from '../../hooks/useFetchData'
import { BASE_URL,API_VERSION } from '../../config'
import Loading from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'
import DoctorCard from '../../components/Doctors/DoctorCard'

const MyBookings = () => {

  const {data:appointments,loading,error} = useFetchData(`${BASE_URL}/${API_VERSION}/users/appointment/my-appointments`)

  return <>
     {loading && <Loading />}
      {error && <Error errMessage={error} />}
      {!loading && !error &&  (<div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
          { appointments.map(doctor => <DoctorCard doctor={doctor} key={doctor._id}
           />)}
         </div>) }
        {!loading && !error && appointments.length === 0 && (
          <h2 className="text-headingColor mt-5 text-center text-[20px] ">
            You didn't book any doctor yet!
          </h2>
        )}
  </>
}

export default MyBookings
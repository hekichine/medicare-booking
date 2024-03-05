import { useEffect, useState } from 'react'

const useFetchData = (url) => {

  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);

  useEffect(()=>{
    const fetchData = async () => {
      setLoading(true);
     try {
      const res = await fetch(url,{
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      const result = await res.json()
      if(res.status !== 200){
        setError(result.message + ' 🥴')
        setLoading(false)
        throw new Error(result.message + ' 🥴')
      }
      if(result.data){
        setLoading(false);
        setData(result.data)
      }
     } catch (err) {
      setLoading(false)
      setError(err.message)
     }
    }
    fetchData()
  },[url])

  return {data,loading,error}
}

export default useFetchData
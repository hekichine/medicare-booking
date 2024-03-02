import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import {RiLinkedinFill} from 'react-icons/ri'
import {AiFillYoutube,AiFillGithub,AiOutlineInstagram} from 'react-icons/ai'


const socialLinks= [
  {
    path: 'https://www.youtube.com/',
    icon: <AiFillYoutube className='group-hover:text-white w-4 h-5' />
  },
  {
    path: 'https://www.github.com/',
    icon: <AiFillGithub className='group-hover:text-white w-4 h-5' />
  },
  {
    path: 'https://www.instagram.com/',
    icon: <AiOutlineInstagram className='group-hover:text-white w-4 h-5' />
  },
  {
    path: 'https://www.linkedin.com/',
    icon: <RiLinkedinFill className='group-hover:text-white w-4 h-5' />
  }
]
const quickLinks01= [
  {
    id: "home",
    path: "/home",
    display: "Home",
  },
  {
    id: "doctors",
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    id: "services",
    path: "/services",
    display: "Services",
  },
  {
    id: "contact",
    path: "/contact",
    display: "Contact",
  },
]
const quickLinks02= [
  {
    id: "find-a-doctor",
    path: "/find-a-doctor",
    display: "Find a doctor",
  },
  {
    id: "request-an-appointment",
    path: "/",
    display: "Request an Appointment",
  },
  {
    id: "find-a-location",
    path: "/",
    display: "Find a location",
  },
  {
    id: "get-a-opinion",
    path: "/",
    display: "Get a Opinion",
  },
]
const quickLinks03 = [
  {
    path: '/',
    display: "Donate"
  },
  {
    path: '/contact',
    display: "Contact Us"
  }
]

const Footer = () => {

  const year = new Date().getFullYear();

  return <>
  <footer>
    <div className="container">
      <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
        <div className="">
          <img src={logo} alt="" />
          <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">Copyright &copy; {year} developed by CLX all right reserved.</p>
          <div className="flex items-center gap-3 mt-4">
            {socialLinks.map((link,index) => <Link to={link.path}  key={index} className='w-9 h-9 border border-solid border-[#181a1e] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none'>{link.icon}</Link>)}
          </div>
        </div>
        <div className="">
          <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">Quick links</h2>

          <ul className="">
            {quickLinks01.map((item,index)=> <li key={index} className='mb-4'><Link to={item.path} className='text-[16px] leading-7 font-[400] text-textColor hover:text-primaryColor'>{item.display}</Link></li>)}
          </ul>
        </div>
        <div className="">
          <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">I want to:</h2>

          <ul className="">
            {quickLinks02.map((item,index)=> <li key={index} className='mb-4'><Link to={item.path} className='text-[16px] leading-7 font-[400] text-textColor hover:text-primaryColor'>{item.display}</Link></li>)}
          </ul>
        </div>
        <div className="">
          <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">Supports</h2>

          <ul className="">
            {quickLinks03.map((item,index)=> <li key={index} className='mb-4'><Link to={item.path} className='text-[16px] leading-7 font-[400] text-textColor hover:text-primaryColor'>{item.display}</Link></li>)}
          </ul>
        </div>
      </div>
    </div>
  </footer>
  </>
}

export default Footer
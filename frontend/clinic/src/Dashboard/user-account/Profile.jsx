import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL, API_VERSION, token } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { authContext } from "../../context/AuthContext";

const Profile = ({ user }) => {
  const {dispatch} = useContext(authContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    photo: null,
    gender: "",
    bloodType: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      photo: user.photo,
      gender: user.gender,
      bloodType: user.bloodType,
    });
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];

    // upload image to cloudinary
    const data = await uploadImageToCloudinary(file);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/${API_VERSION}/users/${user._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }
      setLoading(false);
      toast.success(message);
      // navigate("/users/profile/me");
      // console.log(res.data);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="mt-5 border border-solid border-blue-200 p-5 rounded-md">
        <form action="" onSubmit={submitHandle}>
          <div className="mb-5">
            <input
              type="text"
              placeholder="Full name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter your password"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor disabled:bg-gray-400 cursor-not-allowed select-none "
              readOnly
              disabled
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            />
          </div>
          <div className="mb-5">

            <select
              name="bloodType"
              value={formData.bloodType}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer disabled:bg-gray-400 cursor-not-allowed select-none "
              readOnly
              disabled
            >
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
          </div>
          <div className="mb-5 flex items-center justify-between">
            <label
              htmlFor=""
              className="text-headingColor font-bold text-[16px] leading-7"
            >
              Gender:
              <select
                name="gender"
                className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                onChange={handleInputChange}
                value={formData.gender}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>
          <div className="mb-5 flex items-center gap-3">
            {formData.photo && (
              <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center overflow-hidden">
                <img src={formData.photo} alt="" />
              </figure>
            )}
            <div className="relative w-auto h-[50px]">
              <input
                type="file"
                name="photo"
                id="customFile"
                accept=".jpg,.png"
                onChange={handleFileInputChange}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
              <label
                htmlFor="customFile"
                className="w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rouded-lg truncate cursor-pointer"
              >
                Upload Photo
              </label>
            </div>
          </div>
          <div className="mt-7">
            <button
              disabled={loading && true}
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
              type="submit"
            >
              {loading ? <HashLoader size={25} color="#fff" /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;

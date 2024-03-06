import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL, API_VERSION, token } from "../../config";
import { toast } from "react-toastify";

const Profile = ({ doctorData }) => {
  const [formData, setFormData] = useState([]);

  useEffect(()=>{
    setFormData(doctorData)
  },[doctorData])
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    console.log(data);

    setFormData({ ...formData, photo: data?.url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${BASE_URL}/${API_VERSION}/doctors/${doctorData._id}`,
        {
          method: "put",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const { message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }
      toast.success(message);

    } catch (error) {
      toast.error(error.message);
    }
  };

  // adding item
  const addItem = (key, item) => {
    setFormData((prev) => {
      return {
        ...prev,
        [key]: [...prev[key], item],
      };
    });
  };
  // delete item
  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };
  // reusable input change func
  const handleReusableInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[key]];
      updateItems[index][name] = value;
      return {
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };

  const addQualification = (e) => {
    e.preventDefault();

    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };
  const handleQualificationChange = (event, index) => {
    handleReusableInputChangeFunc("qualifications", index, event);
  };
  const deleteQualification = (e, index) => {
    e.preventDefault();
    deleteItem("qualifications", index);
  };
  const addExperiences = (e) => {
    e.preventDefault();
    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "",
      hospital: "",
    });
  };
  const handleExperienceChange = (event, index) => {
    handleReusableInputChangeFunc("experiences", index, event);
  };
  const deleteExperience = (e, index) => {
    e.preventDefault();
    deleteItem("experiences", index);
  };

  // time slots
  const addTimeSlot = (e) => {
    e.preventDefault();
    addItem("timeSlots", {
      day: "",
      startingTime: "",
      endingTime: "",
    });
  };
  const handleTimeSlotsChange = (event, index) => {
    handleReusableInputChangeFunc("timeSlots", index, event);
  };
  const deleteTimeSlot = (e, index) => {
    e.preventDefault();
    deleteItem("timeSlots", index);
  };

  return (
    <>
      <div>
        <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
          Profile Infomation
        </h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-5">
            <p className="form__label">Name</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full name"
              className="form__input"
            />
          </div>
          <div className="mb-5">
            <p className="form__label">Email</p>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={()=>{}}
              placeholder="Email"
              className="form__input"
              readOnly
              aria-readonly
              disabled
            />
          </div>
          <div className="mb-5">
            <p className="form__label">Phone</p>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone number"
              className="form__input"
            />
          </div>
          <div className="mb-5">
            <p className="form__label">Bio*</p>
            <input
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Bio"
              className="form__input"
              maxLength={100}
            />
          </div>

          <div className="mb-5">
            <div className="grid grid-cols-3 gap-5 mb-[30px]">
              <div className="">
                <p className="form__label">Gender*</p>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="form__input py-3.5"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="">
                <p className="form__label">Specialation*</p>
                <select
                  name="specialation"
                  value={formData.specialation}
                  onChange={handleInputChange}
                  className="form__input py-3.5"
                >
                  <option value="">Select</option>
                  <option value="surgeon">Surgeon</option>
                  <option value="neurologist">Neurologist</option>
                  <option value="dermatologist">Dermatologist</option>
                </select>
              </div>

              <div className="">
                <p className="form__label">Ticket Price*</p>
                <input
                  type="number"
                  placeholder="100"
                  name="ticketPrice"
                  value={formData.ticketPrice}
                  onChange={handleInputChange}
                  className="form__input"
                />
              </div>
            </div>
          </div>
          <div className="mb-5 ">
            <p className="form__label">Qualifications*</p>
            {formData.qualifications?.map((item, index) => (
              <div key={index}>
                <div className="">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="">
                      <p className="form__label">Starting Data*</p>
                      <input
                        className="form__input"
                        type="date"
                        name="startingDate"
                        value={item.startingDate}
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                    <div className="">
                      <p className="form__label">Ending Data*</p>
                      <input
                        className="form__input"
                        type="date"
                        name="endingDate"
                        value={item.endingDate}
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5 mt-5">
                    <div className="">
                      <p className="form__label">Degree*</p>
                      <input
                        className="form__input"
                        type="text"
                        name="degree"
                        value={item.degree}
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                    <div className="">
                      <p className="form__label">University*</p>
                      <input
                        className="form__input"
                        type="text"
                        name="university"
                        value={item.university}
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-center py-3">
                    <button
                      onClick={(e) => deleteQualification(e, index)}
                      className="bg-red-600 p-2 rounded-full text-white text-[18px] cursor-pointer"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addQualification}
              className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
            >
              Add Qualifications
            </button>
          </div>
          <div className="mb-5 ">
            <p className="form__label">Experience*</p>
            {formData.experiences?.map((item, index) => (
              <div key={index}>
                <div className="">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="">
                      <p className="form__label">Starting Data*</p>
                      <input
                        className="form__input"
                        type="date"
                        name="startingDate"
                        value={item.startingDate}
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                    <div className="">
                      <p className="form__label">Ending Data*</p>
                      <input
                        className="form__input"
                        type="date"
                        name="endingDate"
                        value={item.endingDate}
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5 mt-5">
                    <div className="">
                      <p className="form__label">Position*</p>
                      <input
                        className="form__input"
                        type="text"
                        name="position"
                        value={item.position}
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                    <div className="">
                      <p className="form__label">Hostpital*</p>
                      <input
                        className="form__input"
                        type="text"
                        name="hospital"
                        value={item.hospital}
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-center py-3">
                    <button
                      onClick={(e) => deleteExperience(e, index)}
                      className="bg-red-600 p-2 rounded-full text-white text-[18px] cursor-pointer"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addExperiences}
              className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
            >
              Add Experiences
            </button>
          </div>
          <div className="mb-5 ">
            <p className="form__label">Time slot*</p>
            {formData.timeSlots?.map((item, index) => (
              <div key={index}>
                <div className="">
                  <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                    <div className="">
                      <p className="form__label">Day*</p>
                      <select
                        name="day"
                        value={item.day}
                        onChange={(e) => handleTimeSlotsChange(e, index)}
                        className="form__input py-3.5"
                      >
                        <option value="">Select</option>
                        <option value="monday">Monday</option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="thursday">Thurday</option>
                        <option value="friday">Friday</option>
                        <option value="saturday">Saturday</option>
                        <option value="sunday">Sunday</option>
                      </select>
                    </div>
                    <div className="">
                      <p className="form__label">Starting time*</p>
                      <input
                        className="form__input"
                        type="time"
                        name="startingTime"
                        value={item.startingTime}
                        onChange={(e) => handleTimeSlotsChange(e, index)}
                      />
                    </div>
                    <div className="">
                      <p className="form__label">Ending time*</p>
                      <input
                        className="form__input"
                        type="time"
                        name="endingTime"
                        value={item.endingTime}
                        onChange={(e) => handleTimeSlotsChange(e, index)}
                      />
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={(e) => deleteTimeSlot(e, index)}
                        className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-10 mb-[30px] cursor-pointer"
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addTimeSlot}
              className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
            >
              Add TimeSlots
            </button>
          </div>
          <div className="mb-5">
            <p className="form__label">About</p>
            <textarea
              name="about"
              value={formData.about}
              rows={5}
              className="form__input"
              placeholder="Write about you"
              onChange={handleInputChange}
            ></textarea>
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
                className="w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
              >
                Upload Photo
              </label>
            </div>
          </div>

          <div className="mt-7">
            <button
              type="submit"
              className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg "
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;

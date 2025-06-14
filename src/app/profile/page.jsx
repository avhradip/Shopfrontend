"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "../../Components/Ui/label";
import { Input } from "../../Components/Ui/input";
import { editProfile, getUserFun } from "../../Feature/userSlice";
import { useRouter } from "next/navigation";
import { MdArrowBackIosNew } from "react-icons/md";
import LogoutDialog from "../../Components/LogOutDailog";

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const [name, setName] = useState(user?.name)
  const [number, setNumber] = useState(user?.number)
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || null)




  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setProfilePicture(selected);
    console.log("Selected file:", selected);
  };

  const handleLogOut = () => {
    localStorage.removeItem("userToken")
    dispatch(getUserFun())
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Values going into FormData:", { name, number, profilePicture });

    const formData = new FormData();
    formData.append("name", name);
    formData.append("number", number);

    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    dispatch(editProfile(formData));
    dispatch(getUserFun());
  };


  return (
    <div>
      <button
        onClick={() => router.back()}
        className="px-4 py-2 rounded hover:bg-gray-100"
      >
        <MdArrowBackIosNew />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-screen">
        {/* Profile Details */}
        <section className=" p-6 rounded shadow col-span-1 flex flex-col items-center justify-start">
          <div className="flex justify-between w-full">

            <h2 className="text-lg font-semibold text-black">Profile Details</h2>

            <LogoutDialog handleLogOut={handleLogOut} />
          </div>
          <img src={
            profilePicture
              ? typeof profilePicture === 'string'
                ? profilePicture
                : URL.createObjectURL(profilePicture)
              : "https://www.ohe.org/wp-content/uploads/2023/02/fallback-profile-image_1.jpg"
          } alt="profilePicture" className="w-20 h-20 rounded-full object-cover" />

          <p className="text-gray-700">Name: {name}</p>
          <p className="text-gray-700">Email: {user?.email}</p>
          <p className="text-gray-700">Role: {user?.type}</p>
        </section>

        {/* Edit Profile */}
        <section className="bg-white p-6 rounded shadow col-span-1">
          <h2 className="text-lg font-semibold mb-4 text-black">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Profile Picture
              </Label>

              <Input
                type="file"
                name="profilePicture"
                onChange={handleFileChange}
                className="w-full mt-1 px-3 py-2 border rounded text-black"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700">Name</Label>
              <Input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded text-black"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700">Number</Label>
              <Input
                type="number"
                name="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded text-black"
              />
            </div>
            <div>
              <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                Save Changes
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

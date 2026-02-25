import { Camera } from "lucide-react";
import noPic from "../assets/noPic.jpg"
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import dayjs from "dayjs";

const ProfilePage = () => {
  const { updateProfile, authUser, isUpdatingProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null)

  const handleImageUpload = async(e)=>{
    const file = e.target.files[0]
    if(!file) return
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async()=>{
        const base64Image = reader.result
        setSelectedImg(base64Image)
        await updateProfile({profilePic:base64Image})
    }
  }
  


  return (
    <div className="bg-slate-900/90 h-screen">
      <div className="flex justify-center mb-5">
        <div className="avatar mt-[10%] relative">
          <div className="z-10 ring-black ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2 ">
            <label
              htmlFor="avatar-update"
              className={`absolute bottom-0 right-0 hover:scale-125 transition-all duration-200 cursor-pointer ${isUpdatingProfile? "animate-pulse pointer-events-none":""}`}
            >
              <Camera className="text-white bg-black rounded-full" />
              <input
                type="file"
                id="avatar-update"
                className="hidden"
                accept="image/*"
                disabled={false}  
                onChange={handleImageUpload}
              />
            </label>
            <img src={selectedImg|| authUser.profilePic || noPic}  alt="ProfilePic" className="object-cover"/>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center font-poppins gap-6">
        <div className="border-b-2  border-b-black w-[70%] lg:w-[30%]">
            <p className="text-caption">Name</p>
            <p className="text-emphasis">{authUser.fullName}</p>
        </div>
         <div className="border-b-2  border-b-black w-[70%] lg:w-[30%]">
            <p className="text-caption">Email</p>
            <p className="text-emphasis">{authUser.email}</p>
        </div>
        <div className="w-[70%] lg:w-[30%]">
            <h4 className="text-small text-slate-400 mb-1">Account information</h4>
            <div className="flex justify-between text-caption border-b border-dashed font-varela-round">
                <p>member since</p>
                <p className="">{dayjs(authUser.createdAt).format('MM-DD-YYYY')}</p>
            </div>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default ProfilePage;

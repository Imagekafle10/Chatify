import { useState, useRef } from "react";
import { Avatar, Button, Tooltip } from "antd";
import {
  LogoutOutlined,
  SoundOutlined,
  AudioMutedOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleSound } from "../store/slices/chatStoreSlice";
import { logout } from "../store/slices/authSlice";
import toast from "react-hot-toast";
import { updateProfile } from "../api/auth.api";
import { BASE_URL } from "../constant/common";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { authUser, isLoggedIn } = useSelector((state) => state.auth);

  const { isSoundEnabled } = useSelector((state) => state.chat);
  const [selectedImg, setSelectedImg] = useState(null);
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file); // attach the file

    try {
      const res = await dispatch(updateProfile(formData)).unwrap(); // send to redux/action
      setSelectedImg(URL.createObjectURL(file));
      console.log("Profile image updated successfully");
    } catch (err) {
      console.error("Failed to update profile image:", err);
    }
  };

  return (
    <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
      {/* Left: Avatar + Name */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div
            onClick={() => fileInputRef.current.click()}
            className="cursor-pointer relative rounded-full overflow-hidden"
          >
            <Avatar
              size={56}
              src={
                selectedImg ||
                (authUser?.profilePic
                  ? `${BASE_URL}/${authUser.profilePic.replace(/\\/g, "/")}`
                  : "/avatar.png")
              }
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center rounded-full transition-opacity">
              <span className="text-white text-xs">Change</span>
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        <div>
          <h3 className="text-white font-medium truncate max-w-[140px]">
            {authUser?.fullName || "Test Name"}
          </h3>
          <p className="text-slate-400 text-xs">Online</p>
        </div>
      </div>

      {/* Right: Buttons */}
      <div className="flex gap-3 items-center">
        <Tooltip title="Logout">
          <Button
            style={{ color: "white" }}
            type="text"
            icon={<LogoutOutlined className="text-white" />}
            onClick={() => {
              toast.success("Logout Sucessfully!");
              dispatch(logout());
            }}
          />
        </Tooltip>

        <Tooltip title={isSoundEnabled ? "Mute" : "Enable sound"}>
          <Button
            style={{ color: "white" }}
            type="text"
            icon={
              isSoundEnabled ? (
                <SoundOutlined className="text-white" />
              ) : (
                <AudioMutedOutlined className="text-white" />
              )
            }
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch((err) => console.log(err));
              dispatch(toggleSound());
            }}
          />
        </Tooltip>
      </div>
    </div>
  );
}

export default ProfileHeader;

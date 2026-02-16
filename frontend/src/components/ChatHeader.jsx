import { XOutlined, UserOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useSelector(state=>state.chat);
  const { onlineUsers } = useSelector(state=>state.auth)
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="flex justify-between items-center bg-slate-800/50 border-b border-slate-700/50 max-h-[84px] px-6 flex-1">
      {/* Left: Avatar + Name + Status */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Avatar
            size={48}
            src={selectedUser.profilePic || "/avatar.png"}
            icon={!selectedUser.profilePic && <UserOutlined />}
          />
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-800 ${
              isOnline ? "bg-green-400" : "bg-red-400"
            }`}
          />
        </div>
        <div>
          <h3 className="text-slate-200 font-medium">{selectedUser.fullName}</h3>
          <p className="text-slate-400 text-sm">{isOnline ? "Online" : "Offline"}</p>
        </div>
      </div>

      {/* Right: Close button */}
      <Tooltip title="Close chat">
        <button onClick={() => setSelectedUser(null)}>
          <XOutlined className="text-slate-400 hover:text-slate-200 transition-colors text-lg" />
        </button>
      </Tooltip>
    </div>
  );
}

export default ChatHeader;

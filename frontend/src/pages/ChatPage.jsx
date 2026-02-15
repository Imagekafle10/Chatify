import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/slices/authSlice";
import toast from "react-hot-toast";


function ChatPage() {

  const { isloading, authUser, isLoggedIn } =
    useSelector((state) => state.auth);

  const dispatch = useDispatch();
  return (
    <div className="text-white">
<button
  onClick={() => {dispatch(logout())
    toast.success("Logout SucessFull")
  }}
  className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
>
  Logout
</button>


      ChatPage
    </div>
  );
}

export default ChatPage;

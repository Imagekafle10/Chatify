import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";


function ChatPage() {

  const { isloading, authUser, isLoggedIn } =
    useSelector((state) => state.auth);

  const dispatch = useDispatch();
  console.log(isloading, authUser, isLoggedIn);
  


  return (
    <div className="text-white">
<button
  className="z-10"
  onClick={() => console.log("Clicked!")}
>
  Test
</button>

      ChatPage
    </div>
  );
}

export default ChatPage;

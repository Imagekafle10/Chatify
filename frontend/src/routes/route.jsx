import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ChatPage from "../pages/ChatPage";
import LoginPage from "../pages/LoginPage";
import SiginUpPage from "../pages/SiginUpPage";
import { Path } from "../utils/path";
const AppRoute = () =>{
    return(
        <BrowserRouter>
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[length:14px_24px] -z-10" />
      <div className="absolute top-0 -left-4 w-96 h-96 bg-pink-500 opacity-20 blur-[100px] -z-10" />
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-cyan-500 opacity-20 blur-[100px] -z-10" />
      
<Routes>
  <Route path={Path.Chatpage} element={<ChatPage />}/>
  <Route path={Path.login} element={<LoginPage />}/>
  <Route path={Path.Signup} element={<SiginUpPage />}/>
</Routes>
  </div>
</BrowserRouter>
    )
}
export default AppRoute;
import React from 'react'
import { useSelector } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons';


function LoginPage() {
  const {isloading, isLoggedIn} = useSelector(state=>state.auth);
  console.log(isloading, isLoggedIn);
  

  return (
    (isloading) ?<div className='text-white font-bold '> < LoadingOutlined spin style={{ fontSize: 32 }} /> </div> :
    <div className='text-white'>LoginPage</div>
    
  )
}

export default LoginPage
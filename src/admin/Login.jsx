import React from 'react'
import { Link } from 'react-router'

const Login = () => {
  return (
    <>
      <div className='login_basebox'>
      <div className='loginBox'>
        <h1 className='login_heading'>Login</h1>
        <div className='text-bg-success p-2 login_message'>Successfully logged in message</div>
        <form>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <p className='forgot_txt'><Link>Forgot Password?</Link></p>
          <div className='btn_boxcenter'>
            <button type="submit" className="btn btn-primary">Login Now</button>
          </div>
        </form>
        
      </div>
      </div>
      
    </>
  )
}

export default Login

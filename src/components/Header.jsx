import React, { useState } from 'react'
import { MdOutlineMenu } from "react-icons/md";
import { Link } from 'react-router';
import userImg from '../../public/images/user_img.jpg'
import { IoIosNotificationsOutline } from "react-icons/io";

const Header = ({sidebarToggle, setSidebarToggle}) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };



  return (
    <>
        <div className={`${sidebarToggle ? "navbar_expand" : ""} navbar-custom`}>
           <div className='topbar container-fluid'>
                <div className='d-flex align-items-center gap-lg-2 gap-1'>
                    <button className='button-toggle-menu' onClick={() => setSidebarToggle(!sidebarToggle) }><MdOutlineMenu /></button>
                </div>
                <div className='topbar-menu d-flex align-items-center gap-3'>
                    <ul className='topbar-menu d-flex align-items-center gap-3'>
                        <li>
                        <div className='top_notification'>
                          <Link>
                          <div className='noti_num'>{0}</div>
                          <IoIosNotificationsOutline />
                          </Link>
                        </div>
                        </li> 
                        <li className='dropdown'>
                          <button className='nav-link dropdown-toggle arrow-none nav-user px-2' onClick={toggleDropdown} aria-expanded={isOpen ? "true" : "false"}>
                            <span className='account_user_avatar'>
                              <img src={userImg} alt='user-image' className='rounded-circle' />
                            </span>
                            <span className='d-lg-flex flex-column gap-1 d-none account_user_namebox'>
                              <h5 className="account_user_name my-0">Dominic Keller</h5>
                              <p className='account_user_deg my-0 fw-normal'>Founder</p>
                            </span>
                          </button>
                          {isOpen && (
                          <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated profile-dropdown">                
                            <div className=" dropdown-header noti-title">
                                <h6 className="text-overflow m-0">Welcome !</h6>
                            </div>
                            <Link to="/admin/my-account" className='dropdown-item'>
                              <span>My Account</span>
                            </Link>
                            <Link to="/admin/setting/update-profile" className='dropdown-item'>
                              <span>Update Profile</span>
                            </Link>
                            <Link to="/admin/setting/change-password" className='dropdown-item'>
                              <span>Change Password</span>
                            </Link>
                            <Link to="/logout" className='dropdown-item'>
                              <span>Logout</span>
                            </Link>
                        </div>
                          )}
                        </li>
                    </ul>
                </div>
           </div> 
        </div>
    </>
  )
}

export default Header

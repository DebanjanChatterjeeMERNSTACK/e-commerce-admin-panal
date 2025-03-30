import React from 'react'
import { Link } from 'react-router'

const Footer = () => {
  return (
    <>
      <div className='footer'>
        <div className="container-fluid">
          <div className='row'>
            <div className='col-md-6'><p className='copyrighttxt'>2025 © Hyper - Coderthemes.com</p></div>
            <div className='col-md-6'>
              <ul className='footer_menu'>
                <li><Link>About</Link></li>
                <li><Link>Support</Link></li>
                <li><Link>Contact Us</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
    
  )
}

export default Footer

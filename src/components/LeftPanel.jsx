import React, { useState } from 'react'
import { Link } from 'react-router'
import { TiHome } from "react-icons/ti";
import { Accordion } from 'react-bootstrap';
import { FaStore } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { PiNoteFill } from "react-icons/pi";
import { IoSettings } from "react-icons/io5";
import { FaPaintbrush } from "react-icons/fa6";


const LeftPanel = ({sidebarToggle}) => {

  // State to track the active accordion sections
  const [activeIndexes, setActiveIndexes] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  // Toggle function to open or close accordion sections
  const toggleAccordion = (index) => {
    setActiveIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  //onclick active class
  const handleClick = (index) => {
    setActiveIndex(index); // Set active index
  };


  return (
    <>
      <div className={`${sidebarToggle ? "menuitem_collapsed" : ""} left_panel leftside_menu`}>
        <div className='logobox'><Link to="/admin/">Logo Here</Link></div>
        <div className='leftside_menu_container h-100'>
          <div className='simplebar_content'>
            {/* ---------ShortPanel--------- */}
            <div className='side_nav_box'>
              <div className='side_nav_title'>Navigation</div>
              <ul className='side_nav'>
                <li className='side_nav_item'>
                  <Link to="/admin/" className={activeIndex === 0 ? "active" : ""} onClick={() => handleClick(0)}><span className='navicon'><TiHome /></span> Dashboards <span className='badge bg-success float-end'>3</span></Link>
                </li>
              </ul>
            </div>
            {/* ---------End ShortPanel--------- */}
            {/* ---------ShortPanel--------- */}
            <div className='side_nav_box'>
              <div className='side_nav_title'>Apps</div>

              <div className="nav_accordion">

              <div className='accordion_item'>
                  <div
                    className={`accordionHeader ${activeIndexes.includes(1) ? 'active' : ''}`}
                    onClick={() => toggleAccordion(1)}
                  >
                    <span className="navicon">
                      <FaStore />
                    </span>
                    Pages
                    <span className={`arrow arrow-right ${activeIndexes.includes(1) ? 'arrow-animate' : ''}`}>
                      <i className={`fa-solid fa-angle-right ${activeIndexes.includes(1) ? 'fa-angle-down' : ''}`}></i>
                    </span>
                  </div>
                  <div className={`accordionBody ${activeIndexes.includes(1) ? 'open slide-down' : 'slide-up'}`}>
                    <ul className="side_nav_second_level">
                      <li className="side_nav_item">
                        <Link to="/admin/pages/home" className={activeIndex === 9 ? "active" : ""} onClick={() => handleClick(9)}>Home Page</Link>
                      </li>
                      <li className="side_nav_item">
                        <Link to="/admin/pages/slider" className={activeIndex === 10 ? "active" : ""} onClick={() => handleClick(10)}>Slider Section</Link>
                      </li>
                      <li className="side_nav_item">
                        <Link to="/admin/pages/about-us" className={activeIndex === 11 ? "active" : ""} onClick={() => handleClick(11)}>About Us Page</Link>
                      </li>
                      <li className="side_nav_item">
                        <Link to="/admin/pages/contact-us" className={activeIndex === 12 ? "active" : ""} onClick={() => handleClick(12)}>Contact Us List</Link>
                      </li>
                      <li className="side_nav_item">
                        <Link to="/admin/pages/blog" className={activeIndex === 13 ? "active" : ""} onClick={() => handleClick(13)}>Blog Page</Link>
                      </li>
                      <li className="side_nav_item">
                        <Link to="/admin/pages/privacy" className={activeIndex === 134 ? "active" : ""} onClick={() => handleClick(134)}>Privacy Page</Link>
                      </li>
                      <li className="side_nav_item">
                        <Link to="/admin/pages/terms" className={activeIndex === 133 ? "active" : ""} onClick={() => handleClick(133)}>Terms & Condition Page</Link>
                      </li>
                      <li className="side_nav_item">
                        <Link to="/admin/pages/shipping" className={activeIndex === 132 ? "active" : ""} onClick={() => handleClick(132)}>Shipping Page</Link>
                      </li>
                      <li className="side_nav_item">
                        <Link to="/admin/pages/refund" className={activeIndex === 131 ? "active" : ""} onClick={() => handleClick(131)}>Refund Page</Link>
                      </li>
                      <li className="side_nav_item">
                        <Link to="/admin/pages/faq" className={activeIndex === 130 ? "active" : ""} onClick={() => handleClick(130)}>FAQ Page</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='accordion_item'>
                  <div className={`accordionHeader ${activeIndexes.includes(2) ? 'active' : ''}`} onClick={() => toggleAccordion(2)} >
                    <span className="navicon">
                      <FaStore />
                    </span>
                    Products
                    <span className={`arrow arrow-right ${activeIndexes.includes(2) ? 'arrow-animate' : ''}`}>
                      <i className={`fa-solid fa-angle-right ${activeIndexes.includes(2) ? 'fa-angle-down' : ''}`}></i>
                    </span>
                  </div>
                  <div className={`accordionBody ${activeIndexes.includes(2) ? 'open slide-down' : 'slide-up'}`}>
                    <ul className="side_nav_second_level">
                      <li className="side_nav_item">
                        <Link to="/admin/products" className={activeIndex === 1 ? "active" : ""} onClick={() => handleClick(1)}>Products</Link>
                      </li>
                      <li className="side_nav_item">
                        <Link to="/admin/add-product" className={activeIndex === 2 ? "active" : ""} onClick={() => handleClick(2)}>Add Product</Link>
                      </li>
                      {/* <li className="side_nav_item">
                        <Link to="/admin/sold-products" className={activeIndex === 3 ? "active" : ""} onClick={() => handleClick(3)}>Sold Products</Link>
                      </li> */}
                      <li className="side_nav_item">
                        <Link to="/admin/delete-products" className={activeIndex === 4 ? "active" : ""} onClick={() => handleClick(4)}>Restore Products</Link>
                      </li>
                      {/* <li className="side_nav_item">
                        <Link to="/admin/delete-products" className={activeIndex === 5 ? "active" : ""} onClick={() => handleClick(5)}>Bulk Product Upload</Link>
                      </li> */}
                      
                      <li className="side_nav_item">
                        <Link to="/admin/customers" className={activeIndex === 6 ? "active" : ""} onClick={() => handleClick(6)}>Customers</Link>
                      </li>
                      {/* <li className="side_nav_item">
                        <Link to="/admin/shopping-cart" className={activeIndex === 7 ? "active" : ""} onClick={() => handleClick(7)}>Shopping Cart</Link>
                      </li> */}
                      {/* <li className="side_nav_item">
                        <Link to="/admin/checkout" className={activeIndex === 8 ? "active" : ""} onClick={() => handleClick(8)}>Checkout</Link>
                      </li> */}
                      {/* <li className="side_nav_item">
                        <Link to="/sellers">Sellers</Link>
                      </li> */}
                    </ul>
                  </div>
                </div>

                <div className='accordion_item'>
                  <div className={`accordionHeader ${activeIndexes.includes(3) ? 'active' : ''}`} onClick={() => toggleAccordion(3)} >
                    <span className="navicon">
                      <FaStore />
                    </span>
                    Categories
                    <span className={`arrow arrow-right ${activeIndexes.includes(3) ? 'arrow-animate' : ''}`}>
                      <i className={`fa-solid fa-angle-right ${activeIndexes.includes(3) ? 'fa-angle-down' : ''}`}></i>
                    </span>
                  </div>
                  <div className={`accordionBody ${activeIndexes.includes(3) ? 'open slide-down' : 'slide-up'}`}>
                    <ul className="side_nav_second_level">
                      <li className="side_nav_item">
                        <Link to="/admin/categories" className={activeIndex === 23 ? "active" : ""} onClick={() => handleClick(23)}>Categories</Link>
                      </li>
                      <li className="side_nav_item">
                        <Link to="/admin/add-category" className={activeIndex === 24 ? "active" : ""} onClick={() => handleClick(24)}>Add Category</Link>
                      </li>
                      <li className="side_nav_item">
                        <Link to="/admin/restore-category" className={activeIndex === 26 ? "active" : ""} onClick={() => handleClick(26)}>Restore Category</Link>
                      </li>
                      {/* <li className="side_nav_item">
                        <Link to="/admin/bulk-category-upload" className={activeIndex === 25 ? "active" : ""} onClick={() => handleClick(25)}>Bulk Category Upload</Link>
                      </li> */}
                    </ul>
                  </div>
                </div>

                <div className='accordion_item'>
                  <div
                    className={`accordionHeader ${activeIndexes.includes(5) ? 'active' : ''}`}
                    onClick={() => toggleAccordion(5)}
                  >
                    <span className="navicon">
                      <IoSettings />
                    </span>
                    Orders
                    <span className={`arrow arrow-right ${activeIndexes.includes(5) ? 'arrow-animate' : ''}`}>
                      <i className={`fa-solid fa-angle-right ${activeIndexes.includes(5) ? 'fa-angle-down' : ''}`}></i>
                    </span>
                  </div>
                  <div className={`accordionBody ${activeIndexes.includes(5) ? 'open slide-down' : 'slide-up'}`}> 
                    <ul className="side_nav_second_level">
                    <li className="side_nav_item">
                        <Link to="/admin/orders" className={activeIndex === 17 ? "active" : ""} onClick={() => handleClick(17)}>Orders</Link>
                      </li>
                      <li className="side_nav_item">
                        <Link to="/admin/transactions" className={activeIndex === 18 ? "active" : ""} onClick={() => handleClick(18)}>Transactions</Link>
                      </li>
                      <li className="side_nav_item">
                        <Link to="/admin/bank-transfers" className={activeIndex === 19 ? "active" : ""} onClick={() => handleClick(19)}>Bank Transfers</Link>
                      </li>
                      <li className="side_nav_item">
                        <Link to="/admin/invoices" className={activeIndex === 20 ? "active" : ""} onClick={() => handleClick(20)}>Invoices</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='accordion_item'>
                  <div
                    className={`accordionHeader ${activeIndexes.includes(6) ? 'active' : ''}`} onClick={() => toggleAccordion(6)} >
                    <span className="navicon">
                      <FaPaintbrush />
                    </span>
                    Appearance
                    <span className={`arrow arrow-right ${activeIndexes.includes(6) ? 'arrow-animate' : ''}`}>
                      <i className={`fa-solid fa-angle-right ${activeIndexes.includes(6) ? 'fa-angle-down' : ''}`}></i>
                    </span>
                  </div>
                  <div className={`accordionBody ${activeIndexes.includes(6) ? 'open slide-down' : 'slide-up'}`}>
                    <ul className="side_nav_second_level">
                    <li className="side_nav_item">
                        <Link to="/admin/appearance/media" className={activeIndex === 14 ? "active" : ""} onClick={() => handleClick(14)}>Media</Link>
                      </li>
                      <li className="side_nav_item">
                        <Link to="/admin/appearance/contact-form" className={activeIndex === 15 ? "active" : ""} onClick={() => handleClick(15)}>Contact Details</Link>
                      </li>
                      {/* <li className="side_nav_item">
                        <Link to="/admin/appearance/maps" className={activeIndex === 16 ? "active" : ""} onClick={() => handleClick(16)}>Maps</Link>
                      </li> */}
                    </ul>
                  </div>
                </div>    

                <div className='accordion_item'>
                  <div
                    className={`accordionHeader ${activeIndexes.includes(7) ? 'active' : ''}`}
                    onClick={() => toggleAccordion(7)}
                  >
                    <span className="navicon">
                      <IoSettings />
                    </span>
                    Settings
                    <span className={`arrow arrow-right ${activeIndexes.includes(7) ? 'arrow-animate' : ''}`}>
                      <i className={`fa-solid fa-angle-right ${activeIndexes.includes(7) ? 'fa-angle-down' : ''}`}></i>
                    </span>
                  </div>
                  <div className={`accordionBody ${activeIndexes.includes(7) ? 'open slide-down' : 'slide-up'}`}>
                    <ul className="side_nav_second_level">
                      <li className="side_nav_item">
                        <Link to="/admin/settings/app-setting" className={activeIndex === 21 ? "active" : ""} onClick={() => handleClick(21)}>App Setting</Link>
                      </li>
                      <li className="side_nav_item">
                        <Link to="/admin/settings/media-setting" className={activeIndex === 22 ? "active" : ""} onClick={() => handleClick(22)}>Media Setting</Link>
                      </li>
                    </ul>
                  </div>
                </div>         

              </div>


            </div>
            {/* ---------End ShortPanel--------- */}
          </div>
        </div>
      </div>
    </>
  )
}

export default LeftPanel

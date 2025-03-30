// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router";
import PageNotFound from "./admin/PageNotFound";
import Login from "./admin/Login";
import ForgotPassword from "./admin/ForgotPassword";
import Dashboard from "./admin/Dashboard";
import Prodects from "./admin/Prodects";
import Orders from "./admin/Orders";
import OrderDetails from "./admin/OrderDetails";
import Customers from "./admin/Customers";
import ShoppingCart from "./admin/ShoppingCart";
import Checkout from "./admin/Checkout";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Blog from "./pages/Blog";
import Media from "./appearance/Media";
import ContactForm from "./appearance/ContactForm";
import Maps from "./appearance/Maps";
import AppSetting from "./settings/AppSetting";
import MediaSetting from "./settings/MediaSetting";




function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Prodects />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order-details" element={<OrderDetails />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* <Route path="/sellers" element={<Index />} /> */}
            <Route path="/pages/home" element={<Index />} />
            <Route path="/pages/shop" element={<Shop />} />
            <Route path="/pages/about-us" element={<AboutUs />} />
            <Route path="/pages/contact-us" element={<ContactUs />} />
            <Route path="/pages/blog" element={<Blog />} />
            <Route path="/appearance/media" element={<Media />} />
            <Route path="/appearance/contact-form" element={<ContactForm />} />
            <Route path="/appearance/maps" element={<Maps />} />
            <Route path="/settings/app-setting" element={<AppSetting />} />
            <Route path="/settings/media-setting" element={<MediaSetting />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

    </>
  )
}

export default App

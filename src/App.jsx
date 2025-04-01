// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router";
import PageNotFound from "./admin/PageNotFound";
import Login from "./admin/Login";
import ForgotPassword from "./admin/ForgotPassword";
import Dashboard from "./admin/Dashboard";
import Products from "./admin/Products";
import Orders from "./admin/Orders";
import Transactions from "./admin/Transactions";
import Customers from "./admin/Customers";
import ShoppingCart from "./admin/ShoppingCart";
import Checkout from "./admin/Checkout";
import Index from "./pages/Index";
// import Shop from "./pages/Shop";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Blog from "./pages/Blog";
import Media from "./appearance/Media";
import ContactForm from "./appearance/ContactForm";
import Maps from "./appearance/Maps";
import AppSetting from "./settings/AppSetting";
import MediaSetting from "./settings/MediaSetting";
import AppLayout from "./components/AppLayout";
import BankTransfers from "./admin/BankTransfers";
import Invoices from "./admin/Invoices";
import SoldProducts from "./admin/SoldProducts";
import AddProduct from "./admin/AddProduct";
import DeletedProducts from "./admin/DeletedProducts";
import Categories from "./admin/Categories";
import AddCategory from "./admin/AddCategory";
import BulkCategoryUpload from "./admin/BulkCategoryUpload";
import EditCategory from "./admin/EditCategory";
import RestoreCategories from "./admin/RestoreCategories";
import EditProduct from "./admin/EditProduct";
import Terms from "./pages/Terms";
import Shipping from "./pages/Shipping";
import Refund from "./pages/Refund";
import Faq from "./pages/Faq";
import Privacy from "./pages/privacy";
import Slider from "./section/Slider";
import Member from "./section/Member";

function App() {
  // const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    { path: "/", 
      element: <AppLayout />, 
      children: [
        { path: "/admin/", element: <Dashboard />},
        { path:"/admin/login", element: <Login /> },
        { path: "/admin/forgot-password", element: <ForgotPassword />},
        { path: "/admin/products", element: <Products /> },
        { path: "/admin/add-product", element: <AddProduct /> },
        { path: "/admin/edit-product/:id", element: <EditProduct /> },
        { path: "/admin/sold-products", element: <SoldProducts /> },
        { path: "/admin/delete-products", element: <DeletedProducts /> },
        { path: "/admin/categories", element: <Categories /> },
        { path: "/admin/add-category", element: <AddCategory /> },
        { path: "/admin/edit-category/:id", element: <EditCategory /> },
        { path: "/admin/restore-category", element: <RestoreCategories /> },
        { path: "/admin/bulk-category-upload", element: <BulkCategoryUpload /> },
        { path: "/admin/orders", element: <Orders /> },
        { path: "/admin/transactions", element: <Transactions /> },
        { path: "/admin/bank-transfers", element: <BankTransfers /> },
        { path: "/admin/invoices", element: <Invoices /> },
        { path: "/admin/customers", element: <Customers /> },
        { path: "/admin/shopping-cart", element: <ShoppingCart /> },
        { path: "/admin/checkout", element: <Checkout /> },
        { path: "/admin/pages/home", element: <Index /> },
        { path: "/admin/section/slider", element: <Slider /> },
        { path: "/admin/section/member", element: <Member /> },
        { path: "/admin/pages/about-us", element: <AboutUs /> },
        { path: "/admin/pages/contact-us", element: <ContactUs /> },
        { path: "/admin/pages/blog", element: <Blog /> },
        { path: "/admin/pages/terms", element:<Terms/> },
        { path: "/admin/pages/shipping", element: <Shipping/> },
        { path: "/admin/pages/refund", element: <Refund/> },
        { path: "/admin/pages/faq", element:<Faq/> },
        { path: "/admin/pages/privacy", element:<Privacy/>  },
        { path: "/admin/appearance/media", element: <Media /> },
        { path: "/admin/appearance/contact-form", element: <ContactForm /> },
        // { path: "/admin/appearance/maps", element: <Maps /> },
        { path: "/admin/settings/app-setting", element: <AppSetting /> },
        { path: "/admin/settings/media-setting", element: <MediaSetting /> },
        { path: "*", element: <PageNotFound /> },
        { path: "/sellers", element: <Index /> }
      ]
    },
    

  ]);

  // return (
  //   <>
        {/* <BrowserRouter>
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
            <Route path="/checkout" element={<Checkout />} /> */}

            {/* <Route path="/sellers" element={<Index />} /> */}

            {/* <Route path="/pages/home" element={<Index />} />
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
        </BrowserRouter> */}


        

  //   </>
  // )

  return <RouterProvider router={router} />
}

export default App

import { Outlet } from "react-router"
import Footer from "./Footer"
import Header from "./Header"
import LeftPanel from "./LeftPanel"
import { useState } from "react"


const AppLayout = () => {

    const [sidebarToggle, setSidebarToggle ] = useState(false);




    return (
        <>
            <div className='body_wrapper'>
                <Header sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />

                <div className='panel_wrapper'>
                    <LeftPanel sidebarToggle={sidebarToggle} />
                    <div className={`${sidebarToggle ? "right_panel_expand" : ""} right_panel content_page`}>
                        <div className='content_box'>
                            <Outlet />
                        </div>
                        <Footer />
                    </div>

                </div>

            </div>
        </>
    )
}

export default AppLayout;
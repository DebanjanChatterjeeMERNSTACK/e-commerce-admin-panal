import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Link, NavLink } from "react-router";
import { TiPlus } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { TiEdit } from "react-icons/ti";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_URL;

const Categories = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const categoryitem = () => {
    fetch(`${URL}/catagory_get`, {
      headers: {
        // auth: document.cookie,
        login_id: localStorage.getItem("loginid"),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status == 200) {
          setData(json.catagory.filter((e) => e.product_Catagory_Delete === 0));
        } else {
          Swal.fire({
            title: json.text,
            icon: json.mess, // 'success', 'error', 'warning', 'info', or 'question'
            confirmButtonText: "Ok",
          });
        }
      });
  };

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const currentData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );




  const handleDelete = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${URL}/catagory_update_delete`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id:id,product_Catagory_delete_update:1 }),
        })
          .then((res) => res.json())
          .then((data) => {
            if(data.status==200){
              Swal.fire({
                title: data.text,
                icon: data.mess, // 'success', 'error', 'warning', 'info', or 'question'
                confirmButtonText: "Ok",
              });
             categoryitem()
              // setcategory(Category.filter((item) => item._id !== id));
              
            }else{
              Swal.fire({
                title: data.text,
                icon: data.mess, // 'success', 'error', 'warning', 'info', or 'question'
                confirmButtonText: "Ok",
              });
            }
           
            
          });
      }
    });
  };




  useEffect(() => {
    categoryitem();
  }, []);
  return (
    <>
      <div className="content">
        <div className="container-fluid">
          <div className="panel_contentbox">
            <div className="titleBox">
              <h5 className="box_title"> Categories </h5>
              <Link className="btn btn-primary btn1" to="/admin/add-category">
                <TiPlus /> Add Category
              </Link>
            </div>
            {/* <div className='panel_group'>

              <div className='category_panel_base'>
                <div className='category_panel_group'>
                <div className='panel panel_default category_item'>
                  <div className='panel_heading'>
                    <div className='panel_leftpt'><IoMdArrowDropright /> Featured</div>
                    <div className='panel_rightpt'>
                      <label class="label bg-teal">Featured</label>
                      <label class="label bg-danger">Hidden</label>
                      <div className='group__btn'>
                        <Link className='btn btn-sm'to={`/admin/edit-category/`}>Edit</Link>
                        <Link className='btn btn-sm'><RiDeleteBin6Line /></Link>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                <div className='category_panel_group'>
                <div className='panel panel_default category_item'>
                  <div className='panel_heading'>
                    <div className='panel_leftpt'><IoMdArrowDropright /><IoMdArrowDropdown /> Skincare</div>
                    <div className='panel_rightpt'>
                      <label class="label bg-warning">Main Menu</label>
                      <label class="label bg-olive">Visible</label>
                      <div className='group__btn'>
                        <Link className='btn btn-sm'>Edit</Link>
                        <Link className='btn btn-sm'><RiDeleteBin6Line /></Link>
                      </div>
                    </div>
                  </div>
                  <div className='panel-collapse collapse'>
                    <div className='panel_body nested_sortable'>
                    <div className='category_panel_group'>
                      <div className='panel panel_default category_item'>
                        <div className='panel_heading'>
                          <div className='panel_leftpt'><IoMdArrowDropright /> Face Wash</div>
                          <div className='panel_rightpt'>
                            <label class="label bg-warning">Main Menu</label>
                            <label class="label bg-olive">Visible</label>
                            <div className='group__btn'>
                              <Link className='btn btn-sm'>Edit</Link>
                              <Link className='btn btn-sm'><RiDeleteBin6Line /></Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='category_panel_group'>
                      <div className='panel panel_default category_item'>
                        <div className='panel_heading'>
                          <div className='panel_leftpt'><IoMdArrowDropright /> Face Moisturizer</div>
                          <div className='panel_rightpt'>
                            <label class="label bg-warning">Main Menu</label>
                            <label class="label bg-olive">Visible</label>
                            <div className='group__btn'>
                              <Link className='btn btn-sm'>Edit</Link>
                              <Link className='btn btn-sm'><RiDeleteBin6Line /></Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
                </div>  
                <div className='category_panel_group'>
                <div className='panel panel_default category_item'>
                  <div className='panel_heading'>
                    <div className='panel_leftpt'><IoMdArrowDropright /> Shop By Category</div>
                    <div className='panel_rightpt'>
                      <label class="label bg-warning">Main Menu</label>
                      <label class="label bg-olive">Visible</label>
                      <div className='group__btn'>
                        <Link className='btn btn-sm'>Edit</Link>
                        <Link className='btn btn-sm'><RiDeleteBin6Line /></Link>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div> */}
            <div
              style={{
                minHeight: "100vh",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ width: "100%", overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    textAlign: "left",
                    border: "1px solid gray",
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        ID
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        Category Image
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                       Category Name
                      </th>
                      {/* <th style={{ padding: "10px", border: "1px solid gray" }}>
                      Sub Category Name
                      </th> */}
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                      Meta Title
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                       Meta Description
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                      Meta Keywords
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((item, id) => (
                      <tr
                        key={id}
                        style={{
                          border: "1px solid gray",
                        }}
                      >
                        <td
                          style={{ padding: "10px", border: "1px solid gray" }}
                        >
                          {id + 1}
                        </td>

                        <td
                          style={{ padding: "10px", border: "1px solid gray" }}
                        >
                          <img
                            src={item.product_Catagory_Image}
                            style={{ width: "50px", height: "50px" }}
                          />
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid gray" }}
                        >
                          {item.product_Catagory_Name}
                        </td>
                        {/* <td
                          style={{ padding: "10px", border: "1px solid gray" }}
                        >
                          {item.product_SubCategory_Name.map((e, i) => {
                            return (
                              <>
                                <table style={{ width: "100%"}} key={i}>
                                  <tbody>
                                  <tr>
                                    <td style={{ padding: "10px", border: "1px solid gray" }}>{e.SubCategoryname}</td>
                                  </tr>
                                  </tbody>
                                </table>
                              </>
                            );
                          })}
                        </td> */}
                        <td
                          style={{ padding: "10px", border: "1px solid gray" }}
                        >
                          {item.product_Meta_Title}
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid gray" }}
                        >
                          {item.product_Meta_Description}
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid gray" }}
                        >
                          {item.product_Meta_Keywords}
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid gray" }}
                        >
                          <div style={{ display: "flex" }}>
                          <RiDeleteBin6Line style={{ fontSize:"25px", marginRight:"5px",cursor:"pointer" }} title="delete" onClick={()=>handleDelete(item._id)}/>
                          <NavLink to={`/admin/edit-category/${item._id}`} style={{color:"white"}}><TiEdit style={{ fontSize:"25px",cursor:"pointer" }} title="edit"/></NavLink>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    backgroundColor: "#555",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    opacity: currentPage === 1 ? 0.5 : 1,
                  }}
                >
                  Prev
                </button>
                <span style={{ padding: "10px" }}>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    backgroundColor: "#555",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    opacity: currentPage === totalPages ? 0.5 : 1,
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;

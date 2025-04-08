
import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { createPopper } from "@popperjs/core";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_URL;

const ContactUs = () => {
  const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
  
    const fetchItems = () => {
      fetch(`${URL}/product_get`, {
        // method: "POST",
        headers: {
          // auth: document.cookie,
          login_id: localStorage.getItem("loginid"),
          // "Content-Type": "application/json",
        },
        // body:JSON.stringify({ login_id: localStorage.getItem("loginid")})
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status == 200) {
            setData(json.product.filter((e) => e.product_Delete === 0));
          } else {
            Swal.fire({
              title: json.text,
              icon: json.mess, // 'success', 'error', 'warning', 'info', or 'question'
              confirmButtonText: "Ok",
            });
          }
        });
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
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
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`${URL}/product_delete_tempo`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id}),
          })
            .then((res) => res.json())
            .then((datas) => {
              if (datas.status == 200) {
                Swal.fire({
                  title: datas.text,
                  icon: datas.mess, // 'success', 'error', 'warning', 'info', or 'question'
                  confirmButtonText: "Ok",
                });
                // fetchItems();
                setData(data.filter((item) => item._id !== id));
              } else {
                Swal.fire({
                  title: datas.text,
                  icon: datas.mess, // 'success', 'error', 'warning', 'info', or 'question'
                  confirmButtonText: "Ok",
                });
              }
            });
        }
      });
    };
  
  
  return (
    <>
      <div className="content">
        <div className="container-fluid">
          <div className="panel_contentbox">
            <h5 className="box_title">Contact List </h5>
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
                        Action
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        Full Name
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                       Email Id
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        Phone Number
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        Message
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
                          <div style={{ display: "flex" }}>
                            <RiDeleteBin6Line
                              style={{
                                fontSize: "25px",
                                marginRight: "5px",
                                cursor: "pointer",
                              }}
                              title="delete"
                              onClick={() => handleDelete(item._id)}
                            />
                          </div>
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid gray" }}
                        >
                          <img
                            src={item.product_Image[0]}
                            width={"50px"}
                            height={"50px"}
                          />
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid gray" }}
                        >
                          {item.product_Title}
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid gray" }}
                        >
                          {item.product_Category}
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid gray" }}
                        >
                          {item.product_Sub_Category}
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
  )
}

export default ContactUs

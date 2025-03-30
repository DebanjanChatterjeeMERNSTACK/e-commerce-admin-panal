import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { createPopper } from "@popperjs/core";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_URL;

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [stock, setstock] = useState("");

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
          body: JSON.stringify({ id: id, product_Delete: 1 }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status == 200) {
              Swal.fire({
                title: data.text,
                icon: data.mess, // 'success', 'error', 'warning', 'info', or 'question'
                confirmButtonText: "Ok",
              });
              fetchItems();
              // setcategory(Category.filter((item) => item._id !== id));
            } else {
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

  const handlchange = (e, id) => {
    const value = e.target.value;
  
    fetch(`${URL}/product_update_stock`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ✅ Required for JSON body
      },
      body: JSON.stringify({
        id: id,
        product_Stock: value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 200) {
          Swal.fire({
            title: data.text,
            icon: data.mess, // 'success', 'error', 'warning', 'info', or 'question'
            confirmButtonText: "Ok",
          });
          fetchItems();
          // setcategory(Category.filter((item) => item._id !== id));
        } else {
          Swal.fire({
            title: data.text,
            icon: data.mess, // 'success', 'error', 'warning', 'info', or 'question'
            confirmButtonText: "Ok",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  

  return (
    <>
      <div className="content">
        <div className="container-fluid">
          <div className="panel_contentbox">
            <h5 className="box_title">Product </h5>
            {/* <div className="panel_group">
              <div className="table-responsive">
                <table className="table list_table">
                  <tbody>
                    <tr>
                      <th>
                        <input type="checkbox" className="form-check-input" />
                      </th>
                      <th>ID</th>
                      <th>Product</th>
                      <th>SKU</th>
                      <th>Product Type</th>
                      <th>Category</th>
                      <th>User</th>
                      <th>Stock</th>
                      <th>Page View</th>
                      <th>Date</th>
                      <th>Option</th>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" className="form-check-input" />
                      </td>
                      <td>1326</td>
                      <td>
                        <div className="product_listview">
                          <div className="product_imgbox"></div>{" "}
                          <p className="product_name">Mango</p>
                        </div>
                      </td>
                      <td>PM006</td>
                      <td>Fruit</td>
                      <td>Fruit</td>
                      <td>Won</td>
                      <td>
                        <span className="outstock instock">In Stock (100)</span>
                      </td>
                      <td>5</td>

                      <td>08-02-2025</td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                          >
                            Select an option
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#">View</Dropdown.Item>
                            <Dropdown.Item href="#">Edit</Dropdown.Item>
                            <Dropdown.Item href="#">Delete</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>

                        <DropdownButton
                          id="dropdown-basic-button"
                          title="Dropdown button"
                        >
                          <Dropdown.Item href="#/action-1">
                            Action
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-2">
                            Another action
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-3">
                            Something else
                          </Dropdown.Item>
                        </DropdownButton>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                        Action
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        Product Image
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        Product Title
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        Product Category
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        Product Sub Category
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        product Main Price
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        Product Selling Price
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        Product Offer Percentage
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        Product Quantity
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        Product Stock
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        Product Weight
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        Product Brand
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        Product Rating
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        Product SKU
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        Product Warranty Information
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        Product Hit
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        Product Shipping Information
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
                            <NavLink
                              to={`/admin/edit-product/${item._id}`}
                              style={{ color: "white" }}
                            >
                              <TiEdit
                                style={{ fontSize: "25px", cursor: "pointer" }}
                                title="edit"
                              />
                            </NavLink>
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
                        <td
                          style={{ padding: "10px", border: "1px solid gray" }}
                        >
                          {item.product_Main_Price}
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid gray" }}
                        >
                          {item.product_Selling_Price}
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid gray" }}
                        >
                          {item.product_Offer_Percentage}
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid gray" }}
                        >
                          {`${item.product_Quantity} ${item.product_Quantity_unit}`}
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid gray" }}
                        >
                          <div className="custom-select">
                            <select
                              className="form-select"
                              // value={stock}
                              onChange={(e) => handlchange(e, item._id)}
                            >
                              <option value="" disabled selected>
                                {item.product_Stock}
                              </option>
                              <option value="In Stock">In Stock</option>
                              <option value="Out Stock">Out Stock</option>
                            </select>
                          </div>
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid gray" }}
                        >
                          {`${item.product_Weight} ${item.product_Weight_units}`}
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid gray" }}
                        >
                          {item.product_Brand}
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid gray" }}
                        >
                          {item.product_rating}
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid gray" }}
                        >
                          {item.product_SKU}
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid gray" }}
                        >
                          {item.product_Warranty_Information}
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid gray" }}
                        >
                          {item.product_hit}
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid gray" }}
                        >
                          {item.product_Shipping_Information}
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

export default Products;

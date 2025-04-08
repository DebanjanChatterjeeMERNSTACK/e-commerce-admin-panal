import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";
import { TiPlus } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";
import { TiEdit } from "react-icons/ti";
const URL = import.meta.env.VITE_URL;

const Blog = () => {
  const [key, setKey] = useState(Date.now());
  const [blog_Description, setblog_Description] = useState("");
  const [blog_Title, setblog_Title] = useState("");
  const [file, setfile] = useState("");
  const [blogimage, setblogimage] = useState("");
  const [preimage, setpreImage] = useState("");

  const [toggal, settoggal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setloader] = useState(true);
  const [id, setid] = useState("");
  const [data, setData] = useState([]);

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const currentData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  console.log(currentData);

  const deleteFile = () => {
    setblogimage(null);
    setfile(null);
    setKey(Date.now());
  };

  const handleedit = (id) => {
    if (id) {
      const datas = data.filter((e) => e._id === id);
      //console.log(datas)
      setblog_Description(datas[0].blog_Description);
      setblog_Title(datas[0].blog_Title);
      setid(datas[0]._id);
      setpreImage(datas[0].blog_Image);
      settoggal(true);
    }
  };

  const blogdata = () => {
    fetch(`${URL}/get_blog`, {
      headers: {
        // auth: document.cookie,
        login_id: localStorage.getItem("loginid"),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status == 200) {
          setData(json.blogdata);
        } else {
          Swal.fire({
            title: json.text,
            icon: json.mess,
            confirmButtonText: "Ok",
          });
        }
      });
  };
  useEffect(() => {
    blogdata();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setloader(false);

    if (!toggal) {
      let formdata = new FormData();
      formdata.append("login_id", localStorage.getItem("loginid"));
      formdata.append("blog_Title", blog_Title);
      formdata.append("blog_Description", blog_Description);
      formdata.append("blog_Image", blogimage);

      fetch(`${URL}/add_blog`, {
        method: "POST",
        body: formdata,
      })
        .then((response) => response.json())
        .then((data) => {
          setloader(true);
          if (data.status == 200) {
            setblog_Description("");
            setblog_Title("");
            setid("");
            deleteFile()
            blogdata();
            Swal.fire({
              title: data.text,
              icon: data.mess, // 'success', 'error', 'warning', 'info', or 'question'
              confirmButtonText: "Ok",
            });
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
    } else {
      let formdata = new FormData();
      formdata.append("id", id);
      formdata.append("blog_Title", blog_Title);
      formdata.append("blog_Description", blog_Description);
      formdata.append("blog_Image", blogimage);

      fetch(`${URL}/blog_update`, {
        method: "POST",
        body: formdata,
      })
        .then((response) => response.json())
        .then((data) => {
          setloader(true);
          if (data.status == 200) {
            blogdata();
            setblog_Description("");
            setblog_Title("");
            setid("");
            deleteFile()
            settoggal(false);
            Swal.fire({
              title: data.text,
              icon: data.mess, // 'success', 'error', 'warning', 'info', or 'question'
              confirmButtonText: "Ok",
            });
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
    }
  };

  const handleDelete = (id) => {
    fetch(`${URL}/blog_delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setloader(true);
        if (json.status == 200) {
         
          settoggal(false);
          Swal.fire({
            title: json.text,
            icon: json.mess, // 'success', 'error', 'warning', 'info', or 'question'
            confirmButtonText: "Ok",
          });
          setData(data.filter((item) => item._id !== id));
          // blogdata();
          // setblog_Description("");
          // setblog_Title("");
          // setid("");
          deleteFile()
        } else {
          Swal.fire({
            title: json.text,
            icon: json.mess, // 'success', 'error', 'warning', 'info', or 'question'
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
            <h5 className="box_title">Blog</h5>
            <form onSubmit={handleSubmit}>
              <div className="panel_group">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Blog Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="blog_Title"
                        placeholder="Blog Title"
                        required
                        value={blog_Title}
                        onChange={(e) =>
                          setblog_Title(
                            e.target.value.charAt(0).toUpperCase() +
                              e.target.value.slice(1)
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Blog Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        placeholder="Blog Description"
                        required
                        value={blog_Description}
                        onChange={(e) =>
                          setblog_Description(
                            e.target.value.charAt(0).toUpperCase() +
                              e.target.value.slice(1)
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label w-100">Image</label>
                      <div className="add_catimgbtn">
                        <span>Upload Image</span>
                        <input
                          key={key}
                          type="file"
                          className="form-control"
                          id=""
                          placeholder="Image"
                          accept=".jpg, .jpeg"
                          required={id?false:true}
                          onChange={(e) => {
                            if (!e.target.files || e.target.files.length === 0)
                              return;

                            const file = e.target.files[0];
                            const reader = new FileReader();

                            reader.onload = (event) => {
                              setfile(event.target.result); // Base64 URL
                            };

                            reader.readAsDataURL(file);
                            setblogimage(file);
                          }}
                        />
                      </div>
                      <div className="add_cat_imgbox">
                        {file ? (
                          <>
                            <img src={file} />
                            <RxCrossCircled
                              style={{
                                color: "red",
                                fontSize: "20px",
                                position: "absolute",
                                top: "0px",
                                right: "0px",
                                cursor: "pointer",
                              }}
                              onClick={deleteFile}
                            />
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      {id ? (
                        <>
                          <p>Previous blog Image</p>
                          <img
                            src={preimage}
                            style={{ width: "200px", height: "100px" }}
                          />
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="btn_groupbox btn_right mt-5 mb-5">
                      {loader ? (
                        toggal ? (
                          <button className="btn btn-primary btn1">
                            Update Blog
                          </button>
                        ) : (
                          <button className="btn btn-primary btn1">
                            Save Blog
                          </button>
                        )
                      ) : (
                        <button className="btn btn-primary btn1" disabled>
                          <Oval
                            visible={true}
                            height="20"
                            width="20"
                            color="#fff"
                            ariaLabel="oval-loading"
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="panel_contentbox">
            {/* <div className="titleBox">
              <h5 className="box_title"> Categories </h5>
              <Link className="btn btn-primary btn1" to="/admin/add-category">
                <TiPlus /> Add Category
              </Link>
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
                        Blog Image
                      </th>

                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        Blog Title
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        Blog Description
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData &&
                      currentData.map((item, id) => {
                        return (
                          <tr
                            key={id}
                            style={{
                              border: "1px solid gray",
                            }}
                          >
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid gray",
                              }}
                            >
                              {id + 1}
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid gray",
                              }}
                            >
                              <img
                                src={item.blog_Image}
                                style={{ width: "50px", height: "50px" }}
                              />
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid gray",
                              }}
                            >
                              {item.blog_Title}
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid gray",
                              }}
                            >
                              {item.blog_Description}
                            </td>

                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid gray",
                              }}
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

                                <TiEdit
                                  style={{
                                    fontSize: "25px",
                                    cursor: "pointer",
                                  }}
                                  title="edit"
                                  onClick={() => handleedit(item._id)}
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
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
export default Blog;

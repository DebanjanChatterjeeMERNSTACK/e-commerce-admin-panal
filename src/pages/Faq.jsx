import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";
import { TiPlus } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
const URL = import.meta.env.VITE_URL;

const Faq = () => {
  const [answer, setanswer] = useState("");
  const [questions, setquestions] = useState("");
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

  const handleedit = (id) => {
    if (id) {
      const datas = data.filter((e) => e._id === id);
      //console.log(datas)
      setanswer(datas[0].Answer);
      setquestions(datas[0].Question);
      setid(datas[0]._id);
      settoggal(true);
    }
  };

  const faqdata = () => {
    fetch(`${URL}/faq_get`, {
      headers: {
        // auth: document.cookie,
        login_id: localStorage.getItem("loginid"),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status == 200) {
          

          setData(json.faq);
         
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
    faqdata();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setloader(false);

    if (!toggal) {
      fetch(`${URL}/add_faq`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login_id: localStorage.getItem("loginid"),
          Question: questions,
          Answer: answer,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setloader(true);
          if (data.status == 200) {
            setanswer("");
            setquestions("");
            setid("");
            faqdata();
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
      fetch(`${URL}/faq_update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          Question: questions,
          Answer: answer,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setloader(true);
          if (data.status == 200) {
            faqdata();
            setanswer("");
            setquestions("");
            setid("");
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

  const handleDelete=(id)=>{

    fetch(`${URL}/faq_delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setloader(true);
        if (data.status == 200) {
          faqdata();
          setanswer("");
          setquestions("");
          setid("");
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

  return (
    <>
      <div className="content">
        <div className="container-fluid">
          <div className="panel_contentbox">
            <h5 className="box_title">FAQ</h5>
            <form onSubmit={handleSubmit}>
              <div className="panel_group">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Questions</label>
                      <input
                        type="text"
                        className="form-control"
                        id="questions"
                        placeholder="questions"
                        required
                        value={questions}
                        onChange={(e) =>
                          setquestions(
                            e.target.value.charAt(0).toUpperCase() +
                              e.target.value.slice(1)
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Answer</label>
                      <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        placeholder="answer"
                        required
                        value={answer}
                        onChange={(e) =>
                          setanswer(
                            e.target.value.charAt(0).toUpperCase() +
                              e.target.value.slice(1)
                          )
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="btn_groupbox btn_right mt-5 mb-5">
                      {loader ? (
                        toggal ? (
                          <button className="btn btn-primary btn1">
                            Update FAQ
                          </button>
                        ) : (
                          <button className="btn btn-primary btn1">
                            Save FAQ
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
                        Questions
                      </th>
                      <th style={{ padding: "10px", border: "1px solid gray" }}>
                        Answer
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
                              {item.Question}
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid gray",
                              }}
                            >
                              {item.Answer}
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
export default Faq;

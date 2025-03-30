import React, { useState, useEffect } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaCircleExclamation } from "react-icons/fa6";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";
import { Link } from "react-router";
import { RxCrossCircled } from "react-icons/rx";

const URL = import.meta.env.VITE_URL;

const ContactForm = () => {
  const [Phone_number1, setPhone_number1] = useState("");
  const [Phone_number2, setPhone_number2] = useState("");

  const [Email_id1, setEmail_id1] = useState("");
  const [Email_id2, setEmail_id2] = useState("");

  const [Address1, setAddress1] = useState("");
  const [Address2, setAddress2] = useState("");

  const [Map, setMap] = useState("");



  const [toggal, settoggal] = useState(false);

  const [id, setid] = useState("");

  const [loader, setloader] = useState(true);

  useEffect(() => {
    fetch(`${URL}/contact_get`, {
      headers: {
        // auth: document.cookie,
        login_id: localStorage.getItem("loginid"),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status == 200) {
          console.log(json.contact);
          setPhone_number1(json.contact[0].Phone_number1);
          setPhone_number2(json.contact[0].Phone_number2);
          setEmail_id1(json.contact[0].Email_id1);
          setEmail_id2(json.contact[0].Email_id2);
          setAddress1(json.contact[0].Address1);
          setAddress2(json.contact[0].Address2);
          setid(json.contact[0]._id);
          setMap(json.contact[0].Map)
          settoggal(true);
        } else {
          Swal.fire({
            title: json.text,
            icon: json.mess,
            confirmButtonText: "Ok",
          });
          settoggal(false);
        }
      });
  }, []);




  const handleSubmit = (e) => {
    e.preventDefault();
    setloader(false);

    if(!toggal){
    fetch(`${URL}/contact_save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login_id: localStorage.getItem("loginid"),
        Address1: Address1,
        Address2: Address2,
        Email_id2: Email_id2,
        Email_id1: Email_id1,
        Phone_number1: Phone_number1,
        Phone_number2: Phone_number2,
        Map:Map
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setloader(true);
        if (data.status == 200) {
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
    }else{
      fetch(`${URL}/contact_update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          Address1: Address1,
          Address2: Address2,
          Email_id2: Email_id2,
          Email_id1: Email_id1,
          Phone_number1: Phone_number1,
          Phone_number2: Phone_number2,
          Map:Map
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setloader(true);
          if (data.status == 200) {
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

  return (
    <>
      <div className="content">
        <div className="container-fluid">
          <div className="panel_contentbox">
            <h5 className="box_title">Add Contact</h5>
            <form onSubmit={handleSubmit}>
              <div className="panel_group">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <h6 className="panel_title">Details</h6>
                    <div className="mb-3">
                      <label className="form-label">Address 1</label>
                      <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        placeholder="Address 1"
                        required
                        value={Address1}
                        onChange={(e) =>
                          setAddress1(
                            e.target.value.charAt(0).toUpperCase() +
                              e.target.value.slice(1)
                          )
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Address 2</label>
                      <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        placeholder="Address 2"
                        value={Address2}
                        onChange={(e) =>
                          setAddress2(
                            e.target.value.charAt(0).toUpperCase() +
                              e.target.value.slice(1)
                          )
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Map (Embed a map)</label>
                      <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        placeholder="Map"
                        required
                        value={Map}
                        onChange={(e) =>
                          setMap(
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Phone Number 1</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Phone Number 1"
                        required
                        value={Phone_number1}
                        onChange={(e) => {
                          const value = e.target.value;

                          // Prevent entering '0' as the first character
                          if (value === "0") {
                            setPhone_number1("");
                            return;
                          }

                          // Ensure only numbers and restrict value to 1 or greater
                          const numberValue = parseInt(value, 10);
                          setPhone_number1(
                            isNaN(numberValue) || numberValue < 1
                              ? ""
                              : numberValue
                          );
                        }}
                        min="1"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Phone Number 2</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Phone Number 2"
                        value={Phone_number2}
                        onChange={(e) => {
                          const value = e.target.value;

                          // Prevent entering '0' as the first character
                          if (value === "0") {
                            setPhone_number2("");
                            return;
                          }

                          // Ensure only numbers and restrict value to 1 or greater
                          const numberValue = parseInt(value, 10);
                          setPhone_number2(
                            isNaN(numberValue) || numberValue < 1
                              ? ""
                              : numberValue
                          );
                        }}
                        min="1"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Email Id 1</label>
                      <input
                        type="email"
                        className="form-control"
                        id="title"
                        placeholder="Email Id 1"
                        required
                        value={Email_id1}
                        onChange={(e) => setEmail_id1(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Email Id 2</label>
                      <input
                        type="email"
                        className="form-control"
                        id="title"
                        placeholder="Email Id 2"
                        value={Email_id2}
                        onChange={(e) => setEmail_id2(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="btn_groupbox btn_right mt-5">
                      {loader ? (
                        toggal ? (
                          <button className="btn btn-primary btn1" >
                            Update Contact
                          </button>
                        ) : (
                          <button className="btn btn-primary btn1">
                            Save Contact
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
    </>
  );
};

export default ContactForm;

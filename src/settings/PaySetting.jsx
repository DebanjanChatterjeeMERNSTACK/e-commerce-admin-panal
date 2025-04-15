import React, { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaCircleExclamation } from "react-icons/fa6";
import { Form } from "react-bootstrap";
import { RxCrossCircled } from "react-icons/rx";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";

const URL = import.meta.env.VITE_URL;

const PaySetting = () => {
  const [cashvisible, setcashvisible] = useState(false);
  const [keyId, setkeyId] = useState("");
  const [toggal, settoggal] = useState(false);
  const [keySecret, setkeySecret] = useState("");
  const [id, setid] = useState("");
  const [loader, setloader] = useState(true);


  const fecthdata = () => {
    fetch(`${URL}/payment_key_get`, {
      headers: {
        // auth: document.cookie,
        login_id: localStorage.getItem("loginid"),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status == 200) {
          setkeyId(json.Payments.KEY_ID);
          setkeySecret(json.Payments.KEY_SECRET);
          setcashvisible(json.Payments.Cash);
          setid(json.Payments._id);
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
  };


  useEffect(() => {
    fecthdata();
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();
    setloader(false);
    if (!toggal) {
      const payload = {
        login_id: localStorage.getItem("loginid"),
        KEY_ID: keyId,
        KEY_SECRET: keySecret,
        Cash: cashvisible,
      };
      fetch(`${URL}/add_payment_key`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          setloader(true);
          if (data.status == 200) {
            fecthdata();
            Swal.fire({
              title: data.text,
              icon: data.mess, // 'success', 'error', 'warning', 'info', or 'question'
              confirmButtonText: "Ok",
            });
            // navigate("/list-catagory");
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


      const payload = {
        id: id,
        KEY_ID: keyId,
        KEY_SECRET: keySecret,
        Cash: cashvisible,
      };

      fetch(`${URL}/payment_key_update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setloader(true);
          if (data.status == 200) {
             fecthdata();
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
          <form onSubmit={handleSubmit}>
            <div className="panel_contentbox">
              <h5 className="box_title">Razorpay</h5>
              <div className="panel_group">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">KEY_ID</label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        placeholder="KEY_ID"
                        value={keyId}
                        onChange={(e) => setkeyId(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">KEY_SECRET</label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        placeholder="KEY_SECRET"
                        value={keySecret}
                        onChange={(e) => setkeySecret(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-3">
                      <div className="row">
                        <div className="col-sm-4 col-xs-12">
                          <label>Cash On Delivery</label>
                        </div>
                        <div className="col-sm-4 col-xs-12">
                          <Form.Check
                            type="radio"
                            label="Show"
                            name="visibility_radio"
                            id=""
                            value="true"
                            onChange={(e) =>
                              setcashvisible(JSON.parse(e.target.value))
                            }
                            checked={cashvisible === true}
                          />
                        </div>
                        <div className="col-sm-4 col-xs-12">
                          <Form.Check
                            type="radio"
                            label="Hide"
                            name="visibility_radio"
                            id=""
                            value="false"
                            onChange={(e) =>
                              setcashvisible(JSON.parse(e.target.value))
                            }
                            checked={cashvisible === false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="btn_groupbox btn_right mt-5">
                      {loader ? (
                        toggal ? (
                          <button className="btn btn-primary btn1">
                            Update Pay Key
                          </button>
                        ) : (
                          <button className="btn btn-primary btn1">
                            Save Pay Key
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaySetting;

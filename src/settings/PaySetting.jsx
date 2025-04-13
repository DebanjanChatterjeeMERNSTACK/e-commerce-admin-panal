import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaCircleExclamation } from "react-icons/fa6";
import { Form } from "react-bootstrap";
import { RxCrossCircled } from "react-icons/rx";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";

const URL = import.meta.env.VITE_URL;

const PaySetting = () => {
  const [categoryvisible, setcategoryvisible] = useState(false);

  const [Categoryorder, setCategoryorder] = useState("");
  const [toggal, settoggal] = useState(false);
  const [metaKeywords, setmetaKeywords] = useState("");

  const [loader, setloader] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setloader(false);

    fetch(`${URL}/catagory_save`, {
      method: "POST",
      body: formdata,
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
  };
  return (
    <>
      <div className="content">
        <div className="container-fluid">
          <form onSubmit={handleSubmit}>
            <div className="panel_contentbox">
              <h5 className="box_title">Add Category</h5>
              <div className="panel_group">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Keywords (Meta Tag)</label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        placeholder="Keywords (Meta Tag)"
                        value={metaKeywords}
                        onChange={(e) => setmetaKeywords(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Keywords (Meta Tag)</label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        placeholder="Keywords (Meta Tag)"
                        value={metaKeywords}
                        onChange={(e) => setmetaKeywords(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-3">
                      <div className="row">
                        <div className="col-sm-4 col-xs-12">
                          <label>Visibility</label>
                        </div>
                        <div className="col-sm-4 col-xs-12">
                          <Form.Check
                            type="radio"
                            label="Show"
                            name="visibility_radio"
                            id=""
                            value="true"
                            onChange={(e) =>
                              setcategoryvisible(JSON.parse(e.target.value))
                            }
                            checked={categoryvisible === true}
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
                              setcategoryvisible(JSON.parse(e.target.value))
                            }
                            checked={categoryvisible === false}
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

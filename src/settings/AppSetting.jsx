import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";
import { TiPlus } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";
import { TiEdit } from "react-icons/ti";
const URL = import.meta.env.VITE_URL;

const AppSetting = () => {
  const [key, setKey] = useState(Date.now());
  
  const [file, setfile] = useState("");
  const [logoimage, setlogoimage] = useState("");
  const [preimage, setpreImage] = useState("");

  const [toggal, settoggal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setloader] = useState(true);
  const [id, setid] = useState("");
  const [data, setData] = useState([]);

 
 
 

  const deleteFile = () => {
    setlogoimage(null);
    setfile(null);
    setKey(Date.now());
  };

 

  const logodata = () => {
    fetch(`${URL}/logo_get`, {
      headers: {
        // auth: document.cookie,
        login_id: localStorage.getItem("loginid"),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status == 200) {
          setpreImage(json.logo.logo);
          // console.log(json.logo)
          setid(json.logo._id)
          settoggal(true)
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
    logodata();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setloader(false);

    if (!toggal) {
      let formdata = new FormData();
      formdata.append("login_id", localStorage.getItem("loginid"));
      formdata.append("logo_Image", logoimage);

      fetch(`${URL}/logo_save`, {
        method: "POST",
        body: formdata,
      })
        .then((response) => response.json())
        .then((data) => {
          setloader(true);
          if (data.status == 200) {
            logodata();
            deleteFile()
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
      formdata.append("logo_Image", logoimage);

      fetch(`${URL}/logo_update`, {
        method: "POST",
        body: formdata,
      })
        .then((response) => response.json())
        .then((data) => {
          setloader(true);
          if (data.status == 200) {
            logodata();
            deleteFile();
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
            <h5 className="box_title">LOGO</h5>
            <form onSubmit={handleSubmit}>
              <div className="panel_group">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label w-100">LOGO</label>
                      <div className="add_catimgbtn">
                        <span>Upload LOGO</span>
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
                            setlogoimage(file);
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
                          <p>Previous Logo Image</p>
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
                            Update Logo
                          </button>
                        ) : (
                          <button className="btn btn-primary btn1">
                            Save Logo
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
export default AppSetting;

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";
import { RxCrossCircled } from "react-icons/rx";
const URL = import.meta.env.VITE_URL;

const AboutUs = () => {
  const [key, setKey] = useState(Date.now());
  const [about_Description, setabout_Description] = useState("");
  const [about_Title, setabout_Title] = useState("");
  const [file, setfile] = useState("");
  const [aboutimage, setaboutimage] = useState("");
  const [preimage, setpreImage] = useState("");

  const [toggal, settoggal] = useState(false);

  const [loader, setloader] = useState(true);
  const [id, setid] = useState("");

  const deleteFile = () => {
    setaboutimage(null);
    setfile(null);
    setKey(Date.now());
  };

  const aboutdata = () => {
    fetch(`${URL}/get_about`, {
      headers: {
        // auth: document.cookie,
        login_id: localStorage.getItem("loginid"),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status == 200) {
          setabout_Description(json.aboutdata.about_Description);
          setpreImage(json.aboutdata.about_Image);
          setabout_Title(json.aboutdata.about_Title);
          setid(json.aboutdata._id);
          settoggal(true);
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
    aboutdata();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setloader(false);

    if (!toggal) {
      let formdata = new FormData();
      formdata.append("login_id", localStorage.getItem("loginid"));
      formdata.append("about_Title", about_Title);
      formdata.append("about_Description", about_Description);
      formdata.append("about_Image", aboutimage);

      fetch(`${URL}/add_about`, {
        method: "POST",
        body: formdata,
      })
        .then((response) => response.json())
        .then((data) => {
          setloader(true);
          if (data.status == 200) {
          
            deleteFile();
            aboutdata();
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
      formdata.append("about_Title", about_Title);
      formdata.append("about_Description", about_Description);
      formdata.append("about_Image", aboutimage);

      fetch(`${URL}/about_update`, {
        method: "POST",
        body: formdata,
      })
        .then((response) => response.json())
        .then((data) => {
          setloader(true);
          if (data.status == 200) {
            aboutdata();
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
            <h5 className="box_title">About</h5>
            <form onSubmit={handleSubmit}>
              <div className="panel_group">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">About Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="about_Title"
                        placeholder="About Title"
                        required
                        value={about_Title}
                        onChange={(e) =>
                          setabout_Title(
                            e.target.value.charAt(0).toUpperCase() +
                              e.target.value.slice(1)
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">About Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        placeholder="About Description"
                        required
                        value={about_Description}
                        onChange={(e) =>
                          setabout_Description(
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
                          required={id ? false : true}
                          onChange={(e) => {
                            if (!e.target.files || e.target.files.length === 0)
                              return;

                            const file = e.target.files[0];
                            const reader = new FileReader();

                            reader.onload = (event) => {
                              setfile(event.target.result); // Base64 URL
                            };

                            reader.readAsDataURL(file);
                            setaboutimage(file);
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
                          <p>Previous about Image</p>
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
                            Update About
                          </button>
                        ) : (
                          <button className="btn btn-primary btn1">
                            Save About
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
export default AboutUs;

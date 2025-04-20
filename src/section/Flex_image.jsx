import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";
import { RxCrossCircled } from "react-icons/rx";

const URL = import.meta.env.VITE_URL;

const Flex_image = () => {
  const [key, setKey] = useState(Date.now());
  
  const [file1, setfile1] = useState("");
  const [file2, setfile2] = useState("");
  const [file3, setfile3] = useState("");
  const [file4, setfile4] = useState("");

  const [fleximage1, setfleximage1] = useState("");
  const [fleximage2, setfleximage2] = useState("");
  const [fleximage3, setfleximage3] = useState("");
  const [fleximage4, setfleximage4] = useState("");

  const [preimage1, setpreImage1] = useState("");
  const [preimage2, setpreImage2] = useState("");
  const [preimage3, setpreImage3] = useState("");
  const [preimage4, setpreImage4] = useState("");

  console.log(preimage1)
  const [toggal, settoggal] = useState(false);
  const [loader, setloader] = useState(true);
  const [id, setid] = useState("");

 
 
 

  const deleteFile = () => {
    setfleximage1(null)
    setfleximage2(null)
    setfleximage3(null)
    setfleximage4(null)
    setfile1(null);
    setfile2(null);
    setfile3(null);
    setfile4(null);
    setKey(Date.now());
  };

  const flexdata = () => {
    fetch(`${URL}/get_flex_image`, {
      headers: {
        // auth: document.cookie,
        login_id: localStorage.getItem("loginid"),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status == 200) {
          setpreImage1(json.fleximage.Flex_image_1)
          setpreImage2(json.fleximage.Flex_image_2)
          setpreImage3(json.fleximage.Flex_image_3)
          setpreImage4(json.fleximage.Flex_image_4)
          setid(json.fleximage._id)
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
    flexdata();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setloader(false);

    if (!toggal) {
      let formdata = new FormData();
      formdata.append("login_id", localStorage.getItem("loginid"));
      formdata.append("Flex_image_1", fleximage1);
      formdata.append("Flex_image_2", fleximage2);
      formdata.append("Flex_image_3", fleximage3);
      formdata.append("Flex_image_4", fleximage4);

      fetch(`${URL}/add_fleximage`, {
        method: "POST",
        body: formdata,
      })
        .then((response) => response.json())
        .then((data) => {
          setloader(true);
          if (data.status == 200) {
            flexdata();
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
      formdata.append("Flex_image_1", fleximage1);
      formdata.append("Flex_image_2", fleximage2);
      formdata.append("Flex_image_3", fleximage3);
      formdata.append("Flex_image_4", fleximage4);

      fetch(`${URL}/update_flex_image`, {
        method: "POST",
        body: formdata,
      })
        .then((response) => response.json())
        .then((data) => {
          setloader(true);
          if (data.status == 200) {
            flexdata();
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
            <h5 className="box_title">FLEX IMAGE</h5>
            <form onSubmit={handleSubmit}>
              <div className="panel_group">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label w-100">Flex Image 1</label>
                      <div className="add_catimgbtn">
                        <span>Upload Flex Image 1</span>
                        <input
                          key={key}
                          type="file"
                          className="form-control"
                          id=""
                          placeholder="Image"
                          accept=".jpg, .jpeg"
                          required
                          onChange={(e) => {
                            if (!e.target.files || e.target.files.length === 0)
                              return;

                            const file = e.target.files[0];
                            const reader = new FileReader();

                            reader.onload = (event) => {
                              setfile1(event.target.result); // Base64 URL
                            };

                            reader.readAsDataURL(file);
                            setfleximage1(file);
                          }}
                        />
                      </div>
                      <div className="add_cat_imgbox">
                        {file1 ? (
                          <>
                            <img src={file1} />
                            <RxCrossCircled
                              style={{
                                color: "red",
                                fontSize: "20px",
                                position: "absolute",
                                top: "0px",
                                right: "0px",
                                cursor: "pointer",
                              }}
                              onClick={()=>{
                                setfleximage1(null)
                                setfile1(null)
                                setKey(Date.now())
                              }}
                            />
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      {id ? (
                        <>
                          <p>Previous Flex Image 1</p>
                          <img
                            src={preimage1}
                            style={{ width: "200px", height: "100px", marginBottom:"10px" }}
                          />
                        </>
                      ) : (
                        ""
                      )}
                       <hr/>
                      <label className="form-label w-100">Flex Image 2</label>
                      <div className="add_catimgbtn">
                        <span>Upload Flex Image 2</span>
                        <input
                          key={key}
                          type="file"
                          className="form-control"
                          id=""
                          placeholder="Image"
                          accept=".jpg, .jpeg"
                          required
                          onChange={(e) => {
                            if (!e.target.files || e.target.files.length === 0)
                              return;

                            const file = e.target.files[0];
                            const reader = new FileReader();

                            reader.onload = (event) => {
                              setfile2(event.target.result); // Base64 URL
                            };

                            reader.readAsDataURL(file);
                            setfleximage2(file);
                          }}
                        />
                      </div>
                      
                      <div className="add_cat_imgbox">
                        {file2 ? (
                          <>
                            <img src={file2} />
                            <RxCrossCircled
                              style={{
                                color: "red",
                                fontSize: "20px",
                                position: "absolute",
                                top: "0px",
                                right: "0px",
                                cursor: "pointer",
                              }}
                              onClick={()=>{
                                setfleximage2(null)
                                setfile2(null)
                                setKey(Date.now())
                              }}
                            />
                          </>
                        ) : (
                          ""
                        )}
                        
                      </div>
                      {id ? (
                        <>
                          <p>Previous Flex Image 2</p>
                          <img
                            src={preimage2}
                            style={{ width: "200px", height: "100px" ,marginBottom:"10px" }}
                          />
                        </>
                      ) : (
                        ""
                      )}
                      <hr/>
                      <label className="form-label w-100">Flex Image 3</label>
                      <div className="add_catimgbtn">
                        <span>Upload Flex Image 3</span>
                        <input
                          key={key}
                          type="file"
                          className="form-control"
                          id=""
                          placeholder="Image"
                          accept=".jpg, .jpeg"
                          required
                          onChange={(e) => {
                            if (!e.target.files || e.target.files.length === 0)
                              return;

                            const file = e.target.files[0];
                            const reader = new FileReader();

                            reader.onload = (event) => {
                              setfile3(event.target.result); // Base64 URL
                            };

                            reader.readAsDataURL(file);
                            setfleximage3(file);
                          }}
                        />
                      </div>
                      <div className="add_cat_imgbox">
                        {file3 ? (
                          <>
                            <img src={file3} />
                            <RxCrossCircled
                              style={{
                                color: "red",
                                fontSize: "20px",
                                position: "absolute",
                                top: "0px",
                                right: "0px",
                                cursor: "pointer",
                              }}
                              onClick={()=>{
                                setfleximage3(null)
                                setfile3(null)
                                setKey(Date.now())
                              }}
                            />
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      {id ? (
                        <>
                          <p>Previous Flex Image 3</p>
                          <img
                            src={preimage3}
                            style={{ width: "200px", height: "100px" ,marginBottom:"10px" }}
                          />
                        </>
                      ) : (
                        ""
                      )}
                      <hr/>
                      <label className="form-label w-100">Flex Image 4</label>
                      <div className="add_catimgbtn">
                        <span>Upload Flex Image 4</span>
                        <input
                          key={key}
                          type="file"
                          className="form-control"
                          id=""
                          placeholder="Image"
                          accept=".jpg, .jpeg"
                          required
                          onChange={(e) => {
                            if (!e.target.files || e.target.files.length === 0)
                              return;

                            const file = e.target.files[0];
                            const reader = new FileReader();

                            reader.onload = (event) => {
                              setfile4(event.target.result); // Base64 URL
                            };

                            reader.readAsDataURL(file);
                            setfleximage4(file);
                          }}
                        />
                      </div>
                      
                      <div className="add_cat_imgbox">
                        {file4 ? (
                          <>
                            <img src={file4} />
                            <RxCrossCircled
                              style={{
                                color: "red",
                                fontSize: "20px",
                                position: "absolute",
                                top: "0px",
                                right: "0px",
                                cursor: "pointer",
                              }}
                              onClick={()=>{
                                setfleximage4(null)
                                setfile4(null)
                                setKey(Date.now())
                              }}
                            />
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      {id ? (
                        <>
                          <p>Previous Flex Image 4</p>
                          <img
                            src={preimage4}
                            style={{ width: "200px", height: "100px", marginBottom:"10px" }}
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
                            Update Flex Image
                          </button>
                        ) : (
                          <button className="btn btn-primary btn1">
                            Save Flex Image
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
export default Flex_image;

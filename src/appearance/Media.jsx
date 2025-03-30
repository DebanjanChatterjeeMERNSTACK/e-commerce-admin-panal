import React, { useState, useEffect } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaCircleExclamation } from "react-icons/fa6";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";
import { Link } from "react-router";
import { RxCrossCircled } from "react-icons/rx";

const URL = import.meta.env.VITE_URL;

const Media = () => {
  const [facebook, setfacebook] = useState("");
  const [twitter, settwitter] = useState("");

  const [instragram, setinstragram] = useState("");
  const [youtube, setyoutube] = useState("");

 



  const [toggal, settoggal] = useState(false);

  const [id, setid] = useState("");

  const [loader, setloader] = useState(true);

  useEffect(() => {
    fetch(`${URL}/social_get`, {
      headers: {
        // auth: document.cookie,
        login_id: localStorage.getItem("loginid"),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status == 200) {
          console.log(json.social);
          setfacebook(json.social[0].facebook);
          settwitter(json.social[0].twitter);
          setinstragram(json.social[0].instragram);
          setyoutube(json.social[0].youtube);
          setid(json.social[0]._id);
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
    fetch(`${URL}/social_save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login_id: localStorage.getItem("loginid"),
        youtube: youtube,
        instragram: instragram,
        facebook: facebook,
        twitter: twitter,
       
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
      fetch(`${URL}/social_update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          youtube: youtube,
          instragram: instragram,
          facebook: facebook,
          twitter: twitter,
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
            <h5 className="box_title">Add Social Media Link</h5>
            <form onSubmit={handleSubmit}>
              <div className="panel_group">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <h6 className="panel_title">Details</h6>
                    <div className="mb-3">
                      <label className="form-label">Facebook Link</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Facebook Link"
                        value={facebook}
                        onChange={(e) => {
                         setfacebook(e.target.value)
                        }}
                        
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Twitter Link</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Twitter Link"
                        
                        value={twitter}
                        onChange={(e) => {
                         settwitter(e.target.value)
                        }}
                        
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Instragram Link</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Instragram Link"
                        
                        value={instragram}
                        onChange={(e) => {
                          setinstragram(e.target.value)
                        }}
                        
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Youtube Link</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Youtube Link"
                        
                        value={youtube}
                        onChange={(e) => {
                          setyoutube(e.target.value)
                        }}
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
                            Update Media
                          </button>
                        ) : (
                          <button className="btn btn-primary btn1">
                            Save Social Media
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

export default Media;

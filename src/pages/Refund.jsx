import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";


const URL = import.meta.env.VITE_URL;


const Refund = () => {
 

  

  const [terms, setterms] = useState("");

  const [toggal, settoggal] = useState(false);

  const [id, setid] = useState("");

  const [loader, setloader] = useState(true);

  useEffect(() => {
    fetch(`${URL}/refund_get`, {
      headers: {
        // auth: document.cookie,
        login_id: localStorage.getItem("loginid"),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status == 200) {
          console.log(json.policy);
         
          setterms(json.policy.policy_contant);
         
          setid(json.policy._id);
          
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
      fetch(`${URL}/add_refund`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login_id: localStorage.getItem("loginid"),
          refund_contant: terms,
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
        fetch(`${URL}/refund_update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refund_contant: terms,
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
            <h5 className="box_title">Refund Policy</h5>
            <form onSubmit={handleSubmit}>
              <div className="panel_group">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Details</label>
                      <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        placeholder="Refund Policy"
                        required
                        value={terms}
                        onChange={(e) =>
                          setterms(
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
                    <div className="btn_groupbox btn_right mt-5">
                      {loader ? (
                        toggal ? (
                          <button className="btn btn-primary btn1">
                            Update Refund Policy
                          </button>
                        ) : (
                          <button className="btn btn-primary btn1">
                            Save Refund Policy
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
export default Refund;

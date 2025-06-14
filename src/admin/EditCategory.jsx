import React, { useState, useEffect } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaCircleExclamation } from "react-icons/fa6";
import { Form } from "react-bootstrap";
import { RxCrossCircled } from "react-icons/rx";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";
import { useParams, useNavigate, Link } from "react-router";

const URL = import.meta.env.VITE_URL;

const EditCategory = () => {
  const category_id = useParams().id;
  const [key, setKey] = useState(Date.now());
  const navigate = useNavigate();
  const [categoryvisible, setcategoryvisible] = useState("");
  const [categorymainmenu, setcategorymainmenu] = useState("");
  const [categorymainimage, setcategorymainimage] = useState("");

  const [Categoryslug, setCategoryslug] = useState("");
  const [Categoryorder, setCategoryorder] = useState("");

  const [preimage, setpreImage] = useState("");
  const [Categoryimage, setCategoryimage] = useState("");
  const [Categoryname, setCategoryname] = useState("");
  // const [subCategoryname, setsubCategoryname] = useState("");
  const [metaTitlename, setmetaTitlename] = useState("");
  const [metaKeywords, setmetaKeywords] = useState("");
  const [metaDescription, setmetaDescription] = useState("");
  const [subCategoryname, setsubCategoryname] = useState([
    { SubCategoryname: "" },
  ]);

  const [file, setfile] = useState("");
  const [loader, setloader] = useState(true);

  const deleteFile = () => {
    setCategoryimage("");
    setfile("");
    setKey(Date.now());
  };
  function handleChange(e, i) {
    const field = e.target.name;
    const newTodos = [...subCategoryname];
    newTodos[i][field] =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setsubCategoryname(newTodos);
  }
  function handleAdd() {
    setsubCategoryname([...subCategoryname, { SubCategoryname: "" }]);
  }

  function handleRemove(i) {
    const values = [...subCategoryname];
    values.splice(i, 1);
    setsubCategoryname(values);
  }

  useEffect(() => {
    fetch(`${URL}/category_edit/${category_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 200) {
          setCategoryname(data.category.product_Catagory_Name);
          setpreImage(data.category.product_Catagory_Image);
          setmetaTitlename(data.category.product_Meta_Title);
          setmetaKeywords(data.category.product_Meta_Keywords);
          setmetaDescription(data.category.product_Meta_Description);
          setsubCategoryname(data.category.product_SubCategory_Name);
          setCategoryorder(data.category.product_Category_order);
          setCategoryslug(data.category.product_Category_slug);
          setcategorymainmenu(data.category.product_Category_main_menu);
          setcategorymainimage(data.category.product_Category_image_menu);
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
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setloader(false);
    let formdata = new FormData();
    formdata.append("id", category_id);
    formdata.append("product_Catagory_Image", Categoryimage);
    formdata.append("product_Catagory_Name", Categoryname);
    formdata.append(
      "product_SubCategory_Name",
      JSON.stringify(subCategoryname)
    );
    formdata.append("product_Meta_Title", metaTitlename);
    formdata.append("product_Meta_Description", metaDescription);
    formdata.append("product_Meta_Keywords", metaKeywords);

    formdata.append("product_Category_image_menu", categorymainimage);
    formdata.append("product_Category_main_menu", categorymainmenu);
    formdata.append("product_Category_slug", Categoryslug);
    formdata.append("product_Category_order", Categoryorder);

    fetch(`${URL}/catagory_update`, {
      method: "POST",
      body: formdata,
    })
      .then((response) => response.json())
      .then((data) => {
        setloader(true);
        if (data.status == 200) {
          navigate("/admin/categories");
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
              <h5 className="box_title">Edit Category</h5>
              <div className="panel_group">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Category Name (English)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cateName"
                        placeholder="Category Name"
                        required
                        value={Categoryname}
                        onChange={(e) =>
                          setCategoryname(
                            e.target.value.charAt(0).toUpperCase() +
                              e.target.value.slice(1)
                          )
                        }
                      />
                    </div>
                  </div>
                  {/* <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <label className="form-label">
                          Sub Category Name (English)
                        </label>
                        <AiFillPlusSquare
                          style={{
                            color: "white",
                            fontSize: "30px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleAdd()}
                        />
                      </div>

                      {subCategoryname.map((field, idx) => {
                        return (
                          <div
                            key={`${idx}`}
                            className="d-flex justify-content-between mb-3"
                          >
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Sub Category Name"
                              name="SubCategoryname"
                              value={field.SubCategoryname}
                              onChange={(e) => handleChange(e, idx)}
                            />
                            <AiFillMinusSquare
                              style={{
                                color: "white",
                                fontSize: "30px",
                                cursor: "pointer",
                              }}
                              onClick={() => handleRemove(idx)}
                              hidden={subCategoryname.length === 1}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div> */}
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Slug (If you leave it empty, it will be generated
                        automatically.)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        placeholder="Slug"
                        value={Categoryslug}
                        onChange={(e) => setCategoryslug(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Title (Meta Tag)</label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        placeholder="Title (Meta Tag)"
                        value={metaTitlename}
                        onChange={(e) =>
                          setmetaTitlename(
                            e.target.value.charAt(0).toUpperCase() +
                              e.target.value.slice(1)
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Description (Meta Tag)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        placeholder="Description (Meta Tag)"
                        value={metaDescription}
                        onChange={(e) =>
                          setmetaDescription(
                            e.target.value.charAt(0).toUpperCase() +
                              e.target.value.slice(1)
                          )
                        }
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
                        onChange={(e) =>
                          setmetaKeywords(
                            e.target.value.charAt(0).toUpperCase() +
                              e.target.value.slice(1)
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Order</label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        placeholder="Order"
                        value={Categoryorder}
                        onChange={(e) => {
                          const value = e.target.value;

                          // Prevent entering '0' as the first character
                          if (value === "0") {
                            setCategoryorder("");
                            return;
                          }

                          // Ensure only numbers and restrict value to 1 or greater
                          const numberValue = parseInt(value, 10);
                          setCategoryorder(
                            isNaN(numberValue) || numberValue < 1
                              ? ""
                              : numberValue
                          );
                        }}
                        min="1"
                      />
                    </div>
                  </div>
                </div>

                {/* <div className='row'>
                          <div className='col-lg-12 col-md-12 col-sm-12'>
                            <h6 className='panel_title'>Parent Category</h6>
                            <div className="mb-3">
                            <select className="form-select" aria-label="Default select example">
                              <option selected>Select Category</option>
                              <option value="1">Category One</option>
                              <option value="2">Category Two</option>
                              <option value="3">Category Three</option>
                            </select>
                            </div>
                            <div className="mb-3">
                            <select className="form-select" aria-label="Default select example">
                              <option selected>None</option>
                              <option value="1">Sub Category One</option>
                              <option value="2">Sub Category Two</option>
                              <option value="3">Sub Category Three</option>
                            </select>
                            </div>
                            <div className="mb-3">
                            <select className="form-select" aria-label="Default select example">
                              <option selected>None</option>
                              <option value="1">Sub sub Category One</option>
                              <option value="2">Sub sub Category Two</option>
                              <option value="3">Sub sub Category Three</option>
                            </select>
                            </div>
                          </div>
                        </div> */}

                <div className="row">
                  {/* <div className="col-lg-12 col-md-12 col-sm-12">
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
                            checked={categoryvisible == "true"}
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
                            checked={categoryvisible == "false"}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="row">
                        <div className="col-sm-4 col-xs-12">
                          <label>Show on Main Menu</label>
                        </div>
                        <div className="col-sm-4 col-xs-12">
                          <Form.Check
                            type="radio"
                            label="Show"
                            name="main_menu_radio"
                            id=""
                            value={"true"}
                            onChange={(e) =>
                              setcategorymainmenu(JSON.parse(e.target.value))
                            }
                            checked={categorymainmenu == "true"}
                          />
                        </div>
                        <div className="col-sm-4 col-xs-12">
                          <Form.Check
                            type="radio"
                            label="Hide"
                            name="main_menu_radio"
                            id=""
                            value={"false"}
                            onChange={(e) =>
                              setcategorymainmenu(JSON.parse(e.target.value))
                            }
                            checked={categorymainmenu == "false"}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-5">
                      <div className="row">
                        <div className="col-sm-4 col-xs-12">
                          <label>Show Image on Main Menu</label>
                        </div>
                        <div className="col-sm-4 col-xs-12">
                          <Form.Check
                            type="radio"
                            label="Show"
                            name="show_image_radio"
                            id=""
                            value={"true"}
                            onChange={(e) =>
                              setcategorymainimage(JSON.parse(e.target.value))
                            }
                            checked={categorymainimage == "true"}
                          />
                        </div>
                        <div className="col-sm-4 col-xs-12">
                          <Form.Check
                            type="radio"
                            label="Hide"
                            name="show_image_radio"
                            id=""
                            value={"false"}
                            onChange={(e) =>
                              setcategorymainimage(JSON.parse(e.target.value))
                            }
                            checked={categorymainimage == "false"}
                          />
                        </div>
                      </div>
                    </div>
                  </div> */}
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
                          onChange={(e) => {
                            if (!e.target.files || e.target.files.length === 0)
                              return;

                            const file = e.target.files[0];
                            const reader = new FileReader();

                            reader.onload = (event) => {
                              setfile(event.target.result); // Base64 URL
                            };

                            reader.readAsDataURL(file);
                            setCategoryimage(file);
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
                      <p>Previous Category Image</p>
                      <img
                        src={preimage}
                        style={{ width: "200px", height: "100px" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="btn_groupbox btn_right mt-5">
                      <Link to={"/admin/categories"}>
                        <button
                          class="btn btn-primary btn1"
                          style={{ marginRight: "10px" }}
                        >
                          Back
                        </button>
                      </Link>
                      {loader ? (
                        <button className="btn btn-primary btn1">
                          Update Category
                        </button>
                      ) : (
                        <button className="btn btn-primary btn1" disabled>
                          <Oval
                            visible={true}
                            height="30"
                            width="30"
                            color="#fff"
                            ariaLabel="oval-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
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

export default EditCategory;

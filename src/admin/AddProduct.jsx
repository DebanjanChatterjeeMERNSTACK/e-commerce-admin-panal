import React, { useState, useEffect } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaCircleExclamation } from "react-icons/fa6";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";
import { Link } from "react-router";
import { RxCrossCircled } from "react-icons/rx";

const URL = import.meta.env.VITE_URL;

const AddProduct = () => {
  const [Category, setcategory] = useState([]);
  const [SubCategory, setSubcategory] = useState([]);

  const [Productdiscount, setProductDiscount] = useState("");

  const [Productimage, setproductimage] = useState([]);
  const [Productcatagory, setproductcatagory] = useState("");
  const [Productsubcatagory, setproductsubcatagory] = useState("");
  const [colorcode, setcolorcode] = useState([{ colorcode: "" }]);
  const [Productverity, setproductverity] = useState([
    { Size: "Free Size", Selling_price: "", Quantity: "", Units: "" },
  ]);
  const [Productname, setproductname] = useState("");
  const [Producthit, setproducthit] = useState("");
  const [Productstock, setproductstock] = useState("");
  const [Productquantity, setproductquantity] = useState("");
  const [Productquantityunit, setproductquantityunit] = useState("");
  const [Productdescription, setproductdescription] = useState("");
  const [ProductBrand, setproductBrand] = useState("");
  const [ProductWarrantyInformation, setproductWarrantyInformation] =
    useState("");
  const [ProductShippingInformation, setproductShippingInformation] =
    useState("");
  const [ProductWeight, setproductWeight] = useState("");
  const [ProductWeightunit, setproductWeightUnit] = useState("");
  const [ProductRating, setproductRating] = useState("");
  const [ProductSku, setproductSKU] = useState("");

  const [Productsellingprice, setproductsellingprice] = useState("");

  const [Productseotitle, setproductseotitle] = useState("");
  const [Productseodecsription, setproductseodecsription] = useState("");
  const [Productseokeywords, setproductseokeywords] = useState("");

  const [loader, setloader] = useState(true);
  const [file, setfile] = useState([]);

  //----image delete-------

  const deleteFile = (e) => {
    const deleteimage = file.filter((item, index) => index !== e);
    setfile(deleteimage);
    const deleteimages = Productimage.filter((item, index) => index !== e);
    setproductimage(deleteimages);
  };

  // ---product size-------

  const handleTodoChange = (e, i) => {
    const field = e.target.name;
    const newTodos = [...Productverity];
    newTodos[i][field] = e.target.value;
    setproductverity(newTodos);
  };
  const handleAddTodo = () => {
    setproductverity([
      ...Productverity,
      { Selling_price: "", Quantity: "", Units: "" },
    ]);
  };

  const handleDeleteTodo = (i) => {
    const newTodos = [...Productverity];
    newTodos.splice(i, 1);
    setproductverity(newTodos);
  };

  // ---product color code-------

  function handleChange(e, i) {
    const field = e.target.name;
    const newTodos = [...colorcode];
    newTodos[i][field] = e.target.value;
    setcolorcode(newTodos);
  }
  function handleAdd() {
    setcolorcode([...colorcode, { colorcode: "" }]);
  }
  function handleRemove(i) {
    const values = [...colorcode];
    values.splice(i, 1);
    setcolorcode(values);
  }

  useEffect(() => {
    if (Productcatagory && Category.length > 0) {
      const subcategories =
        Category.find((e) => e.product_Catagory_Name === Productcatagory)
          ?.product_SubCategory_Name || [];
      setSubcategory(subcategories);
    }
  }, [Productcatagory, Category]);

  useEffect(() => {
    fetch(`${URL}/catagory_get`, {
      headers: {
        // auth: document.cookie,
        login_id: localStorage.getItem("loginid"),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status == 200) {
          setcategory(
            json.catagory.filter((e) => e.product_Catagory_Delete == 0)
          );
        } else {
          Swal.fire({
            title: json.text,
            icon: json.mess,
            confirmButtonText: "Ok",
          });
        }
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setloader(false);

    let formdata = new FormData();

    formdata.append("login_id", localStorage.getItem("loginid"));
    formdata.append("product_Title", Productname);
    formdata.append("product_Description", Productdescription);
    formdata.append("product_Category", Productcatagory);
    formdata.append("product_Selling_Price", Productsellingprice);
    formdata.append(
      "product_Main_Price",
      Productsellingprice && Productdiscount
        ? (
            Productsellingprice -
            Productsellingprice * (Productdiscount / 100)
          ).toFixed(2)
        : ""
    );
    formdata.append("product_Stock", Productstock);
    formdata.append("product_Quantity", Productquantity);
    formdata.append("product_Quantity_unit", Productquantityunit);
    formdata.append("product_hit", Producthit);
    formdata.append("product_color", JSON.stringify(colorcode));
    formdata.append("product_Sub_Category", Productsubcatagory);
    formdata.append("product_rating", ProductRating);
    formdata.append("product_SKU", ProductSku);
    formdata.append("product_Offer_Percentage", Productdiscount);
    formdata.append("product_Brand", ProductBrand);
    formdata.append("product_Warranty_Information", ProductWarrantyInformation);
    formdata.append("product_Shipping_Information", ProductShippingInformation);
    formdata.append("product_Weight", ProductWeight);
    formdata.append("product_Weight_units", ProductWeightunit);
    formdata.append("product_variant", JSON.stringify(Productverity));
    Productimage.forEach((e, index) => {
      formdata.append("product_Image", e);
    });

    formdata.append("product_SEO_Title", Productseotitle);
    formdata.append("product_SEO_Description", Productseodecsription);
    formdata.append("product_SEO_Keywords", Productseokeywords);

    fetch(`${URL}/product_add`, {
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
          <div className="panel_contentbox">
            <h5 className="box_title">Add Product</h5>
            <form onSubmit={handleSubmit}>
              <div className="panel_group">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="image_upload_basebox">
                      <div className="image_uploadbox">
                        <div className="upload_imgwrap_base">
                          {file.length > 0 &&
                            file.map((e, i) => {
                              return (
                                <React.Fragment key={i}>
                                  <div className="upload_imgwrap">
                                    <span
                                      className="closebtn"
                                      onClick={() => deleteFile(i)}
                                    >
                                      X
                                    </span>
                                    <img src={e} alt="img" />
                                  </div>
                                </React.Fragment>
                              );
                            })}
                        </div>

                        <div className="center_uptxtbox">
                          <IoCloudUploadOutline className="ic" />
                          <p>Drag and drop images here or Browse File </p>
                        </div>
                        <input
                          type="file"
                          className="hidden_input"
                          accept=".jpg, .jpeg"
                          required
                          multiple
                          onChange={(e) => {
                            const selectedFiles = Array.from(e.target.files);

                            if (selectedFiles.length > 8) {
                              Swal.fire({
                                title: "You can only upload up to 8 images.",
                                icon: "warning",
                                confirmButtonText: "Ok",
                              });
                              e.target.value = "";
                              return;
                            }

                            const validFiles = selectedFiles.filter(
                              (file) => file instanceof File
                            );
                            setproductimage(validFiles);

                            const imageUrls = [];
                            validFiles.forEach((file) => {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                imageUrls.push(event.target.result);
                                if (imageUrls.length === validFiles.length) {
                                  setfile(imageUrls);
                                }
                              };
                              reader.readAsDataURL(file);
                            });
                          }}
                          disabled={Productimage.length >= 8}
                        />
                      </div>
                      <p className="notetxt">
                        <FaCircleExclamation /> Products with good and clear
                        images are sold faster!
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        required
                        value={Productcatagory}
                        onChange={(e) => setproductcatagory(e.target.value)}
                      >
                        <option value="">Select Category</option>
                        {Category &&
                          Category.map((e, i) => {
                            return (
                              <React.Fragment key={i}>
                                <option value={e.product_Catagory_Name}>
                                  {e.product_Catagory_Name}
                                </option>
                              </React.Fragment>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-3">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={Productsubcatagory}
                        onChange={(e) => setproductsubcatagory(e.target.value)}
                      >
                        <option value="">Select Sub Category</option>
                        {SubCategory &&
                          SubCategory.map((e, i) => {
                            return (
                              <React.Fragment key={i}>
                                <option value={e.SubCategoryname}>
                                  {e.SubCategoryname}
                                </option>
                              </React.Fragment>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  {/* <div className='col-lg-12 col-md-12 col-sm-12'>
                  <div className="mb-3">
                    <select className="form-select" aria-label="Default select example">
                      <option selected>Select Sub sub Category</option>
                      <option value="1">Sub sub Category One</option>
                      <option value="2">Sub sub Category Two</option>
                      <option value="3">Sub sub Category Three</option>
                    </select>
                  </div>
                </div> */}
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <h6 className="panel_title">Details</h6>
                    <div className="mb-3">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Title"
                        required
                        value={Productname}
                        onChange={(e) =>
                          setproductname(
                            e.target.value.charAt(0).toUpperCase() +
                              e.target.value.slice(1)
                          )
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        placeholder="Description"
                        required
                        value={Productdescription}
                        onChange={(e) =>
                          setproductdescription(
                            e.target.value.charAt(0).toUpperCase() +
                              e.target.value.slice(1)
                          )
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Product Hits</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        required
                        value={Producthit}
                        onChange={(e) => setproducthit(e.target.value)}
                      >
                        <option value="" disabled>
                          Product Hits
                        </option>
                        <option value="Best Seller">Best Seller</option>
                        <option value="Offer Product">Offer Product</option>
                        <option value="New Arrivals">New Arrivals</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Product Brand</label>
                      <input
                        type="text"
                        className="form-control"
                        id="brand"
                        placeholder="Product Brand"
                        required
                        value={ProductBrand}
                        onChange={(e) =>
                          setproductBrand(
                            e.target.value.charAt(0).toUpperCase() +
                              e.target.value.slice(1)
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Product Stock</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        required
                        value={Productstock}
                        onChange={(e) => setproductstock(e.target.value)}
                      >
                        <option value="" disabled>
                          Product Stock
                        </option>
                        <option value="In Stock">In Stock</option>
                        <option value="Out Stock">Out Stock</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">SKU (Product Code)</label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        placeholder="SKU Code"
                        required
                        value={ProductSku}
                        onChange={(e) => setproductSKU(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Product Rating</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        required
                        value={ProductRating}
                        onChange={(e) => setproductRating(e.target.value)}
                      >
                        <option value="" disabled>
                          Product Rating
                        </option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Product Quantity</label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        placeholder="Product Quantity"
                        required
                        value={Productquantity}
                        onChange={(e) => {
                          const value = e.target.value;

                          // Prevent entering '0' as the first character
                          if (value === "0") {
                            setproductquantity("");
                            return;
                          }

                          // Ensure only numbers and restrict value to 1 or greater
                          const numberValue = parseInt(value, 10);
                          setproductquantity(
                            isNaN(numberValue) || numberValue < 1
                              ? ""
                              : numberValue
                          );
                        }}
                        min="1"
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Product Quantity Units
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        required
                        value={Productquantityunit}
                        onChange={(e) => setproductquantityunit(e.target.value)}
                      >
                        <option value="" disabled>
                          Product Quantity Units
                        </option>
                        <option value="Milli Liter">Milli Liter</option>
                        <option value="Liter">Liter</option>
                        <option value="Kg">Kg</option>
                        <option value="Gm">Gm</option>
                        <option value="Pieces">Pieces</option>
                        <option value="Paired">Paired</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Product Selling Price
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        placeholder="Product Selling Price"
                        required
                        value={Productsellingprice}
                        onChange={(e) => {
                          const value = e.target.value;

                          // Prevent entering '0' as the first character
                          if (value === "0") {
                            setproductsellingprice("");
                            return;
                          }

                          // Ensure only numbers and restrict value to 1 or greater
                          const numberValue = parseInt(value, 10);
                          setproductsellingprice(
                            isNaN(numberValue) || numberValue < 1
                              ? ""
                              : numberValue
                          );
                        }}
                        min="1"
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Discount Rate %</label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        placeholder="Discount Rate %"
                        required
                        value={Productdiscount}
                        onChange={(e) => {
                          const value = e.target.value;

                          // Prevent entering '0' as the first character
                          if (value === "0") {
                            setProductDiscount("");
                            return;
                          }

                          // Ensure only numbers and restrict value to 1 or greater
                          const numberValue = parseInt(value, 10);
                          setProductDiscount(
                            isNaN(numberValue) || numberValue < 1
                              ? ""
                              : numberValue
                          );
                        }}
                        min="1"
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Discount Price</label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        placeholder="Discount Price"
                        required
                        value={
                          Productsellingprice && Productdiscount
                            ? (
                                Productsellingprice -
                                Productsellingprice * (Productdiscount / 100)
                              ).toFixed(2)
                            : ""
                        }
                        readOnly
                      />
                    </div>
                  </div>
                  {/* <div className='col-lg-6 col-md-6 col-sm-12'>
                <div className="mb-3">
                  <p> Calculated Price (₹):   342 </p>
                  <p> You Will Earn (₹): 342 + Shipping Cost (Commission Rate:  0%) </p>
                </div>
                </div> */}
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Product Warranty Information
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={ProductWarrantyInformation}
                        onChange={(e) =>
                          setproductWarrantyInformation(e.target.value)
                        }
                      >
                        <option value="" disabled>
                          Product Warranty Information
                        </option>
                        <option value="None">None</option>
                        <option value="1 mounth">1 mounth</option>
                        <option value="6 mounth">6 mounth</option>
                        <option value="1 year">1 year</option>
                        <option value="3 year">3 year</option>
                        <option value="5 year">5 year</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Product Shipping Information
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        required
                        value={ProductShippingInformation}
                        onChange={(e) =>
                          setproductShippingInformation(e.target.value)
                        }
                      >
                        <option value="" disabled>
                          Product Shipping Information
                        </option>
                        <option value="2 days">2 days</option>
                        <option value="3 days">3 days</option>
                        <option value="5 days">5 days</option>
                        <option value="7 days">7 days</option>
                        <option value="10 days">10 days</option>
                        <option value="12 days">12 days</option>
                        <option value="15 days">15 days</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Product Weight</label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        placeholder="Product Weight"
                        required
                        value={ProductWeight}
                        onChange={(e) => {
                          const value = e.target.value;

                          // Prevent entering '0' as the first character
                          if (value === "0") {
                            setproductWeight("");
                            return;
                          }

                          // Ensure only numbers and restrict value to 1 or greater
                          const numberValue = parseInt(value, 10);
                          setproductWeight(
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
                      <label className="form-label">Product Weight Unit</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        required
                        value={ProductWeightunit}
                        onChange={(e) => setproductWeightUnit(e.target.value)}
                      >
                        <option value="" disabled>
                          Product Weight Unit
                        </option>
                        <option value="Kg">Kg</option>
                        <option value="Gm">Gm</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <label className="form-label">Product Color Code</label>
                        <AiFillPlusSquare
                          style={{
                            color: "white",
                            fontSize: "30px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleAdd()}
                        />
                      </div>

                      {colorcode.map((field, idx) => {
                        return (
                          <div
                            key={idx}
                            className="d-flex justify-content-between mb-3"
                          >
                            <input
                              type="text"
                              className="form-control"
                              placeholder="#ffffff"
                              name="colorcode"
                              value={field.colorcode}
                              onChange={(e) => handleChange(e, idx)}
                            />
                            <AiFillMinusSquare
                              style={{
                                color: "white",
                                fontSize: "30px",
                                cursor: "pointer",
                              }}
                              onClick={() => handleRemove(idx)}
                              hidden={colorcode.length === 1}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="d-flex justify-content-between">
                          <h6 className="panel_title">Product Size</h6>
                          <AiFillPlusSquare
                            style={{
                              color: "white",
                              fontSize: "30px",
                              cursor: "pointer",
                            }}
                            onClick={handleAddTodo}
                          />
                        </div>
                      </div>
                      {Productverity.map((todo, index) => {
                        return (
                          <React.Fragment key={index}>
                            <div className="col-12 col-sm-6 col-md-3">
                              <div className="mb-3">
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                  name="Size"
                                  value={todo.Size}
                                  onChange={(e) => handleTodoChange(e, index)}
                                >
                                  <option value="" disabled>
                                    Size
                                  </option>
                                  <option value="Free Size">Free Size</option>
                                  <option value="S">S</option>
                                  <option value="M">M</option>
                                  <option value="L">L</option>
                                  <option value="XL">XL</option>
                                  <option value="2XL">2XL</option>
                                  <option value="3XL">3XL</option>
                                  <option value="4XL">4XL</option>
                                  <option value="28">28</option>
                                  <option value="30">30</option>
                                  <option value="32">32</option>
                                  <option value="36">36</option>
                                  <option value="38">38</option>
                                  <option value="40">40</option>
                                  <option value="42">42</option>
                                  <option value="IND-5">IND-5</option>
                                  <option value="IND-6">IND-6</option>
                                  <option value="IND-7">IND-7</option>
                                  <option value="IND-8">IND-8</option>
                                  <option value="IND-9">IND-9</option>
                                  <option value="IND-10">IND-10</option>
                                  <option value="IND-11">IND-11</option>
                                  <option value="IND-12">IND-12</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-3">
                              <div className="mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Selling price"
                                  name="Selling_price"
                                  value={todo.Selling_price}
                                  onChange={(e) => handleTodoChange(e, index)}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-3">
                              <div className="mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Quantity"
                                  name="Quantity"
                                  value={todo.Quantity}
                                  onChange={(e) => handleTodoChange(e, index)}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-3 d-flex justify-content-between">
                              <div className="mb-3">
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                  name="Units"
                                  value={todo.Units}
                                  onChange={(e) => handleTodoChange(e, index)}
                                >
                                  <option value="" disabled>
                                    Quantity Units
                                  </option>
                                  <option value="Milli Liter">
                                    Milli Liter
                                  </option>
                                  <option value="Liter">Liter</option>
                                  <option value="Kg">Kg</option>
                                  <option value="Gm">Gm</option>
                                  <option value="Pieces">Pieces</option>
                                  <option value="Paired">Paired</option>
                                </select>
                              </div>
                              <AiFillMinusSquare
                                style={{
                                  color: "white",
                                  fontSize: "30px",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleDeleteTodo(index)}
                                hidden={Productverity.length === 1}
                              />
                            </div>
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <h6 className="panel_title">SEO</h6>
                    <div className="mb-3">
                      <label className="form-label">SEO Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="seoTitle"
                        placeholder="Seo Title"
                        value={Productseotitle}
                        onChange={(e) => setproductseotitle(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">SEO Description</label>
                      <input
                        type="text"
                        className="form-control"
                        id="seoDescription"
                        placeholder="Seo Description"
                        value={Productseodecsription}
                        onChange={(e) =>
                          setproductseodecsription(e.target.value)
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">SEO Keywords</label>
                      <input
                        type="text"
                        className="form-control"
                        id="seoKeywords"
                        placeholder="Keywords (E.g. book, new, pencil)"
                        value={Productseokeywords}
                        onChange={(e) => setproductseokeywords(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="btn_groupbox btn_right mt-5">
                      {loader ? (
                        <button className="btn btn-primary btn1">
                          Save Product
                        </button>
                      ) : (
                        <button className="btn btn-primary btn1" disabled>
                          <Oval
                            visible={true}
                            height="20"
                            width="20"
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;

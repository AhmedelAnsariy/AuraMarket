import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import img from "../../images/profile.jpg";
import { useFormik } from "formik";
import { ThreeCircles } from "react-loader-spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../Context/Authentication";

export default function Profile() {
let [ErrorMsg, setErrorMsg] = useState(null);
let [SuccessMse, setSuccessMsg] = useState(null);

let [IsLoading, setIsLoading] = useState(false);
let Navigat = useNavigate();
let [name, setname] = useState(null);


let {Token , setToken } = useContext(authContext);

let newData = {
    name: "",
    email: "",
    phone: "",
};

function CheckData(values) {
    let errors = {};
    setErrorMsg(null);

    if (values.name.length < 4 || values.name.length > 10) {
      errors.name = "Name length must be between 4 and 10 characters.";
    }

    if (
      values.email.includes("@") === false ||
      values.email.includes(".") === false
    ) {
      errors.email = "Invalid email. It should contain '@' and '.'.";
    }

    if (!values.phone.match(/^(02)?01[0125][0-9]{8}$/)) {
      errors.phone = "Invalid phone number. It must be 11 digits.";
    }

    return errors;
}

async function sendData(values) {
    setIsLoading(true);
    try {
      const headers = {
        token: localStorage.getItem("tkn"),
      };

      let response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/updateMe",
        values,
        {
          headers: headers,
        }
      );
      // console.log(response.data);

      if (response.data.message === "success") {
        setSuccessMsg("Data Has Updated Successfully");
        setTimeout(function () {
          Navigat("/login");
          localStorage.removeItem('tkn');
          setToken(null);
        }, 1100);
      
       

      }
    } catch (error) {
     // console.log(error?.response?.data?.errors?.msg);
       setErrorMsg(error?.response?.data?.errors?.msg);
    }
    setIsLoading(false);
}

  let formkikObject = useFormik({
    initialValues: newData,
    validate: CheckData,
    onSubmit: sendData,
  });

useEffect(() => {
  let x = jwtDecode(localStorage.getItem("tkn"));
  setname(x.name);
});

if (name === null) {
    return (
      <>
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <Bars
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      </>
    );
}

return (
    <>
      <div className="container my-5 p-5">
        <h2 className="text-center fw-bolder text-black mt-4">
          Hello <span className="text-info">{name} </span>{" "}
        </h2>
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="ImageProfile">
              <img src={img} className="w-100" alt="" />
            </div>
          </div>
          <div className="col-md-6">
            <form onSubmit={formkikObject.handleSubmit}>
              <h3 className="text-center my-5 text-info">Update Your Data</h3>

              {ErrorMsg ? (
                <div className="alert alert-danger"> {ErrorMsg}</div>
              ) : (
                " "
              )}

{SuccessMse ? (
              <div className="alert alert-success">{SuccessMse}</div>
            ) : (
              ""
            )}

              <span className="fs-4">New Name : </span>
              <input
                type="text"
                className="form-control my-3"
                name="name"
                id="name"
                value={formkikObject.values.name}
                onChange={formkikObject.handleChange}
                onBlur={formkikObject.handleBlur}
                placeholder="Name"
              />

              {formkikObject.errors.name && formkikObject.touched.name ? (
                <div className="alert alert-danger">
                  {formkikObject.errors.name}
                </div>
              ) : (
                ""
              )}

              <span className="fs-4">New Email : </span>
              <input
                type="email"
                className="form-control my-3"
                name="email"
                id="email"
                value={formkikObject.values.email}
                onChange={formkikObject.handleChange}
                onBlur={formkikObject.handleBlur}
                placeholder="Email"
              />
              {formkikObject.errors.email && formkikObject.touched.email ? (
                <div className="alert alert-danger">
                  {formkikObject.errors.email}
                </div>
              ) : (
                ""
              )}

              <span className="fs-4">New Phone : </span>
              <input
                type="tel"
                className="form-control my-3"
                name="phone"
                id="phone"
                value={formkikObject.values.phone}
                onChange={formkikObject.handleChange}
                onBlur={formkikObject.handleBlur}
                placeholder="Phone"
              />
              {formkikObject.errors.phone && formkikObject.touched.phone ? (
                <div className="alert alert-danger">
                  {formkikObject.errors.phone}
                </div>
              ) : (
                ""
              )}

              <button
                className="btn btn-info text-white px-4"
                type="submit"
                disabled={!(formkikObject.dirty && formkikObject.isValid)}
              >
                {IsLoading ? (
                  <ThreeCircles
                    visible={true}
                    height="50"
                    width="80"
                    color="#fff"
                    ariaLabel="three-circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  "Update"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

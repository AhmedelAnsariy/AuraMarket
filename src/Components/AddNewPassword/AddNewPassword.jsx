import React, {  useState } from "react";
import style from "./AddNewPassword.module.css";
import { useFormik } from "formik";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";

import Swal from 'sweetalert2'


export default function AddNewPassword() {



let user = {
    email: "",
    newPassword: "",
};

let [ErrorMsg, setErrorMsg] = useState(null);
let[IsLoading,setIsLoading] = useState(false);
let Navigat = useNavigate();



async function SendDate(values) {
  setIsLoading(true);
  try {
    let { data } = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      values
    );
    console.log(data);

    if (data.token) {

        Swal.fire({
            position: "center-center",
            icon: "success",
            title: "Password Has Changed Successfully",
            showConfirmButton: false,
            timer: 2000
          });

      setTimeout(function () {
        Navigat("/login");
      }, 1000);
    }
  } catch (error) {
    // console.log(error);
    setErrorMsg(error.response.data.message);
  }
  setIsLoading(false);
}



function checkValidate(values){
  const errors = {};
  setErrorMsg(null);



  if (
    values.email.includes("@") === false ||
    values.email.includes(".") === false
  ) {
    errors.email = "Invalid email. It should contain '@' and '.'.";
  }

  if (
    !values.newPassword.match(
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    )
  ) {
    errors.newPassword = "Invalid Password";
  }


  return errors;
}

let formikObject = useFormik({
  initialValues: user,
  validate:checkValidate,
  onSubmit: SendDate,
});







  return (
    <>

    <div className="registerBody mt-5">
      <div className="container px-4 pt-5">

        <form onSubmit={formikObject.handleSubmit}>
          <h2 className={style.registerTitle}> Add New Password :</h2>


          {ErrorMsg ? (
            <div className="alert alert-danger">{ErrorMsg}</div>
          ) : (
            ""
          )}



          <span>Email :</span>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control mb-5 mt-3"
            value={formikObject.values.email}
            onChange={formikObject.handleChange}
            onBlur={formikObject.handleBlur}
          />

          {formikObject.errors.email && formikObject.touched.email ? (
            <div className="alert alert-danger mb-5">
              {formikObject.errors.email}
            </div>
          ) : (
            " "
          )}
          

          <span>New  Password:</span>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            className="form-control mt-2 mb-5"
            value={formikObject.values.password}
            onChange={formikObject.handleChange}
            onBlur={formikObject.handleBlur}
          />
          {formikObject.errors.newPassword && formikObject.touched.newPassword ? (
            <div className="alert alert-danger mb-5">
              {formikObject.errors.newPassword}
            </div>
          ) : (
            " "
          )}

        

          <div className={style.buttonRegister}>
            <button
              type="submit"
              disabled={!(formikObject.dirty && formikObject.isValid)}
            >


             {IsLoading ?   <ThreeCircles
visible={true}
height="50"
width="80"
color="#fff"
ariaLabel="three-circles-loading"
wrapperStyle={{}}
wrapperClass=""
/>  :  "Login"}


            </button>
          </div>

          



        </form>


      </div>
    </div>

    
  </>
  )
}

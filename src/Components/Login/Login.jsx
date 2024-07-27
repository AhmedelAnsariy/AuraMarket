import React, { useContext, useState } from "react";
import style from "./login.module.css";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import {  authContext } from "../../Context/Authentication";

export default function Login() {

let {setToken} =  useContext(authContext);

let user = {
email: "",
password: "",
};

let [ErrorMsg, setErrorMsg] = useState(null);
let [SuccessMse, setSuccessMsg] = useState(null);
let[IsLoading,setIsLoading] = useState(false);
let Navigat = useNavigate();



async function SendDate(values) {
  setIsLoading(true);
  try {
    let { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signin",
      values
    );
    // console.log(data);

    if (data.message === "success") {
      setSuccessMsg("Welcome Back");

      localStorage.setItem("tkn" ,data.token )
      setToken(data.token);
      // console.log(data.token);


      setTimeout(function () {
        Navigat("/home");
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
    !values.password.match(
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    )
  ) {
    errors.password = "Invalid Password";
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
          <h2 className={style.registerTitle}>Login Now :</h2>

          {SuccessMse ? (
            <div className="alert alert-success">{SuccessMse}</div>
          ) : (
            ""
          )}
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
          

          <span>Password:</span>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control mt-2 mb-5"
            value={formikObject.values.password}
            onChange={formikObject.handleChange}
            onBlur={formikObject.handleBlur}
          />
          {formikObject.errors.password && formikObject.touched.password ? (
            <div className="alert alert-danger mb-5">
              {formikObject.errors.password}
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

          
          <hr className="my-5" />
          <h5 className="text-center"> You don't Have Account ?  <Link className="text-success fs-3" to="/register"> Create Account </Link> </h5>
          <h5 className="text-center">   <Link className="text-success fs-3 mt-3" to="/forgetpassword"> Forget Your Password ?   </Link> </h5>


        </form>


      </div>
    </div>

    
  </>
  )
}

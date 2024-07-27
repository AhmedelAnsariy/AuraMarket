import React, { useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";

export default function Register() {

let user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
};



  let [ErrorMsg, setErrorMsg] = useState(null);
  let [SuccessMse, setSuccessMsg] = useState(null);
  let[IsLoading,setIsLoading] = useState(false);


  let Navigat = useNavigate();



  async function SendDate(values) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      // console.log(data);

      if (data.message === "success") {
        setSuccessMsg("Account Has Created Successfully");
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

  if (values.name.length < 4 || values.name.length > 10) {
    errors.name = "Name length must be between 4 and 10 characters.";
  }

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

  if (values.password !== values.rePassword) {
    errors.rePassword = "Two Passwords Not Matched";
  }

  if (!values.phone.match(/^(02)?01[0125][0-9]{8}$/)) {
    errors.phone = "Invalid phone number. It must be 11 digits.";
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
            <h2 className={style.registerTitle}>Register Now :</h2>

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


            <span>Name : </span>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control mt-2 mb-3"
              value={formikObject.values.name}
              onChange={formikObject.handleChange}
              onBlur={formikObject.handleBlur}
            />
            {formikObject.errors.name && formikObject.touched.name ? (
              
              
              <div className="alert alert-danger mb-5">
                {formikObject.errors.name}
              </div>




            ) : (
              " "
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

            <span>RePassword : </span>
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              className="form-control mb-5 mt-2"
              value={formikObject.values.rePassword}
              onChange={formikObject.handleChange}
              onBlur={formikObject.handleBlur}
            />
            {formikObject.errors.rePassword &&
            formikObject.touched.rePassword ? (
              <div className="alert alert-danger mb-5">
                {formikObject.errors.rePassword}
              </div>
            ) : (
              " "
            )}

            <span>Phone : </span>
            <input
              type="tel"
              name="phone"
              id="phone"
              className="form-control mb-5 mt-2"
              value={formikObject.values.phone}
              onChange={formikObject.handleChange}
              onBlur={formikObject.handleBlur}
            />
            {formikObject.errors.phone && formikObject.touched.phone ? (
              <div className="alert alert-danger mb-5">
                {formikObject.errors.phone}
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
  />  :  "Register"}


              </button>

              <hr className="my-5" />
              <h5 className="text-center"> Already Have Account ?  <Link className="text-success" to="/login">  Login Now </Link> </h5>


            </div>
          </form>
        </div>
      </div>
    </>
  );
}

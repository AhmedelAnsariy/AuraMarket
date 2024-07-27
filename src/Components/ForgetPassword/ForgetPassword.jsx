import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


export default function ForgetPassword() {
    let user = {
        email: "",
};

let [ErrorMsg, setErrorMsg] = useState(null);
let[IsLoading,setIsLoading] = useState(false);
let Navigat = useNavigate();


async function SendDate(values) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );

      console.log(data);

  
      if (data.statusMsg === "success") {
        setTimeout(function () {
          Swal.fire({
            position: "center-center",
            icon: "success",
            title: "Code Has Been Send , Check Your Email",
            showConfirmButton: false,
            timer: 2000
          });
          Navigat("/verifycode");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
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
    return errors;
  }

  let formikObject = useFormik({
    initialValues: user,
    validate:checkValidate,
    onSubmit: SendDate,
  });




  return (
    <>

    <div className="container mt-5 px-5">
        <div className="row mt-5 pt-5">
            <h3 className='mt-5'>Please Enter Your Email : </h3>
            <form onSubmit={formikObject.handleSubmit}>
      


      {ErrorMsg ? (
        <div className="alert alert-danger">{ErrorMsg}</div>
      ) : (
        ""
      )}



      <input
        type="email"
        name="email"
        id="email"
        placeholder='Email'
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
      



    

      <div >
        <button
          type="submit"
          disabled={!(formikObject.dirty && formikObject.isValid)}
          className='btn btn-success'
        >


         {IsLoading ?   <ThreeCircles
visible={true}
height="50"
width="80"
color="#fff"
ariaLabel="three-circles-loading"
wrapperStyle={{}}
wrapperClass=""
/>  :  "Send Code"}


        </button>
      </div>

      
   


    </form>

        </div>
    </div>








    </>
  )
}

import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export default function VerifyCode() {
    let user = {
        resetCode: "",
};

let [ErrorMsg, setErrorMsg] = useState(null);
let[IsLoading,setIsLoading] = useState(false);
let Navigat = useNavigate();


async function SendDate(values) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );

      console.log(data);

  
      if (data.status === "Success") {
        setTimeout(function () {
          Navigat("/addnewpassword");
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


    const numberPattern = /^[0-9]+$/;

if (!numberPattern.test(values.resetCode)) {
      errors.resetCode = "Invalid code. It should contain only numbers from 0 to 9.";
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
            <h3 className='mt-5'>Please Enter Code Which Was Send To Your Email :  </h3>
            <form onSubmit={formikObject.handleSubmit}>
      


      {ErrorMsg ? (
        <div className="alert alert-danger">{ErrorMsg}</div>
      ) : (
        ""
      )}



      <input
        type="text"
        name="resetCode"
        id="resetCode"
        placeholder='Code'
        className="form-control mb-5 mt-3"
        value={formikObject.values.resetCode}
        onChange={formikObject.handleChange}
        onBlur={formikObject.handleBlur}
      />

      {formikObject.errors.code && formikObject.touched.code ? (
        <div className="alert alert-danger mb-5">
          {formikObject.errors.code}
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
/>  :  "Send"}


        </button>
      </div>

      
   


    </form>

        </div>
    </div>


    </>
  )
}

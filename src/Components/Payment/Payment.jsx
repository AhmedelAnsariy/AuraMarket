import axios from "axios";
import React, { useContext, useState } from 'react'
import { CartContext } from "../../Context/CartContext";
import toast from 'react-hot-toast';
import {  useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import  photo from "../../images/top-up-credit-concept-illustration_114360-7244.jpg"

export default function Payment() {
  const { CartId  , SetCartProducts , setCartId , SetNumOfCarItems , SetTotalPrice } = useContext(CartContext);
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [details, setDetails] = useState('');

  let Navigat = useNavigate();
  let [CartLoad, setCartLoad] = useState(false);

async function confirmCashPayment() {
    setCartLoad(true)
    const shippingAddress = {
      "shippingAddress": {
        "details": details,
        "phone": phone,
        "city": city
      }
    };

    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${CartId}`, shippingAddress, {
        headers: {
          token: localStorage.getItem("tkn")
        }
      });
      if(data.status==="success"){
        console.log(CartId);
        toast.success("Order Successfully Initalized")
        setTimeout(function () {
          Navigat("/allorders");
        }, 1000);

        SetCartProducts([]);
        // setCartId(null);
        SetNumOfCarItems(0);
        SetTotalPrice(0);

      }else{
        toast.error("Error happened in proccesing")
      }
      // console.log(data);
    } catch (error) {
      console.log("error from payment page", error);
    }
    setCartLoad(false)
}


async function  confirmOnlinePayment (id){
  setCartLoad(true)

  const shippingAddress = {
    "shippingAddress": {
      "details": details,
      "phone": phone,
      "city": city
    }
  };
try {
  let {data}=  await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}`,shippingAddress,
{
  headers : {token : localStorage.getItem("tkn")},
  params : {url : "http://localhost:3000"}
}
);
console.log(data.session.url);
window.open(data.session.url,"_blank")

} catch (error) {
  console.log("error from online payment", error);
}
setCartLoad(false)

}



  if(CartLoad===true){
    return<>
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
  }


  return (
    <div className="container px-4">
      <form>
        <div className="row mt-5">

       
      <div className="col-md-6">
      <div className='pt-5'>
          <label htmlFor="phone" className='fs-5 fw-bold text-main'>Phone :</label>
          <input id='phone' type="tel" placeholder='Phone' className='my-3 form-control' value={phone} onChange={(e) => setPhone(e.target.value)} />

          <label htmlFor="city" className='fs-5 fw-bold text-main'>City :</label>
          <input id='city' type="text" placeholder='City' className='my-3 form-control' value={city} onChange={(e) => setCity(e.target.value)} />

          <label htmlFor="details" className='fs-5 fw-bold text-main'>Details : </label>
          <textarea id='details' className='form-control my-4' cols="30" rows="10" value={details} onChange={(e) => setDetails(e.target.value)}></textarea>

      

        
<div className="d-flex justify-content-between px-3">
<button type="button" className='btn bg-main text-white my-5' onClick={confirmCashPayment}>Confirm Cash Payment</button>
       

  
       <button type="button" className='btn bg-main text-white my-5' onClick={confirmOnlinePayment}>Confirm Online Payment</button>
</div>
        

       
        </div>

       
      </div>

      <div className="col-md-6">
          <img src={photo} alt="" />
        </div>
      </div>
      </form>
    </div>
  );
}

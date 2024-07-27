import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bars } from "react-loader-spinner";

export default function AllOrders() {
  let [orders, setOrders] = useState(null);

  useEffect(() => {
    const data = jwtDecode(localStorage.getItem("tkn"));
    GetUserOrder(data.id);
  }, []);

  async function GetUserOrder(Id) {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${Id}`
      );
      setOrders(data);
      console.log(data);
    } catch (error) {
      console.log("error from order page".error);
    }
  }

  if (orders === null) {
    return (
      <>
        return
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
      </>
    );
  }

  return (
    <>
        <div className="container mt-5 pt-5">
                    <div className="row">
                        <div className="col-md-11 m-auto">
                              <h4 className="text-center fs-3 text-main">All Orders </h4>
                            <div className=' bg-main-light my-3 p-4'>
                                {
                                    orders.map((elm) => elm.cartItems.map((el) =>
                                        <div className="row border-bottom d-flex align-items-center" key={el._id}>
                                            <div className="col-md-2 my-3">
                                                <img src={el.product.imageCover} className='w-100' />
                                            </div>
                                            <div className='col-md-10 my-3'>
                                            <h5>  Category  Name  : <span className="text-main">{el.product.category.name}  </span> </h5> 
                                                
                                                <p>Quantity : <span className='text-main fs-5 fw-bolder'> {el.count}</span> </p>
                                            
                                                <p>Price : <span className='text-main fs-5 fw-bolder'>{elm.totalOrderPrice}</span></p>

                                            </div>
                                        </div>)

                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
    </>
);

}

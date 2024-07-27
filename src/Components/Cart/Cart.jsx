import { CartContext } from "../../Context/CartContext";
import { Bars } from "react-loader-spinner";
import toast from "react-hot-toast";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert2'
import imag from '../../images/empty.jpg'

export default function Cart() {

  useEffect(function () {
  GetUserCart();
  }, []);

let[sharedLoad , setSharedLoad] = useState(false);




  let {
    TotalPrice,
    NumOfCarItems,
    CartProducts,
    DeleteOneItem,
    updateCount,
    RemoveCartData,
    GetUserCart
  } = useContext(CartContext);

  async function DeleteProduct(Id) {
    setSharedLoad(true)
    let result = await DeleteOneItem(Id);

    console.log(result);

    if (result.status === "success") {
      toast.success(" Product Has Already Deleted Form  your Cart");
    } else {
      toast.error("Error Eccoured ");
    }
    setSharedLoad(false)

  }

  async function UpdateElementCount(id, count) {
    if (count === -1) {
      count = 0;
      return;
    }
    setSharedLoad(true)


    let res = await updateCount(id, count);
    if (res.status === "success") {
      toast.success("Updated Count  Successfuly");
    } else {
      toast.error("Error happened");
    }
    setSharedLoad(false)

  }

  async function clearCart() {
    await swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => { // Make the callback async
      if (result.isConfirmed) {
       
        setSharedLoad(true);
        await RemoveCartData();
        setSharedLoad(false);
        await swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
          
        });
      }
    });
  }
  


  if (CartProducts?.length === 0) {
    return (
      <>
        <div className="mt-5 pt-5"  style={{ backgroundColor: "#eee" }}>
        <div className=" fs-3 fw-bold d-flex justify-content-center align-items-center w-100 pt-5">
        <img src={imag} className="w-25" alt="" />

        </div>
        <h2 className="text-center mt-4 text-main pb-4">Your Cart is Empty</h2>
        </div>
      </>
    );
  }

  if (CartProducts === null || (sharedLoad===true) ) {
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


      <div className="mt-5 pt-5 px-5">
        
    
        
          <div
            className="container my-5 py-5 px-3"
            style={{ backgroundColor: "#eee" }}
          >
            <h4 className="mt-5">Shop Cart : </h4>
            <h4 className="text-main fw-bold">Total Price : {TotalPrice}</h4>
            <h4 className="mb-4">Total Items : {NumOfCarItems}</h4>


<div className="d-flex align-items-center justify-content-between">
  
<button className="btn btn-danger" onClick={clearCart}>



              Delete Cart


</button>


<Link to="/payment" className="btn btn-success text-white">Confirm Payment</Link>           
</div>


            {CartProducts.map(function (produc, ind) {
              return (
                <>
                  {/* <div className="row align-items-center my-4" key={ind}> */}
                  <div className="row align-items-center my-4" key={produc.product.id}>
               

                    <div className="col-md-2">
                      <img
                        src={produc.product.imageCover}
                        className="w-100 mb-3"
                        alt=""
                      />
                      
                    </div>

                    <div className="col-md-6 text-start my-3">
                    <h4>{produc?.product?.title?.split(' ').slice(0, 3).join(' ')}</h4>

                      <p className="text-main fw-bold fs-3"> {produc.price} </p>

                      <button
                        className="btn btn-outline-danger"
                        onClick={() => DeleteProduct(produc.product.id)}
                      >
                        Remove <i className="fa-solid fa-trash "></i>
                      </button>
                    </div>

                    <div className="col-md-4 d-flex align-items-center justify-content-center">
                      <button
                        className="btn btn-outline-success mx-3"
                        onClick={() =>
                          UpdateElementCount(
                            produc.product.id,
                            produc.count + 1
                          )
                        }
                      >
                        +
                      </button>
                      <div>{produc.count}</div>
                      <button
                        className="btn btn-outline-success mx-3"
                        onClick={() =>
                          UpdateElementCount(
                            produc.product.id,
                            produc.count - 1
                          )
                        }
                      >
                        -
                      </button>
                    </div>



                    <hr />
                  </div>
                </>
              );
            })}



          </div>
          
        
      </div>



    </>
  );
}

import { Bars } from "react-loader-spinner";
import toast from "react-hot-toast";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert2'
import { CartContext } from "../../Context/CartContext";
import axios from "axios";
import img from '../../images/emptyWishlist.png'

export default function WishList() {

let [load , setLoad] = useState(false);
let [dataCount,SetCount] = useState(0);


  const { 
    productWishList,
    SetProductWishList,
    addToCart
  } = useContext(CartContext);




  async function GetFavourite() {
    setLoad(true)
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      SetProductWishList(data?.data);

      SetCount(data?.count);




      //  return data;
    } catch (error) {
    console.log(error);
    }
setLoad(false)
  }

  async function deleteFromWishList(id) {
    setLoad(true);
    try {
      let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: {
          token: localStorage.getItem("tkn")
        },
        // data: {
        //   productId: id
        // }
      });

      console.log(data?.status);
      if(data?.status === "success"){
        swal.fire({
          position: "center-center",
          icon: "success",
          title: "Your Product  has been Deleted From  your WishList",
          showConfirmButton: false,
          timer: 2000
        });
      }

      GetFavourite()
    
      console.log(data?.data);
    } catch (error) {
      console.error("Error deleting from wishlist:", error);
    } finally {
      setLoad(false);
    }
  }
  
  
  
async function AddProductToCart(Id){
  setLoad(true)
  let Response = await addToCart(Id);
  if(Response.status ==="success"){
    swal.fire({
      position: "center-center",
      icon: "success",
      title: "Your Product  has been Addet to your Cart",
      showConfirmButton: false,
      timer: 2000
    });
   // GetUserCart();
  }else{
    alert("error happen");  
  }
  setLoad(false);
  }



 useEffect(()=>{
   GetFavourite()
 },[]) 






 if(load===true){
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



if(dataCount===0){
  return<>
  
<div className="d-flex align-items-center justify-content-center vh-50 pt-5">
<img src={img} className="w-25" alt="" />
</div>



</>
}





 return (
  <>

<div className="mt-5 pt-5 px-5">
      
  
      
      <div
        className="container my-5 py-5 px-3"
        style={{ backgroundColor: "#eee" }}
      >
        <h4 className="mt-5 text-center fs-1 text-main">Your Wishlist   </h4>
       


<div className="d-flex align-items-center justify-content-between">




       
</div>


        {productWishList?.map(function (produc, ind) {
          return (
            <>
            
              <div className="row align-items-center my-4" key={produc.id}>
           

                <div className="col-md-2">
                  <img
                    src={produc.imageCover}

                    className="w-100 mb-3"
                    alt=""
                  />
                  
                </div>

                <div className="col-md-6 text-start my-3">
              
                <p className="text-black fw-bold fs-3"> {produc.brand.name} </p>

                  <p className="text-black fw-bold fs-3"> {produc.price} </p>
                  {/* <p className="text-main fw-bold fs-3"> {produc.id} </p> */}

                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteFromWishList(produc.id)}
                  >
                    Remove <i className="fa-solid fa-trash "></i>
                  </button>
                </div>


                <div className="col-md-4 d-flex align-items-center justify-content-center">
                      <button
                        className="btn btn-outline-success mx-3"
                        onClick={() =>
                          AddProductToCart(
                            produc.id,
                           
                          )
                        }
                      >
                        + Add To Cart
                      </button>
                      <div>{produc.count}</div>
                     
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

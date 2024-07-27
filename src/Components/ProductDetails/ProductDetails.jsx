import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Bars, ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

import "./ProductDetails.module.css"
import { CartContext } from "../../Context/CartContext";

export default function ProductDetails() {
  let { id } = useParams();


let [CartLoad, setCartLoad] = useState(false);




function GetProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
}

let {addToCart , AddToWishList } =  useContext(CartContext) ;

async function AddProductToCart(Id){
  setCartLoad(true)
  let Response = await addToCart(Id);
  
  // console.log(Response.numOfCartItems);
  // console.log(Response.data.products);
  // console.log(Response.data.totalCartPrice);

 
  
  if(Response.status ==="success"){
    toast.success( Response.message,{
      position : "top-right"
    })
  }else{
    alert("error happen");  
   
  
  }
  setCartLoad(false);
}

async function AddProductToWishList(Id){
  setCartLoad(true)
  let Response = await AddToWishList(Id);
  if(Response.status ==="success"){
    Swal.fire({
      position: "center-center",
      icon: "success",
      title: "Your Product  has been Addet to your WishList",
      showConfirmButton: false,
      timer: 2000
    });
  }else{
    alert("error happen");  
  }
  setCartLoad(false);
}


  let { data, isLoading } = useQuery("getDetails", GetProductDetails,{
    cacheTime:1500
  });




let title =  data?.data.data.title;
let productName = data?.data.data.category.name;
let ProductId = data?.data.data.id
let Desc = data?.data.data.description.split(" ").slice(0, 20).join(" ");





  const [sliderSettings, setSliderSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 2000,
  });


if(CartLoad === true){
  return<>
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
  
  
  </>
}

  return (
    <>
      {isLoading ? (
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
      ) : (
        <div className="container  align-items-center ">
          <div className="row align-items-center justify-content-center mt-5 pt-5">
            <div className="col-md-4 pt-5 px-5">


<Slider className="slider-container mt-5" {...sliderSettings}>
  {data?.data.data.images.map((image, index) => (
    <img
      src={image}
      key={index}
      className="w-100"
      height="550"
      alt=""
    />
  ))}
</Slider>





            </div>

            <div className="col-md-8  text-start pt-5 mt-5 px-5">

                <h2 className="my-3">{productName}</h2>
                <h6 className="my-3">{title}</h6>
                <p className="text-muted">{Desc}</p>
                

<button className="btn bg-main text-white w-100 my-3 d-flex align-items-center justify-content-center"  onClick={()=>{
  AddProductToCart(ProductId)
}} >
  
 {
  CartLoad ?  <ThreeCircles
  visible={true}
  height="50"
  width="80"
  color="#fff"
  ariaLabel="three-circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />   : <>  Add to Cart +   </>
 }
  
  
  
</button>

<button className="btn bg-danger text-white w-100 my-3 d-flex align-items-center justify-content-center"  onClick={()=>{
  AddProductToWishList(ProductId)
}} >
  
  Add to Wishlist +  
 
  
  
  
</button>

             
            </div>
          </div>
        </div>
      )}
    </>
  );
}




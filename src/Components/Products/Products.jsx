import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Bars, ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext, CartContextProvider } from "../../Context/CartContext";
import toast from 'react-hot-toast';
import Swal from 'sweetalert2'
import Aos from 'aos'
import 'aos/dist/aos.css'

export default function Products() {
  const specificIndex = 10;
let [allproducts, setAllProducts] = useState(null);

let [CartLoad, setCartLoad] = useState(false);

let { GetUserCart } = useContext(CartContext);
let {addToCart , AddToWishList} =  useContext(CartContext) ;

async function GetAllProducts() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setAllProducts(data.data);
    // Aos.refresh();
}



useEffect(function () {
GetAllProducts();
Aos.init({duration:2000});
}, []);







async function AddProductToCart(Id){
setCartLoad(true)
let Response = await addToCart(Id);
if(Response.status ==="success"){
  Swal.fire({
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
    <>
      {allproducts   ? (
        <div className="container mt-5">
          <div className="row pt-4">

            {allproducts.map(function (product, index) {
              return (
                <div className="col-lg-3 col-md-6 gx-4 gy-4 product" key={index} data-aos = "fade-right">
                  
                 <Link to={`/ProductDetails/${product.id}`}>
                    

                  <img src={product.imageCover} className="w-100" alt="" />
                  <div className="data px-3">
                    <h5 className="fw-bold my-2 text-main">
                      {product.category.name}
                    </h5>
                    <h4>{product.title.split(" ").slice(0, 2).join(" ")}</h4>

                    <div className="d-flex align-items-center justify-content-between">
                      <p className="fw-normal fs-5">{product.price} EGP</p>
                      <p>
                        {" "}
                        <i className="fa-solid fa-star rating-color px-1"></i>{" "}
                        {product.ratingsAverage}{" "}
                      </p>
                    </div>
                  </div>

                  </Link>



                  

<button className="btn bg-main text-white w-100 my-3 d-flex align-items-center justify-content-center"  onClick={()=>{ AddProductToCart(product.id) } } >Add to Cart +    </button>
<button className="btn btn-danger text-white w-100 my-3 d-flex align-items-center justify-content-center"  onClick={()=>{ AddProductToWishList(product.id) } } >Add to WishList +    </button>

                  

                



                  {/* <button className="btn bg-danger text-white w-100 my-2">Add To Favourite + </button> */}


                </div>
              );


              
            })}


          </div>
        </div>
      ) : (
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
      )}
    </>
  );


}






























  // function GetAllProducts(){
  //   return axios.get ( "https://ecommerce.routemisr.com/api/v1/products");
  // }

  // let {isError , isFetching , isLoading , data , refetch} = useQuery("allproducts",GetAllProducts , {
  //   refetchOnMount :false,
  //   refetchInterval:2000,
  //   cacheTime:3000,
  //   enabled: false
  // });
  // console.log(data?.data.data);





  // return (

  //   <>

  //    {/*  الجزء الخاص ب الاينابل*/}
  //   {/* <div>
  //     <button onClick={refetch}>get</button>
  //   </div> */}

  //     {(! isLoading ) ? (
  //       <div className="container mt-5">
  //         <div className="row pt-4">
  //           {data?.data.data.map(function (product, index) {
  //             return (
  //               <div className="col-lg-3 col-md-6 gx-4 gy-4" key={index}>
  //                 <div className="product"></div>
  //                 <img src={product.imageCover} className="w-100" alt="" />
  //                 <div className="data px-3">
  //                   <h5 className="fw-bold my-2 text-main">
  //                     {product.category.name}
  //                   </h5>
  //                   <h4>{product.title.split(" ").slice(0, 2).join(" ")}</h4>

  //                   <div className="d-flex align-items-center justify-content-between">
  //                     <p className="fw-normal fs-5">{product.price} EGP</p>
  //                     <p>
  //                       {" "}
  //                       <i className="fa-solid fa-star rating-color px-1"></i>{" "}
  //                       {product.ratingsAverage}{" "}
  //                     </p>
  //                   </div>
  //                 </div>
  //               </div>
  //             );
  //           })}
  //         </div>
  //       </div>
  //     ) : (
  //       <div className="vh-100 d-flex align-items-center justify-content-center">
  //         <Bars
  //           height="100"
  //           width="100"
  //           color="#4fa94d"
  //           ariaLabel="bars-loading"
  //           wrapperStyle={{}}
  //           wrapperClass=""
  //           visible={true}
  //         />
  //       </div>
  //     )}
  //   </>
  // );
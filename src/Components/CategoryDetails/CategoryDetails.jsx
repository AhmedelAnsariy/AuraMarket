import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import second from '../../images/flat-coming-soon-background_23-2148877229.avif'
import { Bars } from 'react-loader-spinner';
import { CartContext } from '../../Context/CartContext';
import Swal from 'sweetalert2';
export default function CategoryDetails() {
    let { id } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    let {addToCart , AddToWishList } =  useContext(CartContext) ;
    let [CartLoad, setCartLoad] = useState(false);


    async function getProductsInCategory() {
        setLoading(true);
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`);
        setProducts(data.data);
        console.log(data?.data);
        setLoading(false);
    }

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

    useEffect(() => {
        getProductsInCategory();
    }, []);


    if(loading===true || CartLoad===true){
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
        <div className="container mt-5 pt-5">
          <div className="row mt-5">
            {products.length === 0 ? (
              <div className='text-center'>
                <img src={second} width={550} alt="" />
                <div>
                  <h5 className='mt-5 fs-2 text-center'>This category does not have products currently...</h5>
                </div>
              </div>
            ) : (
              products?.map(function(prod, idx) {
                return (
                  <div className="col-md-3 g-5 product" key={prod.id}>
                    <Link  to={"/ProductDetails/"+prod._id}>
                   
                    <img src={prod.imageCover} className='w-100' alt="" />
                    <h4 className='text-center my-3'>{prod.title.split(" ").slice(0,2).join(" ")}</h4>
                    <div className='d-flex justify-content-between'>
                                            <div>
                                                <p className='text-center text-main fs-5 fw-bold'>{prod.price} EGP</p>
                                            </div>
                                            <div className=''>
                                                <i className="fa-solid fa-star rating-color mx-1"></i>
                                                <span className='mx-1'>{prod.ratingsAverage}</span>
                                            </div>
                                        </div>
                                        </Link>
                                        
<button className="btn bg-main text-white w-100 my-3 d-flex align-items-center justify-content-center"  onClick={()=>{ AddProductToCart(prod._id) } } >Add to Cart +    </button>
<button className="btn btn-danger text-white w-100 my-3 d-flex align-items-center justify-content-center"  onClick={()=>{ AddProductToWishList(prod._id) } } >Add to WishList +    </button>

                  </div>
                );
              })
            )}
          </div>
        </div>
      );
      

  
   
   
}

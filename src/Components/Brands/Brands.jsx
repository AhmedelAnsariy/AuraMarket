import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Bars } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function Brands() {
  let [Brands, setBrands] = useState(null);
  const [brandDetails, setBrandDetails] = useState(null);

  let [load, setLoad] = useState(false);


  async function getAllBrands() {
    setLoad(true);
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    setBrands(data?.data);
    console.log(data?.data);
   // console.log(categories);
    setLoad(false);
  }







  useEffect(() => {
    getAllBrands();
  }, []);

  if (load === true) {
    return (
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
    );
  }

  return (
    <>

<div className="container p-5 mt-5">
  <div className="row">
    {Brands?.map(function(brand, idx) {
      return (
       





<div className="col-md-4  p-3" key={brand._id}>
      <div className="p-3 border border-3 border-dark"  data-bs-toggle="modal" data-bs-target="#exampleModal">
        <img src={brand.image} className="w-100" height={350} alt="" />
        <h5 className="text-center my-3">{brand.name}</h5>
      </div>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {/* <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1> */}
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
             <div className="row d-flex align-items-center">
             <div className="col-md-6">

 <h5 className="text-center my-3">{brand.name}</h5>
<h5 className="text-center my-3 text-main fs-1">{brand.slug}</h5>
             </div>
             <div className="col-md-6">
        <img src={brand.image} className="w-100" height={150} alt="" />

              </div>
             </div>

             
            
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>


    </div>




      );
    })}
  </div>
</div>
    
    
    </>
  )
}

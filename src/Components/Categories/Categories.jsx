import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Bars } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Categories() {

  let [categories, setCategories] = useState(null);
  let [load, setLoad] = useState(false);

  async function getAllCategories() {
    setLoad(true);
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    setCategories(data?.data);
   // console.log(categories);
    setLoad(false);
  }

  useEffect(() => {
    getAllCategories();
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

<div className="container p-5 mt-5">
  <div className="row">
    {categories?.map(function(cat, idx) {
      return (
       
      <div className="col-md-3  rounded-3" key={cat._id}>
<Link to={`/CategoryDetails/${cat._id}`}>
          <div className="bg-body p-3">
            <img src={cat.image} className="w-100" height={350} alt="" />
            <h5 className="text-center my-3">{cat.name}</h5>
           
          </div>
          </Link>

        </div>
      );
    })}
  </div>
</div>




  );
}



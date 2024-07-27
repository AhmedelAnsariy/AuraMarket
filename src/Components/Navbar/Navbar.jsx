import React, { useContext } from 'react'

import logo from "../../images/freshcart-logo.svg"
import { NavLink, useNavigate } from 'react-router-dom'
import { authContext } from '../../Context/Authentication'
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {

let {Token , setToken } = useContext(authContext);
let navigate =  useNavigate();


function LogOut(){
localStorage.removeItem('tkn');
setToken(null);
navigate('/login');
}



let {NumOfCarItems} = useContext(CartContext);

  return (
    <>
    
  <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top py-4 mb-5">

  <div className="container px-4">


    <NavLink className="navbar-brand" to="">

      <img src={logo} alt="logo" />

    </NavLink>


    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>


    <div className="collapse navbar-collapse" id="navbarSupportedContent">


      <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center ">

{Token ?<>

  <li className="nav-item">
          <NavLink className="nav-link active fs-4" aria-current="page" to="/products">Products</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link fs-4" to="/categories">Categories</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link fs-4" to="/brands">Brands</NavLink>
        </li>


      



</> : "" }


      </ul>


      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">


{
Token ? <>




<li className="nav-item">
  <NavLink className="nav-link" to="/profile"><i className="fa-solid fa-user text-main fs-4"></i></NavLink>
</li>
</>

: <>

<li className="nav-item">
  <NavLink className="nav-link fs-4" to="/login">Login</NavLink>
</li>

<li className="nav-item">
  <NavLink className="nav-link fs-4" to="/register">Register</NavLink>
</li>
</>
}








{

Token ? <>
       <li className="nav-item px-4">
          <NavLink className="nav-link" to="/WishList"> <i className="fa-solid fa-heart fs-2 text-danger"></i> </NavLink>
        </li>
       


        



        <li className="nav-item">
          <NavLink className="nav-link position-relative" to="/cart">
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main">
    
          {NumOfCarItems}
  </span>
  <i className="fa-solid fa-cart-shopping fs-3 text-main"></i>
            
            
            
            </NavLink>
        </li>

<li className="nav-item">
  <span className="nav-link ms-5 fs-4" style={{cursor :"pointer"}}  onClick={LogOut}>LogOut</span>
</li>

</>
: ""
}



</ul>


</div>
</div>




</nav>

    
</>
  )
}

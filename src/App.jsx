import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LayOut from './Components/LayOut/LayOut'
import Products from './Components/Products/Products'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import NotFound from './Components/NotFound/NotFound'
import Profile from './Components/Profile/Profile'
import { AuthProvider } from './Context/Authentication'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'

import { QueryClient , QueryClientProvider } from 'react-query' 

import Home from './Components/Home/Home'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Cart from './Components/Cart/Cart'
import { CartContextProvider } from './Context/CartContext'

import toast, { Toaster } from 'react-hot-toast';
import Payment from './Components/Payment/Payment'
import AllOrders from './Components/AllOrders/AllOrders'
import CategoryDetails from './Components/CategoryDetails/CategoryDetails'
import BrandDetails from './Components/BrandDetails/BrandDetails'
import WishList from './Components/WishList/WishList'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import VerifyCode from './Components/VerifyCode/VerifyCode'
import AddNewPassword from './Components/AddNewPassword/AddNewPassword'


const MyRouter = createBrowserRouter(  [


{
  path : "/" , element : <LayOut/> , children : [

    {index : true , element :<ProtectedRoute> <Home /> </ProtectedRoute>  },
    {path :"home" , element :<ProtectedRoute>  <Home /> </ProtectedRoute>} ,
   

    
    
    {path :"products" , element :<ProtectedRoute>  <Products/> </ProtectedRoute>} ,
    {path :"ProductDetails/:id" , element :<ProtectedRoute>  <ProductDetails/>  </ProtectedRoute>} ,
    {path :"login" , element : <Login/>} ,
    {path :"register" , element : <Register/>} ,
    {path :"categories" , element :<ProtectedRoute> <Categories/> </ProtectedRoute> } ,
    {path :"cart" , element :<ProtectedRoute> <Cart/> </ProtectedRoute> } ,
    {path :"profile" , element :<ProtectedRoute>  <Profile/> </ProtectedRoute> } ,
    {path :"brands" , element : <ProtectedRoute><Brands/> </ProtectedRoute>} ,
    {path :"BrandDetails/:id" , element : <ProtectedRoute><BrandDetails/> </ProtectedRoute>} ,
    {path :"payment" , element : <ProtectedRoute><Payment></Payment> </ProtectedRoute>} ,
    {path :"AllOrders" , element : <ProtectedRoute><AllOrders></AllOrders> </ProtectedRoute>} ,
    {path :"categories" , element : <ProtectedRoute><Categories/> </ProtectedRoute>} ,
    {path :"CategoryDetails/:id" , element : <ProtectedRoute><CategoryDetails/> </ProtectedRoute>} ,
    {path :"WishList" , element : <ProtectedRoute><WishList/> </ProtectedRoute>} ,
    {path :"forgetpassword" , element :  <ForgetPassword/> } ,
    {path :"verifycode" , element :  <VerifyCode/> } ,
    {path :"addnewpassword" , element :  <AddNewPassword/> } ,
    {path :"*" , element : <NotFound/>} ,
  ]
}


])







export default function App() {

  let clientQuery = new QueryClient();
  
  return (
    <>

    <QueryClientProvider client={clientQuery}>


<CartContextProvider>

  

    <AuthProvider>
    <RouterProvider    router={MyRouter} />

    
    </AuthProvider>


    </CartContextProvider>

    <Toaster />
    </QueryClientProvider>


    

    </>
  )
}

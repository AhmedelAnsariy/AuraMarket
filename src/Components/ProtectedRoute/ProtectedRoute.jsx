import React, { useContext } from 'react'
import { authContext } from '../../Context/Authentication'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute(  {children} ) {

let {Token} =  useContext(authContext)


if(localStorage.getItem('tkn') !==null){
    return <>
    {children}
    </>


}else{
    return <Navigate to = {'/login'} />
}





}

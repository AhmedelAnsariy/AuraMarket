import { createContext, useEffect, useState } from "react";



export const authContext = createContext();


export function AuthProvider( {children} ){

let[Token , setToken] = useState(null); 


useEffect (function(){
    if(localStorage.getItem('tkn') !==null){
     setToken(localStorage.getItem('tkn'))
    }
})




    return<authContext.Provider  value={  {Token , setToken }}>   

{children}
    
    
    </authContext.Provider>
}


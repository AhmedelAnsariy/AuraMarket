import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  let [TotalPrice, SetTotalPrice] = useState(0);
  let [NumOfCarItems, SetNumOfCarItems] = useState(0);

  let [CartProducts, SetCartProducts] = useState(null);
   let [productWishList , SetProductWishList] = useState(null);
  

  let[CartId,setCartId] = useState(null);

  async function addToCart(Id) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: Id,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

       GetUserCart();

      // SetNumOfCarItems(data.numOfCartItems);
      //SetTotalPrice(data.data.totalCartPrice);
      // SetCartProducts(data.data.products)

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function GetUserCart() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      SetTotalPrice(data?.data?.totalCartPrice);
      SetNumOfCarItems(data?.numOfCartItems);
      SetCartProducts(data?.data?.products);
      setCartId(data?.data?._id);

      //  return data;
    } catch (error) {
     if(error.message==="Request failed with status code 404"){
      SetCartProducts([]);
     }
    }
  }

  async function DeleteOneItem(id) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      SetNumOfCarItems(data.numOfCartItems);
      SetTotalPrice(data.data.totalCartPrice);
      SetCartProducts(data.data.products);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateCount(ProductId, count) {
    try {
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${ProductId}`,
        { count: count },
        {
          headers: {
            token: localStorage.getItem("tkn") || "", // Handle null token
          },
        }
      );
      SetNumOfCarItems(data.numOfCartItems);
      SetTotalPrice(data.data.totalCartPrice);
      SetCartProducts(data.data.products);

      return data;
    } catch (error) {
      console.log("error from update", error);
    }
  }

  async function RemoveCartData() {
    try {
      let { data } = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      SetTotalPrice(0);
      SetNumOfCarItems(0);
      SetCartProducts([]);

      //  return data;
    } catch (error) {
      console.log(error);
    }
  }



  async function AddToWishList(id) {
    try {
      let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", {
        productId: id,
      }, {
        headers: {
          token: localStorage.getItem("tkn"),
        }
      });
  
      GetUserCart();
      return data;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  }
  










  useEffect(function () {
    GetUserCart();

  }, []);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        GetUserCart,

        TotalPrice,
        SetTotalPrice,

        NumOfCarItems,
        SetNumOfCarItems,

        SetCartProducts,
        CartProducts,

        updateCount,

        DeleteOneItem,
        RemoveCartData,

        CartId,
        setCartId,


        SetProductWishList,
        productWishList,

        AddToWishList



      }}
    >
      {children}
    </CartContext.Provider>
  );
}

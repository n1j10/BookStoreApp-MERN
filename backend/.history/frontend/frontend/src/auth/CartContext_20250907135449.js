import { createContext, useState } from "react";

const CartContext  =  createContext()

export const CartProvider =({children})=>{
        const [cart,setCart] = useState({
            items:[],
            totalAmount:0,
            totalItems: 0

        })
}
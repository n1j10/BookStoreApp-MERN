import React from 'react'
import {ShoppingCart,BadgeCheck,Tag,ShieldCheck  } from "lucide-react"
function Highlights() {
  return (
    <div className='flex items-center justify-between mt-10'>
      <div className='flex item-center gap-4  '>
        <ShoppingCart className="text-[#F86D72] text-[34px] "/>
        <p>Enjoy fast and free shipping on all your orders with no extra cost</p>
       </div>

        <div className='flex item-center gap-4 '>
        <BadgeCheck className="text-[#F86D72] text-[34px] "/>
        <p>Enjoy fast and free shipping on all your orders with no extra cost</p>
       </div>

        <div className='flex item-center gap-4 '>
        <Tag  className="text-[#F86D72] text-[34px] "/>
        <p>Enjoy fast and free shipping on all your orders with no extra cost</p>
       </div>

        <div className='flex item-center gap-4 '>
        <ShieldCheck  className="text-[#F86D72] text-[34px] "/>
        <p>Enjoy fast and free shipping on all your orders with no extra cost</p>
       </div>
    </div>
  )
}

export default Highlights
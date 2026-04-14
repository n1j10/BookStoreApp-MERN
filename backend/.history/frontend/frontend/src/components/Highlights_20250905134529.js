import React from 'react'
import {ShoppingCart,BadgeCheck,Tag,ShieldCheck  } from "lucide-react"
function Highlights() {
  return (
    <div className='flex items-center justify-between mt-10'>
      <div className='flex item-center gap-4  '>
        <ShoppingCart className="text-[#F86D72] text-[34px] "/>
        <h4>Free Delivery</h4>
        <p>Enjoy fast and free shipping on all your orders with no extra cost</p>
       </div>

        <div className='flex item-center gap-4 '>
        <BadgeCheck className="text-[#F86D72] text-[34px] "/>
       <h4>Quality Guarantee</h4>
        <p>We ensure premium quality for every book and product we offer</p>
       </div>

        <div className='flex item-center gap-4 '>
        <Tag  className="text-[#F86D72] text-[34px] "/>
       <h4>Daily Offers</h4>
        <p>Discover new deals and discounts every day on top titles</p>
       </div>

        <div className='flex item-center gap-4 '>
        <ShieldCheck  className="text-[#F86D72] text-[34px] "/>
        <h4>100% Secure Payment</h4>
        <p>Your payments are fully protected with safe and reliable checkout.</p>
       </div>
    </div>
  )
}

export default Highlights
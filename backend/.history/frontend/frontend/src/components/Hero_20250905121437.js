import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};
function Hero({deviceType="desktop"}) {
  return (
   <Carousel
   swipeable
  draggable
  showDots
  responsive={responsive}
  ssr={false}
  infinite
  autoPlay={deviceType !== "mobile"}
  autoPlaySpeed={3000}
  keyBoardControl
  customTransition="transform .5s ease"
  transitionDuration={500}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet", "mobile"]}
  deviceType={deviceType}   // <-- سترينغ مش بوليني
  dotListClass="custom-dot-list-style"
>
   <div className="relative h-[100vh] md:h-[80vh]">
     <img src="/img_1.jpg" alt="عرض 1" className="block h-full w-full " />
      </div>
  <div className="relative h-[100vh] md:h-[80vh]">
        <img src="/img_2.jpg" alt="عرض 1" className="block h-full w-full " />
      </div>


 <div className="relative h-[100vh] md:h-[80vh]">
        <img src="/img_3.jpg" alt="عرض 1" className="block h-full w-full " />
      </div>
  
</Carousel>
  )
}

export default Hero
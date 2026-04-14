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
  swipeable={false}
  draggable={false}
  showDots={true}
  responsive={responsive}
  ssr={true} // means to render carousel on server-side.
  infinite={true}
  autoPlay={deviceType !== "mobile" ? true : false}
  autoPlaySpeed={1000}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={500}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet", "mobile"]}
  deviceType={deviceType}

  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-40-px"
>
   <div className="relative  w-full md:h-[80vh]">
     <img src="/img_1.jpg" alt="عرض 1" className="block  w-full object-contain" />
      </div>
  <div className="relative  md:h-[80vh]">
        <img src="/img_2.jpg" alt="عرض 1" className="block  w-full object-contain" />
      </div>


 <div className="relative  md:h-[80vh]">
        <img src="/img_3.jpg" alt="عرض 1" className="block  w-full object-contain" />
      </div>
  
</Carousel>
  )
}

export default Hero
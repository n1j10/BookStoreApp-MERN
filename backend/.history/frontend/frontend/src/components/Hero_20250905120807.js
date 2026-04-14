import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1, slidesToSlide: 3 },
  tablet:  { breakpoint: { max: 1024, min: 464 }, items: 1, slidesToSlide: 3 },
  mobile:  { breakpoint: { max: 464,  min: 0   }, items: 1, slidesToSlide: 3 },

};
function Hero({deviceType="desktop"}) {
  return (
   <Carousel
  swipeable={false}
  draggable={false}
  showDots={true}
  responsive={responsive}
  ssr={false} // means to render carousel on server-side.
  infinite={true}
  autoPlay={deviceType !== "mobile" ? true : false}
  autoPlaySpeed={1000}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={500}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet", "mobile"]}
  deviceType={deviceType !== "mobile" ? true : false}
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-40-px"
>
  {/* Slide 1 */}
      <div className="relative h-[70vh] md:h-[80vh]">
        <img src="/img_1.jpg" alt="عرض 1" className="h-full w-full object-cover" />
      </div>

      {/* Slide 2 */}
      <div className="relative h-[70vh] md:h-[80vh]">
        <img src="/img_2.jpg" alt="عرض 2" className="h-full w-full object-cover" />
      </div>

      {/* Slide 3 */}
      <div className="relative h-[70vh] md:h-[80vh]">
        <img src="/img_3.jpg" alt="عرض 3" className="h-full w-full object-cover" />
      </div>
  
</Carousel>
  )
}

export default Hero
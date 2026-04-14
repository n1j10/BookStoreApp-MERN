import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
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
  deviceType={deviceType !== "mobile" ? true : false}
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-40-px"
>
   {/* Slide 1 */}

    <div className="relative h-[70vh] md:h-[80vh]">
          <img
            src="/hero-1.jpg"
            alt="عرض 1"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-white text-3xl md:text-5xl font-bold">
              مرحبًا بك في متجر الكتب
            </h2>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative h-[70vh] md:h-[80vh]">
          <img
            src="/hero-2.jpg"
            alt="عرض 2"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-white text-3xl md:text-5xl font-bold">
              اكتشف أحدث العناوين
            </h2>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative h-[70vh] md:h-[80vh]">
          <img
            src="/hero-3.jpg"
            alt="عرض 3"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-white text-3xl md:text-5xl font-bold">
              خصومات وشحن سريع
            </h2>
          </div>
        </div>
  
</Carousel>
  )
}

export default Hero
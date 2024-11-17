import { Carousel, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

import banner12 from '../../assets/banner12.jpg'
import banner13 from '../../assets/banner13.jpg'
 
export default function Banner() {


  return (
    <div className="h-[300px] md:h-[500px]">
      <Carousel className="h-full">
        <div className="relative h-full w-full">
          <img
            src={banner12}
            alt="image 1"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 grid h-full w-full place-items-center ">
            
          </div>
        </div>
        <div className="relative h-full w-full">
          <img
            src={banner13}
            alt="image 2"
            className="h-full w-full object-cover object-center"
          />
     
        </div>
      
      </Carousel>
    </div>
  );
}

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Carousel.css";
import { Link } from "react-router-dom";

type Callout = {
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

type CollectionsProps = {
  callouts: Callout[];
};

const Collections: React.FC<CollectionsProps> = ({ callouts }) => {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <div className="mx-auto">
        <div className="py-16 sm:py-24 lg:py-32">
          <h2 className="text-2xl font-bold">Collections</h2>
          <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen p-6">
            <Slider {...settings}>
              {callouts.map((callout) => (
                <div key={callout.name} className="group relative p-2">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:h-64">
                    <img
                      src={callout.imageSrc}
                      alt={callout.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-sm">
                    <Link to={callout.href}>
                      <span className="absolute inset-0" />
                      {callout.name}
                    </Link>
                  </h3>
                  <p className="text-base font-semibold">
                    {callout.description}
                  </p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;

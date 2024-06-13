import React from "react";
import { Link } from "react-router-dom";
import { productionUrl } from "../config";

const Hero: React.FC = () => {
  const imageUrl = `${productionUrl}public/images/hero1.jpg`;
  return (
    <>
      <div className="relative overflow-hidden sm:overflow-hidden xl:overflow-visible">
        <div className="pb-80 sm:pb-40 lg:pb-48">
          <div className="relative mx-auto max-w-7xl px-0 sm:static sm:px-6 lg:px-0">
            <div className="sm:max-w-lg">
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
                Elevate Your Running Experience
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-8">
                Our curated selection of top-quality running gear and apparel is
                designed to help you achieve your personal best, whether you're
                a seasoned marathoner or just starting your running journey. Run
                with confidence, run with Runway.
              </p>
              <div className="pt-5">
                <Link to="/products" className="btn btn-primary">
                  Shop now
                </Link>
              </div>
            </div>
            <div>
              <div className="mt-10">
                {" "}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <img
                      src={imageUrl}
                      alt="Product screenshot"
                      className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                      width={2432}
                      height={1442}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

import React from "react";
import { FeaturedProducts, Hero } from "../components";
import { customFetch } from "../utils";
import { QueryClient } from "@tanstack/react-query";
import { LoaderFunction } from "react-router-dom";
import Collections from "../components/Collections";

const url = "/products?featured=true";

const featuredProductsQuery = {
  queryKey: ["featuredProducts"],
  queryFn: () => customFetch(url),
};

const callouts: Callout[] = [
  {
    name: "Speed Demons",
    description:
      "Unleash your fastest times with our Speed Demons collection, designed for maximum velocity and performance.",
    imageSrc: "https://run-way.onrender.com/api/public/images/hero7.jpg",
    imageAlt: "Image 1",
    href: "/products?search=&category=Speed&company=All&order=a-z&price=100000",
  },
  {
    name: "Track Masters",
    description:
      "Dominate the track with our Track Masters collection, crafted for precision and control.",
    imageSrc: "https://run-way.onrender.com/api/public/images/hero3.jpg",
    imageAlt: "Image 2",
    href: "/products?search=&category=Track&company=All&order=a-z&price=100000",
  },
  {
    name: "Trail Blazers",
    description:
      "Conquer any trail with our Trail Blazers collection, engineered for rugged terrains.",
    imageSrc: "https://run-way.onrender.com/api/public/images/hero4.jpg",
    imageAlt: "Image 3",
    href: "/products?search=&category=Trail&company=All&order=a-z&price=100000",
  },
  ,
  {
    name: "Road Warriors",
    description:
      "Endure long distances on the road with our Road Warriors collection, designed for durability and comfort.",
    imageSrc: "https://run-way.onrender.com/api/public/images/hero5.jpg",
    imageAlt: "Image 3",
    href: "/products?search=&category=Road&company=All&order=a-z&price=100000",
  },
  {
    name: "Marathon Elite",
    description:
      "Achieve new personal bests with the Marathon Elite collection, engineered for maximum endurance and peak performance on long-distance runs.",
    imageSrc: "https://run-way.onrender.com/api/public/images/hero2.jpg",
    imageAlt: "Image 3",
    href: "/products?search=&category=Long-Distance&company=All&order=a-z&price=100000",
  },
];

export const loader =
  (queryClient: QueryClient): LoaderFunction =>
  async () => {
    const response = await queryClient.ensureQueryData(featuredProductsQuery);

    const products = response.data.data;
    return { products };
  };

const Landing: React.FC = () => {
  return (
    <>
      <Hero />
      <Collections callouts={callouts} />
      <FeaturedProducts />
    </>
  );
};

export default Landing;

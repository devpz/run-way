import React from "react";
import styled from "styled-components";
import ScrollToTop from "../components/ScrollToTop";

const src = "public/logo.png";

const Img = styled.img`
  height: 2.5rem;
  width: auto;
`;

const About: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
        <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl">
          We love <span className="text-customBlue">RUN</span>.
          <br />
          We love <span className="text-customBlue">RUN</span>
          <span className="text-customOrange">WAY</span>.
        </h1>
      </div>
      <p className="mt-6 text-justify text-lg leading-8 max-w-2xl mx-auto">
        We are a team of running enthusiasts who believe that every step is a
        step in the right direction. Our passion for running drives us to
        continually seek out the best gear that will help you achieve your
        running goals. <br />
        <br />
        At Runway, we don't just sell running gear – we live and breathe
        running. Our mission is to provide high-quality products that not only
        enhance your comfort and performance but also add motivation to tackle
        every challenge on the road. <br />
        <br />
        In our store, you'll find a wide selection of shoes, apparel, and
        accessories tailored to the diverse needs and preferences of runners.
        Whether you're a beginner just starting your running journey or an
        experienced marathoner, we want to be your partner at every stage of
        your running adventure. <br />
        <br />
        As committed runners ourselves, we personally test every product we
        offer to ensure it meets our highest standards of quality and
        performance. Additionally, our team of experts is always ready to advise
        you on selecting the best gear for your individual needs. <br />
        <br />
        Join the Runway community and share our love for running. Together, we
        push boundaries, break personal records, and inspire each other to reach
        new heights. Thank you for being part of our running family! <br />
        <br />
        Visit our store and join our community on the road!
        <br />
        <br />
        Run with passion,
        <br />
        The Runway Team
      </p>
    </>
  );
};

export default About;

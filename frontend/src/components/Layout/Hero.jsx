import React from "react";
import heroImg from "../../assets/assets/HeroImg.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative">
      {/* Hero Image */}
      <img
        src={heroImg}
        alt="Vastra Hero"
        className="w-full h-[300px] md:h-[500px] lg:h-[700px] object-cover"
      />

      {/* Hero Content */}
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="text-center text-gray-50 px-4">
          <h1 className="text-4xl md:text-9xl font-semibold tracking-tighter uppercase mb-4">
            Vacation
          </h1>
          <p className="text-sm md:text-lg mb-6">
            Explore our Vacation-ready Outfits
          </p>
          <Link
            to="/collection"
            className="bg-gray-50 text-gray-900 px-6 py-2 rounded-md font-semibold shadow-md hover:bg-gray-200 transition duration-300 ease-in-out">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

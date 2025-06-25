import React from "react";
import femaleImg from "../../assets/assets/rename.jpg";

const FeaturedC = () => {
  return (
    <section className="py-16 px-6 md:px-14 bg-gray-50">
      <h2 className="text-3xl font-semibold mb-10 text-center text-gray-800">
        Featured Product
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left content */}
        <div className="md:w-1/2 text-center md:text-left">
          <p className="text-gray-700 text-lg mb-4 leading-relaxed">
            Introducing our top-selling item of the season — a perfect blend of modern fashion and timeless craftsmanship.
            Designed with premium materials, this product not only looks good but feels incredibly comfortable to wear.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Whether you're heading out for a casual day or dressing up for an event, our featured product adapts to every
            occasion. It's more than just a style statement — it's a reflection of your personality.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Trusted by thousands of happy customers, this item is known for its durability, design, and versatility.
            Don’t miss the chance to own something truly special.
          </p>

          <a
            href="/products/featured"
            className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300 inline-block mt-4"
          >
            Shop Now
          </a>
        </div>

        {/* Right image */}
        <div className="md:w-1/3">
          <img
            src={femaleImg}
            alt="Featured Product"
            className="rounded-md shadow-md max-w-full transform transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedC;

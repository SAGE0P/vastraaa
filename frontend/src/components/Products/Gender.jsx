import React from "react";
import { Link } from "react-router-dom";
import femaleImg from "../../assets/assets/female.jpg";
import maleImg from "../../assets/assets/male.jpg";

const Gender = () => {
  return (
    <section className="py-16 px-14 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Women's Collection */}
        <Link to="/womens-collection" className="flex-1 group relative">
          <img
            src={femaleImg}
            alt="Women's Collection"
            className="w-full h-[500px] object-cover rounded-md shadow-md transform group-hover:scale-105 transition duration-500 ease-in-out"
          />
          <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-60 text-gray-50">
            <h2 className="text-2xl font-semibold">Shop Women's</h2>
          </div>
        </Link>

        {/* Men's Collection */}
        <Link to="/mens-collection" className="flex-1 group relative">
          <img
            src={maleImg}
            alt="Men's Collection"
            className="w-full h-[500px] object-cover rounded-md shadow-md transform group-hover:scale-105 transition duration-500 ease-in-out"
          />
          <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-60 text-gray-50">
            <h2 className="text-2xl font-semibold">Shop Men's</h2>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Gender;

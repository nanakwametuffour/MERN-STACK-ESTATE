import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
export default function ListingItem({ listing }) {
  return (
    <div className=" bg-white shadow-md hover:shadow-lg overflow-hidden transition-shadow rounded-lg w-full sm:w-[260px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className=" h-[300px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2">
          <p className=" text-lg font-semibold text-slate-700 truncate">
            {listing.name}
          </p>
          <div className=" flex  items-center gap-2 w-full">
            <MdLocationOn className=" text-green-700 w-4 h-4" />
            <p className=" truncate text-sm text-gray-700 w-full">
              {listing.address}
            </p>
          </div>
          <p className=" text-sm text-gray-700 line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-500 mt-1 font-semibold">
            ${""}
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && "/month"}
          </p>
          <div className="text-slate-700 flex gap-4">
            <div className=" font-semibold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} 
            beds`
                : `${listing.bedrooms} beds`}
            </div>
            <div className=" font-semibold text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} 
            bath`
                : `${listing.bedrooms} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

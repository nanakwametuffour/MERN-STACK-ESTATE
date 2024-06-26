import React from "react";

export default function CreateListing() {
  return (
    <main className="p-5 max-w-4xl mx-auto">
      <h1 className="text-3xl text-center my-7 font-semibold uppercase">
        Create a listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-5">
        <div className="flex gap-4 flex-col flex-1">
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="p-3 rounded-lg border focus:outline-none"
            maxLength={62}
            min={10}
            required
          />
          <textarea
            type="text"
            id="description"
            placeholder="Discription"
            className="p-3 rounded-lg border focus:outline-none"
          />
          <input
            type="text"
            id="address"
            placeholder="Address"
            className="p-3 rounded-lg border focus:outline-none"
            required
          />
          <div className="">
            <div className=" flex flex-wrap gap-6">
              <div className="flex gap-2">
                <input className="w-5" type="checkbox" />
                <label id="sale">Sell</label>
              </div>

              <div className="flex gap-2">
                <input type="checkbox" className="w-5" />
                <label id="rent">Rent</label>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" className="w-5" />
                <label id="parking">Parking spot</label>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" className="w-5" />
                <label id="furnished">Furnished</label>
              </div>
              <div className="flex gap-2">
                <input className="w-5 " type="checkbox" />
                <label id="other">Other</label>
              </div>
            </div>
            <div className="my-7 flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <input
                  className="p-3 border border-gray-300 rounded-lg"
                  type="number"
                  id="bedrooms"
                  min="1"
                  max={"10"}
                  required
                />
                <label>Beds</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="p-3 border border-gray-300 rounded-lg"
                  type="number"
                  id="bathrooms"
                  min="1"
                  max={"10"}
                  required
                />
                <label>Baths</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="p-3 border border-gray-300 rounded-lg"
                  type="number"
                  id="regularPrice"
                  min="1"
                  max={"10"}
                  required
                />
                <div className=" flex flex-col items-center">
                  <label>Regular price</label>
                  <span className="text-xs">($/month)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="p-3 border border-gray-300 rounded-lg"
                  type="number"
                  id="discountPrice"
                  min="1"
                  max={"10"}
                  required
                />
                <div className="flex flex-col items-center">
                  <label>Discount price</label>
                  <span className="text-xs"> ($/month)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-5">
          <p className="font-semibold">
            Images:
            <span className="text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-2">
            <input
              className="p-3 border border-gray-400 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="border border-green-700 text-green-700 p-3 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}

import React from 'react'

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className=" p-7 border-b-2 md:border-r-2 md:h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className=" whitespace-nowrap font-semibold">Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className=" focus:outline-none border rounded-lg p-3 w-full"
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className=' font-semibold'>Type:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" />
              <span>Rent & Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span> Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className=' font-semibold'>Aminities:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
          </div>
          <div className=" flex items-center gap-3">
            <label className=' font-semibold'>Sort:</label>
            <select id="sort_order" className='border rounded-xl p-3'>
              <option value="">Price high to low</option>
              <option value="">Price low to high</option>
              <option value="">Latest</option>
              <option value="">Oldest</option>
            </select>
          </div>
          <button className=" w-full bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-90">search</button>
        </form>
      </div>
      <div className="">
        <h1 className='text-3xl font-semibold border-b-2 text-slate-700 mt-4 p-4'>listing results:</h1>
      </div>
    </div>
  );
}

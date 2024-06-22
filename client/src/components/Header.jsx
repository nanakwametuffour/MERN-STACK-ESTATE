import React from "react";
import { Link } from "react-router-dom";
 import {FaSearch} from 'react-icons/fa'
export default function Header() {
  return (
    <header className="bg-slate-800  shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-blue-700">Kwame</span>
            <span className="text-white">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <button>
            <FaSearch />
          </button>
        </form>
        <ul className="flex gap-4 text-white font-semibold">
          <Link to={"/"}>
            <span className="hidden sm:inline text-white hover:underline">
              Home
            </span>
          </Link>
          <Link to={"/about"}>
            <span className="hidden sm:inline text-white hover:underline">
              About
            </span>
          </Link>
          <Link to={"/sign-in"}>
            <span className=" sm:inline text-white hover:underline">Sign In </span>
          </Link>
        </ul>
      </div>
    </header>
  );
}

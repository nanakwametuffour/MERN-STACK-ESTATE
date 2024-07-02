import  { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
export default function Header() {
  const [searchTerm, setSearchTerm] =useState('')
  const { currentUser } = useSelector((state) => state.user);
   const navigate = useNavigate()
  const handleSubmit = async(e)=>{
     e.preventDefault();
     const urlParams = new URLSearchParams(window.location.search)
     urlParams.set('searchTerm', searchTerm)
     const searchQuery = urlParams.toString()
     navigate(`/search?${searchQuery}`)
  }
   useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
     const searchTermFromUrl = urlParams.get('searchTerm')
       if(searchTermFromUrl){
         setSearchTerm(searchTermFromUrl)
       }
   }, [location.search])
  return (
    <header className="bg-slate-800  shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-blue-700">NK</span>
            <span className="text-white">Estate</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
             value={searchTerm}
             onChange={(e)=>setSearchTerm(e.target.value)}
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

          <Link to={"/profile"}>
            {currentUser ? (
              <img className=" h-7 w-7 rounded-full object-cover" src={currentUser.avatar} alt="profile" />
            ) : (
              <span className=" sm:inline text-white hover:underline">
                Sign In
              </span>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

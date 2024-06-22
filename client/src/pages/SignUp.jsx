import React, { useState } from "react";
import { Link } from "react-router-dom";
import Oauth from "../components/Oauth";
 import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
            setLoading(false);
        setError(data.message);
        
        return;
      }
      setLoading(false);
      setError(null)
       navigate('/sign-in')
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          type="text"
          id="username"
          placeholder="username"
          className="p-3 rounded-lg focus:outline-none border"
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          className="p-3 rounded-lg focus:outline-none border"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="p-3 rounded-lg focus:outline-none border"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-800 p-3 rounded-lg
         text-white uppercase hover:opacity-90 disabled:opacity-70"
        >
          {loading ? "loading..." : "sign up"}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-4 mt-3">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5 ">{error}</p> }
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Oauth from "../components/Oauth";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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
      const res = await fetch("/api/auth/signin", {
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
      setError(null);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        
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
          {loading ? "loading..." : "sign in"}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-4 mt-3">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign Up </span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5 ">{error}</p>}
    </div>
  );
}

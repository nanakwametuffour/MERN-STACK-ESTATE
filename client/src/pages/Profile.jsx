import { useSelector } from "react-redux";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className=" max-w-lg mx-auto p-4">
      <h1 className="text-center font-semibold text-3xl my-7">profile</h1>
      <form className="flex flex-col gap-4">
        <img
          className="h-24 w-24 rounded-full object-cover cursor-pointer self-center mt-2"
          src={currentUser.avatar}
          alt="image"
        />
        <input
          type="text"
          id="username"
          className="p-3 rounded-lg focus:outline-none border"
          placeholder="username"
        />
        <input
          type="text"
          id="email"
          className="p-3 rounded-lg focus:outline-none border"
          placeholder="email"
        />
        <input
          type="password"
          id="password"
          className="p-3 rounded-lg focus:outline-none border"
          placeholder="password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg 
        uppercase hover:opacity-90 disabled:opacity-80">
          update
        </button>
      </form>
       <div className="flex justify-between mt-4">
         <span className="text-red-700 cursor-pointer">Delete account</span>
         <span className="text-red-700 cursor-pointer">Sign out</span>
       </div>
    </div>
  );
}

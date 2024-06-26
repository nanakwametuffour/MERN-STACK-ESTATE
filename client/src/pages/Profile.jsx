import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
export default function Profile() {
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updateSucces, setUpdateSuccess] = useState(false)
  const [formData, setFormData] = useState({});
     const dispatch = useDispatch()
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
   const handleSubmit = async (e)=>{
     e.preventDefault()
     try {
        dispatch(updateUserStart())
       const res = await fetch(`/api/user/update/${currentUser._id}`,{
         method: "POST",
         headers:{
          "Content-Type": "application/json"
         },
         body: JSON.stringify(formData)
       });
       const data = await res.json()
        if(data.success === false){
          dispatch(updateUserFailure(data.message))
           return;
        }
        dispatch(updateUserSuccess(data))
        setUpdateSuccess(true)
     } catch (error) {
       dispatch(updateUserFailure(error.message))
     }
   }

     const handleDeleteUser = async()=>{
       try {
         dispatch(deleteUserStart())
         const res = await fetch(`/api/user/delete/${currentUser._id}`,{
           method: "DELETE",
         });
         const data = await res.json()
          if(data.success ===false){
            dispatch(deleteUserFailure(data.message))
             return;
          }
           dispatch(deleteUserSuccess(data))
       } catch (error) {
         dispatch(deleteUserFailure(error.message))
       }
     }
  return (
    <div className=" max-w-lg mx-auto p-4">
      <h1 className="text-center font-semibold text-3xl my-7">profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="h-24 w-24 rounded-full object-cover cursor-pointer self-center mt-2"
          src={formData.avatar || currentUser.avatar}
          alt="profile"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          id="username"
          defaultValue={currentUser.username}
          className="p-3 rounded-lg focus:outline-none border"
          placeholder="username"
          onChange={handleChange}
        />
        <input
          type="text"
          id="email"
          defaultValue={currentUser.email}
          className="p-3 rounded-lg focus:outline-none border"
          placeholder="email"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          className="p-3 rounded-lg focus:outline-none border"
          placeholder="password"
          onChange={handleChange}
        />
        <button disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg 
        uppercase hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "loading..." : " update"}
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
       {error &&  <p className="text-red-700">{error}</p> }
        <p className="text-green-700 mt-5">{updateSucces ? "Succesfully update.." : ""}</p>
    </div>
  );
}

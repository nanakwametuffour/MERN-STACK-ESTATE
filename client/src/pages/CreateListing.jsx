import { useState } from "react";
import { app } from "../firebase";
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";


export default function CreateListing() {
  const {currentUser}= useSelector((state)=> state.user)
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [upLoading, setUpLoading] = useState(false);
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  console.log(formData);
   const navigate = useNavigate()
  //   const handleImageSubmit = async (e) => {
  //     if (files.legnth > 0 && files.length < 7) {
  //       const promises = [];
  //       for (let i = 0; i < files.length; i++) {
  //         promises.push(storeImage(files[i]));
  //       }
  //       Promise.all(promises).then((urls)=>{
  //         setFormData({...formData, imageUrls: formData.imageUrls.concat(urls)})
  //       })
  //     }
  //   };

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        setUpLoading(true);
        setImageUploadError(false);
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUpLoading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload faild(2 mb max per image)");
          setUpLoading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 per listing");
      setUpLoading(false);
    }
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleImageRemove = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked
      })
    }
    if (e.target.type === 'number' || e.target.type==='text' || e.target.type==='textarea'){
      setFormData({...formData,
        [e.target.id]: e.target.value
      })
    }
  };

   const handleSubmit = async(e)=>{
    e.preventDefault()
     try {
       if(formData.imageUrls.length <1) return setError("You must upload at least one image")
        if (+formData.regularPrice< + formData.discountPrice) return setError("Discount price must be lower than regular price")
        setLoading(true)
        setError(false)
        const res = await fetch("/api/listing/create",{
            method: 'POST',
             headers:{
              "Content-Type": "application/json"
             }, 
             body: JSON.stringify({
              ...formData,
                userRef: currentUser._id
             })
        });
        const data = await res.json()
        setLoading(false);
         if(data.success === false){
          setError(data.message)
         }
        navigate(`/listing/${data._id}`)
     } catch (error) {
       setError(error.message)
       setLoading(false)
     }
   }

  return (
    <main className="p-5 max-w-4xl mx-auto">
      <h1 className="text-3xl text-center my-7 font-semibold uppercase">
        Create a listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-5">
        <div className="flex gap-4 flex-col flex-1">
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="p-3 rounded-lg border focus:outline-none"
            maxLength={62}
            min={10}
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            id="description"
            placeholder="Discription"
            className="p-3 rounded-lg border focus:outline-none"
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            id="address"
            placeholder="Address"
            className="p-3 rounded-lg border focus:outline-none"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="">
            <div className=" flex flex-wrap gap-6">
              <div className="flex gap-2 items-center">
                <input
                  className="w-5 h-4"
                  type="checkbox"
                  id="sale"
                  onChange={handleChange}
                  checked={formData.type === "sale"}
                />
                <label>Sell</label>
              </div>

              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  className="w-5 h-4"
                  id="rent"
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                />
                <label>Rent</label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  className="w-5 h-4"
                  id="parking"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <label>Parking spot</label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  className="w-5 h-4"
                  id="furnished"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <label>Furnished</label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  className="w-5 h-4"
                  id="offer"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <label>Offer</label>
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
                  onChange={handleChange}
                  value={formData.bedrooms}
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
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
                <label>Baths</label>
              </div>
              {formData.offer && (
                <div className="flex items-center gap-2">
                  <input
                    className="p-3 border border-gray-300 rounded-lg"
                    type="number"
                    id="discountPrice"
                    min="0"
                    max={"10000"}
                    required
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  <div className="flex flex-col items-center">
                    <label>Discount price</label>
                    <span className="text-xs"> ($/month)</span>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <input
                  className="p-3 border border-gray-300 rounded-lg"
                  type="number"
                  id="regularPrice"
                  min="50"
                  max={"10000"}
                  required
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div className=" flex flex-col items-center">
                  <label>Regular price</label>
                  <span className="text-xs">($/month)</span>
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
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-400 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
          
              type="button"
              disabled={upLoading}
              onClick={handleImageSubmit}
              className="border border-green-700 text-green-700 p-3 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {upLoading ? "loading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 mt-5">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className=" object-contain w-20 h-20  rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="text-red-700 uppercase  rounded-lg hover:opacity-70"
                >
                  Delete
                </button>
              </div>
            ))}
          <button disabled={loading || upLoading} className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-80">
            {loading ? "loading..." : " Create Listing"}
          </button>
          {error && <p className="text-red-700 text-xs">{error}</p>}
        </div>
      </form>
    </main>
  );
}

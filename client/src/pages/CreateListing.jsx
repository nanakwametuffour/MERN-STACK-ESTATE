import { useState } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
   const [upLoading, setUpLoading]= useState(false)
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  console.log(formData);

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
         setUpLoading(true)
         setImageUploadError(false)
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
    } else{
      setImageUploadError('You can only upload 6 per listing')
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

   const handleImageRemove =(index)=>{
    setFormData({
       ...formData,
       imageUrls: formData.imageUrls.filter((_, i)=>
        i !== index
      )
    })
   }

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
              <div className="flex gap-2 items-center">
                <input className="w-5 h-4" type="checkbox" />
                <label id="sale">Sell</label>
              </div>

              <div className="flex gap-2 items-center">
                <input type="checkbox" className="w-5 h-4" />
                <label id="rent">Rent</label>
              </div>
              <div className="flex gap-2 items-center">
                <input type="checkbox" className="w-5 h-4" />
                <label id="parking">Parking spot</label>
              </div>
              <div className="flex gap-2 items-center">
                <input type="checkbox" className="w-5 h-4" />
                <label id="furnished">Furnished</label>
              </div>
              <div className="flex gap-2 items-center">
                <input className=" w-5 h-4" type="checkbox" />
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
          <button className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}

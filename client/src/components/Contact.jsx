import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Contact({ listing }) {
  const [landLord, setLandLord] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandLord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const onChange = async (e) => {
    setMessage(e.target.value);
  };
  return (
    <>
      {landLord && (
        <div className="flex flex-col gap-3">
          <p>
            Contact:
            <span className="font-semibold"> {landLord.username}</span> for
            <span className="font-semibold"> {listing.name.toLowerCase()}</span>
          </p>
          <textarea
            className="w-full p-3 border  rounded-lg"
            name="message"
            id="message"
            rows={"2"}
            value={message}
            placeholder="Enter your message here..."
            onChange={onChange}
          ></textarea>
          <Link to={`mailto:${landLord.email}?subject=Regarding ${listing.name}&body=${message}`}>
            <button className="bg-slate-700 
            uppercase w-full p-3 rounded-lg
             text-white hover:opacity-90
              disabled:opacity-80">
              Send Message
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

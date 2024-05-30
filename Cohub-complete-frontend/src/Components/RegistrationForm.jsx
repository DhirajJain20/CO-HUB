import { useState } from "react";
import userApiService from "../../apiServices/user.apiService";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    mobile_no: ""
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData={
        'name':userInfo.name,
        'mobile_no':userInfo.mobile_no,
        'address':{
             type: 'Point',
             coordinates: [parseFloat(location.longitude), parseFloat(location.latitude)]
          }
      }
      console.log(formData);

      const success = await userApiService.userRegistration(formData);
      if (success) {
        login();
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Error occurred during registration.");
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  };

  const fetchLocationHandler = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-2 blur-2xl opacity-10 group-hover:opacity-40 transition duration-1000 bg-slate-900 rounded-xl"></div>
      <div className="bg-slate-900 text-slate-50 px-10 py-20 relative rounded-3xl border-2 border-gray-800">
        {error && <p className="text-red">{error}</p>}
        <h1 className="text-2xl font-semibold">Create your account</h1>
        <form onSubmit={submitHandler}>
          <div className="mt-8">
            <div>
              <label className="text-lg font-medium">Name</label>
              <input
                onChange={inputHandler}
                className="w-full border-2 border-gray-500 rounded-xl p-3 mt-1 bg-transparent"
                placeholder="Enter your name"
                type="text"
                name="name"
                required
              />
            </div>
            <div className="mt-3">
              <label className="text-lg font-medium">Mobile No.</label>
              <input
                onChange={inputHandler}
                className="w-full border-2 border-gray-500 rounded-xl p-3 mt-1 bg-transparent"
                placeholder="Enter your mobile no."
                type="tel"
                name="mobile_no"
                required
              />
            </div>
            <div className="mt-3">
              <label className="text-lg font-medium">Address</label>
              <button
                onClick={fetchLocationHandler}
                className="mt-2 px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:bg-gray-700"
              >
                Fetch Location
              </button>
              {location && (
                <div className="mt-2">
                  <p>Latitude: {location.latitude}</p>
                  <p>Longitude: {location.longitude}</p>
                </div>
              )}
            </div>
            <div className="mt-8">
              <input
                type="submit"
                value="Submit"
                className="px-6 py-3 bg-[#317a76] text-white rounded-lg cursor-pointer transition duration-300 hover:bg-green-600 focus:outline-none focus:bg-green-600"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;

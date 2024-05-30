// import React from "react";
import one from "../../assets/one.png";
import two from "../../assets/two.png";
import "./form.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { useState, useEffect } from "react";
import getBearerToken from "../../Helper/getBearerToken";
import userApiService from "../../../apiServices/user.apiService";
import axios from "axios";

const SRForm = () => {

  const [productInfo, setProductInfo] = useState({
    name: "",
    type: "",
    description: "",
    selling_price: "",
    rentPrice_perDay: "",
    longitude: "",
    latitude: "",
    image: null,
    video: null,
  });

  const { loggedIn } = useAuth();
  const navigate = useNavigate();
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_APP_GOOGLE_MAPS_API}&libraries=places`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 }, // Initial center
        zoom: 8, // Initial zoom level
      });

      setMap(mapInstance);

      const autocompleteInput = document.getElementById('autocomplete');

      // Initialize Places Autocomplete service
      const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInput);

      // Bind the Places Autocomplete to the map
      autocomplete.bindTo('bounds', mapInstance);

      // Listen for place changed event
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
          console.error('Place not found or has no geometry');
          return;
        }
        const location = place.geometry.location;
        placeMarker(location);
        mapInstance.setCenter(location);
        mapInstance.setZoom(15); // Zoom in to the selected location
      });

      // Listen for click event on map to place marker
      mapInstance.addListener('click', (event) => {
        placeMarker(event.latLng);
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const placeMarker = (location) => {
    if (marker) {
      marker.setPosition(location);
    } else {
      const newMarker = new window.google.maps.Marker({
        position: location,
        map: map,
        draggable: true,
      });
      setMarker(newMarker);
    }
    setSelectedLocation(location.toJSON());
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  }, [loggedIn, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductInfo({
      ...productInfo,
      [name]: value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProductInfo({
      ...productInfo,
      image: file
    });
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    setProductInfo({ ...productInfo, video: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', productInfo.name);
      formData.append("type", productInfo.type);
      formData.append("description", productInfo.description);
      formData.append("selling_price", productInfo.selling_price);
      formData.append("rentPrice_perDay", productInfo.rentPrice_perDay);
      formData.append("pickup_location", JSON.stringify({
        type: 'Point',
        coordinates: [parseFloat(selectedLocation.lng), parseFloat(selectedLocation.lat)]
      }));
      formData.append("image", productInfo.image);
      formData.append("video", productInfo.video);

      console.log(productInfo.selling_price);
      const response = await axios.post(
        `${userApiService.api}/addProduct`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getBearerToken()}`,
          },
        }
      );
      console.log(response.data);
      // Reset form fields after successful submission
      setProductInfo({
        name: "",
        type: "",
        description: "",
        selling_price: "",
        rentPrice_perDay: "",
        longitude: "",
        latitude: "",
      });
      navigate('/dashboard');
    } catch (error) {
      console.error("Error in srform:", error);
    }
  };

  return (
    <div className="main_container ">
      <div className="form_container">
        <p className="form_heading">
          Fill the form below to sell or rent your product
        </p>
        <form className="form_container_main" onSubmit={handleSubmit}>
          <div className="product_details">
            <div className="product_details_heading">
              <div className="product_details_heading-logo">
                <img src={one} alt="" />
              </div>
              <div className="product_details_heading-text">
                <p>Product Details</p>
              </div>
            </div>
            <div className="product_details_input">
              <div className="type_productname">
                <div className="product_name">
                  <input type="text" onChange={handleInputChange} name="name" placeholder="Product Name" required />
                </div>
                <div className="product_type">
                  <input type="text" onChange={handleInputChange} name="type" placeholder="Product Type" required />
                </div>
              </div>
              <div className="product_description">
                <textarea
                  className="product_description_text"
                  placeholder="Product Description"
                  cols={25}
                  name="description"
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="price_image">
                <div className="price">
                  <input type="text" onChange={handleInputChange} name="selling_price" placeholder="Enter Selling Price" />
                </div>
              </div>
              <div className="price_image">
                <div className="price">
                  <input type="text" onChange={handleInputChange} name="rentPrice_perDay" placeholder="Enter Renting/Day" />
                </div>
              </div>
              {/* <div className="pickup_location">
                <input type="text" name="latitude" onChange={handleInputChange} placeholder="Latitude" required />
              </div>
              <div className="pickup_location">
                <input type="text" name="longitude" onChange={handleInputChange} placeholder="Longitude" required />
              </div> */}
              <div>Choose pickup location</div>
              <input
                id="autocomplete"
                placeholder="Search for a location"
                type="text"
                style={{ width: '100%', marginBottom: '10px' }}
              />
              <div id="map" style={{ height: '400px', width: '100%' }}>


              </div>
              <div className="product_image">
                <label>Upload image </label>
                <input type="file" name="image" onChange={handleImageUpload} accept="image/png, image/jpeg" required />
              </div>
              <div className="product_video">
                <label>Upload video </label>
                <input type="file" name="video" onChange={handleVideoUpload} accept="video" />
              </div>
            </div>
          </div>
          {/* <div className="radio">
            <div className="radio_sell">
              <input type="radio" id="radio_sell_text" name="radio_btn" />
              <label htmlFor="radio_sell_text">Sell</label>
            </div>
            <div className="radio_rent">
              <input type="radio" id="radio_rent_text" name="radio_btn" />
              <label htmlFor="radio_rent_text">Rent</label>
            </div>
          </div> */}
          <div className="submit">
            <button className="submit_btn" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SRForm;

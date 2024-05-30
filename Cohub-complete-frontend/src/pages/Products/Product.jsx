import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import "./product.css";
import { Navbar } from "../../Components";
import { Footer } from "../../Containers";
import userApiService from "../../../apiServices/user.apiService";
import axios from "axios";
import getBearerToken from "../../Helper/getBearerToken";
import useRazorpay from "react-razorpay";
import { useInfo } from "../../Contexts/UserInfoContext";

const Product = () => {
  const [Razorpay]=useRazorpay();
  const [details, setDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [booking, setBooking] = useState(null);
  const {userinfo}=useInfo();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const data = await userApiService.fetchAllProducts();
      console.log(data);
      if(data.length)
        setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }
  const detailPage = (product) => {
    userApiService.getBookingPaymentSummary().then((data) => setBooking(data));
    setDetails(product);
  };

  const handleBookingPayment = async (booking_data) => {
    try {
      const bearerToken=getBearerToken();
      var options = {
        "key": String(import.meta.env.VITE_APP_RZP_KEY),
        "amount": booking_data.amount,
        "currency": 'INR',
        "name": "CoHUB",
        "description": "Test Transaction",
        "image": "",
        "order_id": booking_data.order_id,
        "handler":function (response){
          alert('Payment successful. Payment ID: ' + response.razorpay_payment_id);
          axios.post(`${userApiService.api}/bookProduct/${details._id}`,{},{
            headers:{
              "Authorization":`Bearer ${bearerToken}`
            }
          })
        },
        "prefill": {
          "name": userinfo.name,
          "email": userinfo.email,
          "contact": userinfo.mobile_no
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
          "color": "#3399cc"
        }
      };
      const razorpay = new Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="gradient_bg">
        <Navbar />
        {details && (
          <div className="overlay">
            <div className="detail_container">
              <button className="close" onClick={() => setDetails(null)}>
                <AiFillCloseCircle size={30} />
              </button>
              <div className="detail_content">
                <div className="detail_info">
                  <div className="img-box">
                    <img src={`${userApiService.api}/${details.image}`} className="h-48 w-full object-cover object-top" alt={details.name} />
                  </div>
                  <div className="product_detail">
                    <h2>{details.name}</h2>
                    {details.selling_price && <h3>${details.selling_price}</h3>}
                    {details.rentPrice_perDay && <h3>${details.rentPrice_perDay}/day</h3>}
                    <p>{details.description}</p>
                    <button onClick={() => handleBookingPayment(booking)} id="bookNow">Book Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="product__heading">
          <h1>Products</h1>
          <div className="product__line" />
        </div>
        <div className="product_container">
          {products.length===0 && <p className="text-white">No products available.</p>}
          {products && products.map((product, index) => (
            <div className="box" key={index}>
              <div className="content">
                <div className="img-box">
                  <img src={`${userApiService.api}/${product.image}`} style={{ "height": "30vh", "width": "300px" }} alt={product.name} />
                </div>
                <div className="details">
                  <div className="">
                    <h3>{product.name}</h3>
                    {product.selling_price && <p>Selling Price: Rs. {product.selling_price}</p>}
                    {product.rentPrice_perDay && <p>Renting Price: Rs. {product.rentPrice_perDay}/day</p>}
                  </div>
                  <button onClick={() => detailPage(product)}>View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;

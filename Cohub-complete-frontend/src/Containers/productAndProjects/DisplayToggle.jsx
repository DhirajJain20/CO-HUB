import { useEffect, useState } from "react";
import userApiService from "../../../apiServices/user.apiService";
import getBearerToken from "../../Helper/getBearerToken";
import useRazorpay from "react-razorpay";
import { useInfo } from "../../Contexts/UserInfoContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const DisplayToggle = () => {
  const [Razorpay] = useRazorpay();
  const [projects, setProjects] = useState([]);
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showRentPopup, setShowRentPopup] = useState(false);
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [productId, setProductId] = useState(null);
  const { userinfo } = useInfo();
  const navigate = useNavigate();

  useEffect(() => {
    userApiService.fetchProjects().then((data) => setProjects(data));
    userApiService.fetchBookedProducts().then((data) => setProducts(data));
  }, []);

  const [showProducts, setShowProducts] = useState(true);
  const [activeButton, setActiveButton] = useState("products");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setShowProducts(buttonName === "products");
  };

  const buyHandler = async (id) => {
    const data = await userApiService.getOrderPaymentSummary(id, { type: "buy" });
    console.log(data);
    setPaymentSummary(data);
    setShowPopup(true);
    setProductId(id);
  };


  const handleOrderPayment = async (id) => {
    try {

      const bearerToken = getBearerToken();
      var options = {
        "key": String(import.meta.env.VITE_APP_RZP_KEY),
        "amount": paymentSummary.amount,
        "currency": 'INR',
        "name": "CoHUB",
        "description": "Test Transaction",
        "image": "",
        "order_id": paymentSummary.order_id,
        "handler": function (response) {
          alert('Payment successful. Payment ID: ' + response.razorpay_payment_id);
          axios.post(`${userApiService.api}/paymentSuccess/${id}`,
            {
              orderId: paymentSummary._id,
              paymentId: response.razorpay_payment_id
            },
            {
              headers: {
                "Authorization": `Bearer ${bearerToken}`,
                'Content-Type': 'application/json',
              }
            }).then(() => {
              setProducts([]);
              navigate('/dashboard');
            });
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
      await new Promise((resolve, reject) => {
        razorpay.open();
        razorpay.on('payment.failed', function (response) {
          console.error('Payment failed:', response.error);
          reject(response.error);
        });
        razorpay.on('payment.captured', function (response) {
          console.log('Payment success:', response);
          resolve(response);
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  const dateHandler = async (date) => {
    const data = await userApiService.getOrderPaymentSummary(productId, { type: "rent", returnDate: date });
    console.log(data);
    setPaymentSummary(data);
  }
  const rentHandler = async (id) => {
    // const data=await userApiService.getOrderPaymentSummary(id,{type:"rent"});
    // console.log(data);
    // setPaymentSummary(data);
    setShowRentPopup(true);
    setProductId(id);
  };

  const handleProceedToPayment = async () => {
    try {
      await handleOrderPayment(productId);
      setPaymentSummary(null);
      setProductId(null);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };


  const handleRentProceedToPayment = async () => {
    try {
      await handleOrderPayment(productId);
      console.log("hello")
      setPaymentSummary(null);
      setProductId(null);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="text-white font-outfit p-8 mt-10 container">
      <div className="flex justify-start items-center mb-4">
        <div>
          <button
            className={`px-4 py-2 font-roboto-mono text-xl rounded-md transition-all ${activeButton === "products"
              ? " text-[#66fcf1]"
              : "text-white"
              }`}
            onClick={() => handleButtonClick("products")}
          >
            My Bookings
          </button>
          <span className="absolute left-0 -bottom-1 w-full h-2 bg-blue-400 -z-10 group-hover:h-full group-hover:transition-all"></span>
        </div>

        <div className="w-1 h-6 bg-lilac"></div>
        <button
          className={`px-4 py-2 font-roboto-mono text-xl rounded-md transition-all ${activeButton === "projects"
            ? " text-[#66fcf1]"
            : "text-white"
            }`}
          onClick={() => handleButtonClick("projects")}
        >
          My Projects
        </button>
      </div>

      {showProducts ? (
        <div className="container">
          <ul className="mt-4">
            {products.length === 0 && <p className="mx-5"> You have no bookings.</p>}
            {products.map((product) => (
              <li
                key={product.id}
                className="flex mb-4 transition duration-300 ease-in-out hover:scale-105 bg-[#D9D9D91A] p-4 rounded-md shadow-md"
              >
                <div>
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <p>Booking Date: {new Date(product.booking_date).toLocaleDateString()}</p>
                </div>
                <div className="ml-60">
                  {product.selling_price && (
                    <button className="mx-auto mr-10 my-3 border border-white px-6 rounded-xl hover:bg-black" onClick={() => buyHandler(product._id)}>
                      Buy
                    </button>
                  )}
                  {product.rentPrice_perDay && (
                    <button className="mx-auto gap-5 my-3 border border-white px-5 rounded-xl hover:bg-black" onClick={() => rentHandler(product._id)}>Rent</button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="container">
          <ul className="mt-4">
            {projects.map((project, index) => (
              <li
                key={index}
                className="mb-4 flex transition duration-300 ease-in-out hover:scale-105 bg-[#D9D9D91A] p-4 rounded-md shadow-md"
              >
                <div>
                  <h3 className="text-lg font-medium">{project.name}</h3>
                  <p>Starting Date: {new Date(project.startedAt).toLocaleDateString()}</p>
                  <p>Type: {project.type}</p>
                </div>
                <div className="ml-auto">
                  <Link to={`/project-details/${project._id}`}>
                    <button className="mx-auto mr-10 my-3 border border-white px-6 rounded-xl hover:bg-black">
                      Show Description
                    </button>
                  </Link>
                </div>

              </li>
            ))}
          </ul>
        </div>
      )}

      {showPopup && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">

                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Proceed to Payment</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Do you want to proceed to payment?</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={handleProceedToPayment} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Proceed to Payment
                </button>
                <button onClick={() => setShowPopup(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showRentPopup && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">

                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Proceed to Payment</h3>
                    <p className="text-sm text-gray-500 pb-2">Choose a return date</p>
                    <input type="date" onChange={(e) => dateHandler(e.target.value)} name="returnDate" id="return_date" placeholder="Enter return data" className="bg-white text-black px-5" required />
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Do you want to proceed to payment?</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={handleRentProceedToPayment} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Proceed to Payment
                </button>
                <button onClick={() => setShowRentPopup(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayToggle;

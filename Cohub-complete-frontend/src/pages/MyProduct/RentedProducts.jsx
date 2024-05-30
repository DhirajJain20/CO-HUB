import React from 'react'
import { useState,useEffect } from 'react';
import userApiService from '../../../apiServices/user.apiService';
import axios from 'axios';
import getBearerToken from '../../Helper/getBearerToken';

const RentedProducts = () => {

    const [products,setProducts]=useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await userApiService.fetchMyRentedProducts();
            if(data)
              setProducts(data);
            // console.log(products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleReturnStatus=async (id)=>{
        try {
            const bearerToken=getBearerToken();
            const response=await axios.get(`${userApiService.api}/updateReturnStatus/${id}`,{
                headers:{
                    'Authorization':`Bearer ${bearerToken}`
                }
            });
            setProducts([]);
        } catch (error) {
            console.error("Error in updating return status",error);
        }
    }

    return (
        <div className="text-white font-outfit mx-24 my-20 container">
          <div className="flex justify-start items-center mb-4">
            <button
              className="px-4 py-2 font-roboto-mono text-xl rounded-md transition-all text-[#66fcf1] "
              onClick={() => handleButtonClick("products")}
            >
              My Rented Products
            </button>
          </div>
            <div className=""> {/* Added container */}
              <ul className="mt-4">
                {!products.length && <div>No product is given in rent.</div>}
                {products.map((product, index) => (
                  <li
                    key={index}
                    className="mb-4 transition duration-300 ease-in-out hover:scale-105 bg-[#D9D9D91A] p-4 rounded-md shadow-md"
                  >
                    <h3 className="text-lg font-medium"><span>Product : </span>{product.name}</h3>
                    <div className="flex flex-row">
                    <p className='mr-10'>Order Date: {new Date(product.orders.orderDate).toLocaleDateString()}</p>
                    <p className='mr-10'>Return Date: {new Date(product.orders.returnDate).toLocaleDateString()}</p>
                    <p className='mr-10'>Buyer Name: {product.buyer_name}</p>
                    <p className='mr-10'>Buyer Contact: {product.buyer_number}</p>
                    <p className='mr-10'>Rent duration: {product.orders.rentDurationDays} days</p>
                    <button onClick={()=>handleReturnStatus(product.orders._id)} className=' text-white rounded px-4 py-2 hover:bg-red-400'> Received </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
        </div>
      );
}

export default RentedProducts
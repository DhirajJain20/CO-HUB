import React, { useEffect, useState } from "react";
import userApiService from "../../../apiServices/user.apiService";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await userApiService.fetchMyProducts();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Function to truncate the description
    const truncateDescription = (description) => {
        const words = description.split(' ');
        if (words.length > 50) {
            return words.slice(0, 50).join(' ') + ' ...';
        }
        return description;
    };

    return (
        <div className="product__container bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen py-5 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="product__heading mb-5">
                    <h1 className="text-white">Our Products</h1>
                    <div className="product__line bg-blue-500" />
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="bg-gray-800  shadow-lg overflow-hidden"
                        >
                            <div className="flex flex-col h-full">
                                <div className="flex-shrink-0">
                                    <img
                                        className="h-48 w-full object-cover object-top"
                                        src={`${userApiService.api}/${product.image}`}
                                        alt={product.name}
                                    />
                                </div>
                                <div className="flex-1 bg-black p-6 flex flex-col justify-between">
                                    <div className="flex-1">
                                        <div className="info">
                                            <h3 className="text-white">{product.name}</h3>
                                            { product.rentPrice_perDay && <p className="text-gray-400 "><span className="pr-3.5">Rent price</span> : Rs.{product.rentPrice_perDay}/day</p>
                                            }
                                            { product.selling_price && <p className="text-gray-400">Selling price : Rs.{product.selling_price}</p>
                                            }
                                            
                                        </div>
                                        <p className="text-gray-300">{truncateDescription(product.description)}</p>
                                    </div>
                                    <div className="flex flex-row">
                                        {
                                            product.booked && <button className="text-white bg-red-500 w-14 rounded-md mt-2 mx-5">Booked</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;

import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Product = ({
    products,
    removeProduct,
    showProductModal,
    showOrderModal,
    userRole
}) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        if (isExistInCart(product)) {
            toast.warn(`${product.name} already exists in your cart!`);
        } else {
            const currentCart = cart;
            currentCart.push(product);
            console.log(`${product.name} has been added to cart.\n`, currentCart);
            setCart(currentCart);
        };
    };

    const removeFromCart = (product) => {
        if (isExistInCart(product)) {
            const currentCart = cart;
            const removedCart = currentCart.filter((item) => item.name !== product.name);
            console.log(`${product.name} has been removed from cart.\n`, removedCart);
            setCart(removedCart);
        } else {
            toast.warn(`${product.name} doesn't exist in your cart!`);
        };
    };

    const isExistInCart = (product) => {
        return cart.some(data => data.name === product.name);
    };

    return (
        <div className='border rounded-2xl'>
            <div className="p-6 sm:p-12 dark:bg-gray-900 dark:text-gray-100 relative">
                <div className='flex justify-between items-center mb-8'>
                    <h1 className='text-2xl font-bold'>Products</h1>
                    {
                        userRole === 1 &&
                        <div>
                            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={showProductModal}>Add</button>
                            <button className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900' onClick={showOrderModal}>Edit Order</button>
                        </div>
                    }
                </div>
                <div className='grid justify-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
                    {products.map((product, index) => (
                        <div key={index} className="w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-5">
                                <div className='flex justify-between items-center'>
                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                                </div>
                                <div className="flex items-center mt-2.5 mb-5">
                                    <p className="dark:text-gray-400">{product.description}</p>
                                </div>
                                {
                                    userRole === 1 &&
                                    <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 mb-2' onClick={() => removeProduct(index)}>Remove</button>
                                }
                                {
                                    userRole === 2 &&
                                    <div className="flex flex-col items-center">
                                        <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2" onClick={() => addToCart(product)}>Add to cart</button>
                                        <button className="w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => removeFromCart(product)}>Remove from cart</button>
                                    </div>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Product;
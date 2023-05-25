import React from 'react'
import { FaArrowCircleUp, FaArrowCircleDown } from 'react-icons/fa'

const OrderModal = ({
    editProducts,
    upOrder,
    downOrder,
    saveOrder,
    onClose
}) => {
    return (
        <>
            <div className='fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-10' onClick={onClose}></div>
            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20'>
                <div className="w-96 max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-8">
                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Edit Order</h5>
                    </div>
                    <div className="flow-root">
                        <ul role="list" className="h-72 overflow-auto">
                            {
                                editProducts.map((product, index) => (
                                    <li key={index} className="py-1 border rounded-lg mb-1 p-2">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    {product.name}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    ${product.price}
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                <FaArrowCircleUp className='cursor-pointer mr-2' onClick={() => upOrder(index)} />
                                                <FaArrowCircleDown className='cursor-pointer' onClick={() => downOrder(index)} />
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4" onClick={saveOrder}>Save</button>
                </div>
            </div>
        </>
    );
};

export default OrderModal;
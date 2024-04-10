import React from 'react'
import axios from "axios"
import { useState, useEffect } from "react"

function PlaceOrder() {

    return (
        <div><TableOne /></div>
    )
}

async function fetchmenuItems() {
    const currentUserString = localStorage.getItem("currentUser");
    const currentUser = JSON.parse(currentUserString);
    const response = await axios.get(
        'http://localhost:3000/api/menu/',
        {
            headers: {
                Authorization: currentUser.accessToken,

            }
        }
    );
    return response.data;
}

async function getIngridients(MenuItemID) {
    const currentUserString = localStorage.getItem("currentUser");
    const currentUser = JSON.parse(currentUserString);
    const response = await axios.get(
        `localhost:3000/api/menu/ingridients/:${MenuItemID}`,
        {
            headers: {
                Authorization: currentUser.accessToken,

            }
        }
    );
    return response.data;
}




export function TableOne() {


    const [quantity, setQuantity] = useState('');

    const handleIncrement = (MenuItemID) => {
        useEffect(() => {
            async function fetchIngridients() {
                const data = await getIngridients(MenuItemID); // Pass MenuItemID here
                setMenuItemList(data);
            }
            fetchIngridients();
        }, [MenuItemID]); 
        
        
        
        // Add MenuItemID as a dependency
    };
    const handleDecrement = (MenuItemID) => {
        if (onDecrement) {
            onDecrement(quantity);
        }
    };

    const [menuItemList, setMenuItemList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchmenuItems();
            setMenuItemList(data);
        }
        fetchData();
    }, []);
    return (
        <>
            <section className="mx-auto w-full max-w-8xl px-4 py-4">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                        <h2 className="text-lg font-semibold">Employees</h2>
                        <p className="mt-1 text-sm text-gray-700">
                            This is a list of all employees. You can add new employees, edit or delete existing ones.
                        </p>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Add new employee
                        </button>
                    </div>
                </div>
                <div className="mt-6 flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                            >
                                                <span>FoodItem</span>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                                            >
                                                Description
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                            >
                                                Category
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                            >
                                                Price
                                            </th>
                                            <th scope="col" className="relative px-4 py-3.5">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {menuItemList.map((item) => (
                                            <tr key={item.id}>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 flex-shrink-0">
                                                            <img
                                                                className="h-10 w-10 rounded-full object-cover"
                                                                src={item.image}
                                                                alt="./AlooGobi.jpeg"
                                                            />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{item.MenuItemName}</div>

                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-12 py-4 max-w-[10-rem]">
                                                    <div className="text-sm text-gray-900 break-all">{item.Description}</div>

                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <span className={`inline-flex rounded-full ${item.Category === 'Non Veg' ? 'bg-red-100' : 'bg-green-100'} px-2 text-xs font-semibold leading-5 ${item.status === 'Active' ? 'text-green-800' : 'text-red-800'}`}>
                                                        {item.Category}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                                    {item.Price}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                                                    <form className="max-w-xs mx-auto">
                                                        <label htmlFor="quantity-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose quantity:</label>
                                                        <div className="relative flex items-center max-w-[8rem]">
                                                            <button type="button" onClick={handleDecrement} id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                                </svg>
                                                            </button>
                                                            <input
                                                                type="text"
                                                                id="quantity-input"
                                                                data-input-counter
                                                                aria-describedby="helper-text-explanation"
                                                                className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                placeholder="999"
                                                                value={quantity}
                                                                onChange={(e) => setQuantity(e.target.value)}
                                                                required
                                                            />
                                                            <button type="button" onClick={handleIncrement} id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                                </svg>
                                                            </button>
                                                        </div>

                                                    </form>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


export default PlaceOrder
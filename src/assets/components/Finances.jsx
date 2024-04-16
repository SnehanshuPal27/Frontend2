import React from 'react'
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";


function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    // global.todayMonth=month;
    const day = String(currentDate.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

function getDateFromISOString(isoString) {
    // Check if the isoString is in yyyy-mm-dd format
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    
    if (regex.test(isoString)) {
        return isoString; // Return the date as is
    }
    
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

function getMonthFromISOString(isoString) {
    const date = new Date(isoString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    
    return month;
}









async function fetchOrderItems() {
    const currentUserString = localStorage.getItem("currentUser");
    const currentUser = JSON.parse(currentUserString);
    const response = await axios.get(
        'http://localhost:3000/api/orders',
        {
            headers: {
                Authorization: currentUser.accessToken,

            }
        }
    );
    return response.data;
}


export function Finances() {
    const [dailyRevenue, setDailyRevenue] = useState(0.0);
const [monthlyRevenue, setMonthlyRevenue] = useState(0.0);
    const calcRevenue = () => {
        let monCalc = 0;
        let dailyCalc = 0;
        console.log("calculating")
        const today = getCurrentDate(); // Get today's date in 'yyyy-mm-dd' format
        const todayMonth = getMonthFromISOString(today); // Get today's month
    
        orderItemList.forEach((item) => {
            const itemDate = getDateFromISOString(item.OrderDate); // Get item's date in 'yyyy-mm-dd' format
            const itemMonth = getMonthFromISOString(item.OrderDate); // Get item's month
            console.log(itemDate)
            console.log(itemMonth)
            if (itemDate === today) {
                dailyCalc += parseFloat(item.OrderTotal);
            }
    
            if (itemMonth === todayMonth) {
                monCalc += parseFloat(item.OrderTotal);
            }
        });
        console.log(dailyCalc) 
        setDailyRevenue(dailyCalc);
        setMonthlyRevenue(monCalc);
    };

    const navigate=useNavigate();
    const [menuItems, setMenuItems] = useState({});
    const [orderItemList, setOrderItemList] = useState([]);
    // useEffect(() => {
    //     async function fetchData() {
    //         calcRevenue()
    //         const currentUserString = localStorage.getItem("currentUser");
    //         const currentUser = JSON.parse(currentUserString);
            
    //     }
    //     fetchData();
    // }, []);

   

    useEffect(() => {
        async function fetchData() {
            const data = await fetchOrderItems();
            
            setOrderItemList(data);
            // calcRevenue()
        }
        fetchData();
    }, []);

    useEffect(() => {
        calcRevenue();
    }, [orderItemList]);

    const handleDelete = async (item) => {
        // e.preventDefault();
        try {
            const currentUserString = localStorage.getItem("currentUser");
            const currentUser = JSON.parse(currentUserString);
            
              
            await axios.delete(
                
              `http://localhost:3000/api/orders/${item.OrderID}`,
             
              {
                headers: {
                  Authorization: currentUser.accessToken,
                  userRole: currentUser.role
                }
              }
            );
            const updatedData = await fetchOrderItems();
           setOrderItemList(updatedData);
          } catch (error) {
            console.error('Error deleting from menu:', error);
            // Handle the error as needed
          }
      };
    
        
  console.log(orderItemList)

    return (
        <>
            <section className="mx-auto w-full max-w-8xl px-4 py-4">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                        <h2 className="text-lg font-semibold">Manage Orders and Finances</h2>
                        <p className="mt-1 text-sm text-gray-700">
                           Revenue Summary:
                        </p>

                    </div>
                    
                    
                </div>
                <div className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black max-w-[17rem]">
                            Today's Revenue is:{dailyRevenue}</div>
                    
                <div className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black max-w-[17rem]">
                            This Month's Revenue is:{monthlyRevenue}</div>
                    
                    
                
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
                                                <span>Order ID</span>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                                            >
                                                Customer ID
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                            >
                                                Payment Method
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                            >
                                                Order Total
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                            >
                                                Order Date
                                            </th>
                                           
                                            <th scope="col" className="relative px-4 py-3.5">
                                                <span className="sr-only">Delete</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {orderItemList.map((item) => (
                                            <tr key={item.id}>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <div className="flex items-center">
                                                        
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{item.OrderID}</div>

                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-12 py-4 max-w-[10-rem]">
                                                    <div className="text-sm text-gray-900 break-all">{item.CustomerID}</div>

                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <span className={`inline-flex rounded-full ${item.Category === 'Non Veg' ? 'bg-red-100' : 'bg-green-100'} px-2 text-xs font-semibold leading-5 ${item.status === 'Active' ? 'text-green-800' : 'text-red-800'}`}>
                                                       
                                                        {item.PaymentMethod}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                                {item.OrderTotal}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                                {getDateFromISOString(item.OrderDate)}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                                                    <button type="button" className="text-gray-700"  onClick={() => handleDelete(item)} >
                                                    {/* */}
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            className="w-6 h-6"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>

{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
</svg> */}
                                                    </button>
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
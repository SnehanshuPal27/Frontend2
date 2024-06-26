import React from 'react'
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
async function fetchSuppliers() {
    const currentUserString = localStorage.getItem("currentUser");
    const currentUser = JSON.parse(currentUserString);
    const response = await axios.get(
        'http://localhost:3000/api/suppliers/',
        {
            headers: {
                Authorization: currentUser.accessToken,
                userRole: currentUser.role

            }
        }
    );
    console.log(response.data)
    return response.data;
}

export function SupplierManage({ supplierData, setSupplierData }) {
    const navigate = useNavigate();



    const handleDelete = async (item) => {
        // e.preventDefault();
        try {
            const currentUserString = localStorage.getItem("currentUser");
            const currentUser = JSON.parse(currentUserString);
            // console.log(MenuData)
            await axios.delete(
                `http://localhost:3000/api/suppliers/${item.SupplierID}`,

                {
                    headers: {
                        Authorization: currentUser.accessToken,
                        userRole: currentUser.role
                    }
                }
            );
            const updatedData = await fetchSuppliers();
            setSupplierList(updatedData);
        } catch (error) {
            console.error('Error deleting from menu:', error);
            // Handle the error as needed
        }
    };
    // const isoString = '2023-04-14T12:34:56.789Z';
    // const dateOnly = getDateFromISOString(isoString); // Output: "2023-04-14"
    const handleEdit = (item) => {
        setSupplierData({
            ...supplierData,
            SupplierID: item.SupplierID,
            SupplierName: item.SupplierName,
            SupplierAddress: item.SupplierAddress,
            ContactPerson: item.ContactPerson,
            ContactNumber: item.ContactNumber
        });

        // console.log(MenuData)
        navigate("/editSupplier")
    }



    const [supplierList, setSupplierList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchSuppliers();
            setSupplierList(data);
            console.log(data)
        }
        fetchData();
    }, []);

    // useEffect(() => {
    //     setMenuData({
    //         MenuItemID: '',
    //         MenuItemName: '',
    //         Description: '',
    //         Category: '',
    //         Price: '',
    //         ImageUrl: ''
    //     });
    // }, []);


    return (
        <>
            <section className="mx-auto w-full max-w-8xl px-4 py-4">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                        <h2 className="text-lg font-semibold">Supplier Manager</h2>
                        <p className="mt-1 text-sm text-gray-700">
                            Manage Suppliers
                        </p>

                    </div>
                    <div>
                        <button
                            type="button"

                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            <Link to="/addSupplier">Add New Supplier</Link>
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
                                                <span>Supplier ID</span>
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                            >
                                                <span>Customer Name</span>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                                            >
                                                Contact Number
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                            >
                                                Email
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                            >
                                                Address
                                            </th>
                                            <th scope="col" className="relative px-4 py-3.5">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                            <th scope="col" className="relative px-4 py-3.5">
                                                <span className="sr-only">Delete</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {supplierList.map((item) => (
                                            <tr key={item.id}>
                                                <td className="whitespace-nowrap px-12 py-4 max-w-[10-rem]">
                                                    <div className="text-sm text-gray-900 break-all">{item.SupplierID}</div>

                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <div className="flex items-center">

                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{item.SupplierName}</div>

                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-12 py-4 max-w-[10-rem]">
                                                    <div className="text-sm text-gray-900 break-all">{item.ContactPerson}</div>

                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <span className={`inline-flex rounded-full 'bg-red-100' px-2 text-xs font-semibold leading-5 ${item.status === 'Active' ? 'text-green-800' : 'text-red-800'}`}>
                                                        {item.ContactNumber}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                                    {item.SupplierAddress}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                                                    <button type="button" className="text-gray-700" onClick={() => handleDelete(item)}>
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
                                                    </button>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                                                    <button
                                                        type="button"
                                                        className="text-gray-700 cursor-pointer focus:outline-none"
                                                        onClick={() => handleEdit(item)}
                                                    >
                                                        Edit
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
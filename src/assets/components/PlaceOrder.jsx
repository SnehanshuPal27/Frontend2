import React from 'react'
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'

function PlaceOrder({orderSummary,setOrderSummary,finalInventory,setFinalInventory}) {

    return (
        <div><TableOne orderSummary={orderSummary} setOrderSummary={setOrderSummary} finalInventory={finalInventory} setFinalInventory={setFinalInventory}/></div>
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
        `http://localhost:3000/api/menu/ingridients/${MenuItemID}`,
        {
            headers: {
                Authorization: currentUser.accessToken,

            }
        }
    );
    return response.data;
}

async function getInventory() {
    console.log("getInventorycalled")
    const currentUserString = localStorage.getItem("currentUser");
    const currentUser = JSON.parse(currentUserString);
    const response = await axios.get(
        "http://localhost:3000/api/inventory",
        {
            headers: {
                Authorization: currentUser.accessToken,

            }
        }
    );
    return response.data;
}

function validateQuantity(InventoryList, MenuItemID) {


}


export function TableOne({orderSummary,setOrderSummary,finalInventory,setFinalInventory}) {
    const navigate = useNavigate();
    const [InventoryList, setInventoryList] = useState([]);
    const [quantityList, setQuantityList] = useState({});

    useEffect(() => {
        async function fetchInventory() {
            const data = await getInventory();
            setInventoryList(data);
        }
        fetchInventory();
    }, []);

    const [quantity, setQuantity] = useState('');
    const [orderTotal,setOrderTotal]=useState(0.0);
    const [IngridientList, setIngridientList] = useState([]);

    // useEffect(() => {
    //     async function fetchIngridients(MenuItemID) {
    //         const data = await getIngridients(MenuItemID);
    //         setIngridientList(data);
    //     }
    //     fetchIngridients();
    // }, []);

    const fetchIngridients = async (MenuItemID) => {
        console.log(`in fetch ingridients react:${MenuItemID}`)
        const data = await getIngridients(MenuItemID);
        console.log(data)
        return data;
        // setIngridientList(data);
    };

    const handleIncrement = async (MenuItemID) => {
        let flag = true;
        let fetchedIngridientList=await fetchIngridients(MenuItemID);
        // IngridientList=[...fetchedIngridientList]
        await getInventory();
        console.log("c1")
        console.log(fetchedIngridientList)
        const updatedInventoryList = [...InventoryList]; // Create a copy of the InventoryList
        console.log(updatedInventoryList)
        fetchedIngridientList.forEach(item => {
            let InventoryItemID = item.InventoryID;
            console.log(`${item.InventoryID}outloop` )
            for (let i = 0; i < updatedInventoryList.length; i++) {
                
                console.log(`in loop:${updatedInventoryList[i].InventoryID}`)

                if (updatedInventoryList[i].InventoryID === InventoryItemID) {
                    console.log(item.InventoryID)
                    if (updatedInventoryList[i].Quantity <= item.Quantity) {
                        flag = false;
                        break;
                    } 
                }
            }
        });
       
        if(flag==true){
        fetchedIngridientList.forEach(item => {
            let InventoryItemID = item.InventoryID;
            console.log(`${item.InventoryID}outloop` )
            for (let i = 0; i < updatedInventoryList.length; i++) {
                
                console.log(`in loop:${updatedInventoryList[i].InventoryID}`)

                if (updatedInventoryList[i].InventoryID === InventoryItemID) {
                    console.log(item.InventoryID)
                    
                        updatedInventoryList[i].Quantity =updatedInventoryList[i].Quantity- item.Quantity;
                        console.log(`updated quantity is:${updatedInventoryList[i].Quantity }`)
                    
                }
            }
        });
        setInventoryList(updatedInventoryList)
    for(let i=0;i<menuItemList.length;i++){
        if(menuItemList[i].MenuItemID==MenuItemID){
            let newTotal=parseFloat(orderTotal)+parseFloat(menuItemList[i].Price)
            setOrderTotal(newTotal)
        }
    }
    
    }
    
        if (flag && quantityList[MenuItemID] !== undefined) {
            setQuantityList(prevState => ({
                ...prevState,
                [MenuItemID]: prevState[MenuItemID] + 1
            }));
            // setInventoryList(updatedInventoryList); // Update the InventoryList
        } else if (flag) {
            setQuantityList(prevState => ({
                ...prevState,
                [MenuItemID]: 1
            }));
            // setInventoryList(updatedInventoryList); // Update the InventoryList
        }
        
        console.log(InventoryList)
    };
    

    const handleDecrement = async (MenuItemID) => {
        const updatedInventoryList = [...InventoryList];
       let fetchedIngridientList= await fetchIngridients(MenuItemID);
        if (quantityList[MenuItemID] > 0) {
            fetchedIngridientList.forEach(item => {
                let InventoryItemID = item.InventoryID;
                console.log(`${item.InventoryID}outloop` )
                for (let i = 0; i < updatedInventoryList.length; i++) {
                    
                    console.log(`in loop:${updatedInventoryList[i].InventoryID}`)
    
                    if (updatedInventoryList[i].InventoryID === InventoryItemID) {
                        console.log(item.InventoryID)
                        
                            updatedInventoryList[i].Quantity =updatedInventoryList[i].Quantity+ item.Quantity;
                            console.log(`updated quantity is:${updatedInventoryList[i].Quantity }`)
                        
                    }
                }
            });
            setQuantityList({ ...quantityList, [MenuItemID]: quantityList[MenuItemID] - 1 });
            setInventoryList(updatedInventoryList);

            for(let i=0;i<menuItemList.length;i++){
                if(menuItemList[i].MenuItemID==MenuItemID){
                    let newTotal=parseFloat(orderTotal)-parseFloat(menuItemList[i].Price)
                    setOrderTotal(newTotal)
                }
            }
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

const handleFinalise=()=>{
    console.log(quantityList)
   setOrderSummary(quantityList)
   setFinalInventory(InventoryList)
   console.log(orderSummary)
   console.log("setIt")
   navigate("/newFinaliseOrder")
    
}


    return (
        <>
            <section className="mx-auto w-full max-w-8xl px-4 py-4">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                        <h2 className="text-lg font-semibold">Order</h2>
                        <p className="mt-1 text-sm text-gray-700">
                            Add Order Items for the customer
                        </p>
                        <div className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                            Order Total is:{orderTotal}</div>
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={handleFinalise}
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                           Finalise Order
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
                                                            <button type="button" onClick={() => handleDecrement(item.MenuItemID)} id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
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
                                                                placeholder="1"
                                                                value={quantityList[item.MenuItemID] != undefined ? quantityList[item.MenuItemID] : 0}
                                                                onChange={(e) => setQuantity(e.target.value)}
                                                                required
                                                            />
                                                            <button type="button" onClick={() => handleIncrement(item.MenuItemID)} id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
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
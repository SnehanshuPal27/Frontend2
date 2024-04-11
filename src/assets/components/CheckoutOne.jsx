import { useEffect } from 'react';
import React, { useState } from 'react'
import { X } from 'lucide-react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}
const products = [
  {
    id: 1,
    name: 'Nike Air Force 1 07 LV8',
    href: '#',
    price: '₹47,199',
    originalPrice: '₹48,900',
    discount: '5% Off',
    color: 'Orange',
    size: '8 UK',
    imageSrc:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png',
  },
  {
    id: 2,
    name: 'Nike Blazer Low 77 SE',
    href: '#',
    price: '₹1,549',
    originalPrice: '₹2,499',
    discount: '38% off',
    color: 'White',
    leadTime: '3-4 weeks',
    size: '8 UK',
    imageSrc:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e48d6035-bd8a-4747-9fa1-04ea596bb074/blazer-low-77-se-shoes-0w2HHV.png',
  },
  {
    id: 3,
    name: 'Nike Air Max 90',
    href: '#',
    price: '₹2219 ',
    originalPrice: '₹999',
    discount: '78% off',
    color: 'Black',
    imageSrc:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fd17b420-b388-4c8a-aaaa-e0a98ddf175f/dunk-high-retro-shoe-DdRmMZ.png',
  },
]

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






export function CheckoutOne({ orderSummary, setOrderSummary,finalInventory,setFinalInventory }) {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [menuItemList, setMenuItemList] = useState([]);
  
  async function lodgeCustomer(){
    try {
      const currentUserString = localStorage.getItem("currentUser");
      const currentUser = JSON.parse(currentUserString);
      const response = await axios.get(
        'http://localhost:3000/api/customers/highestCustomerIndex',
        {
          headers: {
            Authorization: currentUser.accessToken,
          }
        }
      );
      console.log(response)
      let index=parseInt(response.data['MAX(CustomerID)'])
      index+=1;
      console.log(index)
      try {
        await axios.post(
          'http://localhost:3000/api/customers/',
          {
            CustomerID: index,
            CustomerName: fullName,
            ContactNumber: contactNumber,
            Email: email,
            Address: address
          },
          {
            headers: {
              Authorization: currentUser.accessToken
            }
          }
        );
      } catch (error) {
        console.error('Error creating customer:', error);
        // Handle the error as needed
      }
      
      return index;
    } catch (error) {
      console.error('Error in lodgeCustomer:', error.message);
      return 0;
    }
  }
  


    useEffect(() => {
        async function fetchData() {
            const data = await fetchmenuItems();
            setMenuItemList(data);
        }
        fetchData();
    }, []);


    const [finalMenu, setFinalMenu] = useState([]);
    const[ orderAmountTotal,setorderAmoutTotal]=useState(0.0)
    const createFinalMenu = () => {
      let menu = [];
      let calcValue = 0.0; // Initialize calcValue with current orderAmountTotal
      Object.entries(orderSummary).forEach(([key, value]) => {
        for (let i = 0; i < menuItemList.length; i++) {
          if (menuItemList[i].MenuItemID == key) {
            menu.push(menuItemList[i]);
            console.log(menuItemList[i])
            // console.log(value)
            // console.log(calcValue) // Use calcValue here
            calcValue += parseFloat(menuItemList[i].Price) * value; // Update calcValue
            // console.log(calcValue)
          }
        }
      });
      setorderAmoutTotal(calcValue); // Update orderAmountTotal after calculating the total
      return menu;
    };

useEffect(() => {
  const menu = createFinalMenu();
  setFinalMenu(menu);
}, [orderSummary, menuItemList]);

const handleSubmit = async (e) => {
  try {

    e.preventDefault();
    const currentUserString = localStorage.getItem("currentUser");
    const currentUser = JSON.parse(currentUserString);
    let customerID = await lodgeCustomer();
    console.log("hi");
    const response = await axios.get(
      'http://localhost:3000/api/orders/highestOrderIndex',
      {
        headers: {
          Authorization: currentUser.accessToken,
        },
      }
    );
    let index = parseInt(response.data['MAX(OrderID)']);
    index += 1;
    console.log(`orderIndex assigned:${index}`);
    await axios.post(
      'http://localhost:3000/api/orders',
      
        {
          OrderID: index,
          CustomerID: customerID,
          OrderTotal: orderAmountTotal,
          OrderDate: getCurrentDate(),
        },{
        headers: {
          Authorization: currentUser.accessToken,
        }
      }
    );

    finalMenu.forEach(async (item) => {
      await axios.post(
        'http://localhost:3000/api/orders/createOrderItem',{
          OrderID: index,
          MenuItemID: item.MenuItemID,
          Quantity: orderSummary[item.MenuItemID],
          Price: item.Price,
          
        },{
        
          headers: {
            Authorization: currentUser.accessToken,
          }}
          
        
      );
    });

    console.log(finalInventory)
    finalInventory.forEach(async (item) => {
      await axios.post("http://localhost:3000/api/inventory/update",{InventoryID:item.InventoryID,Quantity:item.Quantity},{
        
      headers: {
        Authorization: currentUser.accessToken,
      }})
  })

  
  navigate('/adminDashboard')
  
}

  catch (error) {
    console.error('Error in handleSubmit:', error.message);
  }
};


  return (
    <div className="mx-auto my-4 max-w-4xl md:my-6">
    <div className="overflow-hidden  rounded-xl shadow">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Product List */}
        <div className="bg-gray-100 px-5 py-6 md:px-8">
          <div className="flow-root">
            <ul className="-my-7 divide-y divide-gray-200">
              {finalMenu.map((item) => (
                <li
                  key={item.MenuItemID}
                  className="flex items-stretch justify-between space-x-5 py-7"
                >
                  <div className="flex flex-1 items-stretch">
                    <div className="flex-shrink-0">
                      <img
                        className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-contain"
                        src={item.imageSrc}
                        alt=" "
                      />
                    </div>
                    <div className="ml-5 flex flex-col justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-bold">{item.MenuItemName}</p>
                        
                      </div>
                      <p className="mt-4 text-xs font-medium ">Quantity: x {orderSummary[item.MenuItemID]}</p>
                    </div>
                  </div>
                  <div className="ml-auto flex flex-col items-end justify-between">
                    <p className="text-right text-sm font-bold text-gray-900">{item.Price}</p>
                    
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <hr className="mt-6 border-gray-200" />
         
          <ul className="mt-6 space-y-3">
            
            <li className="flex items-center justify-between text-gray-900">
              <p className="text-sm font-medium ">Total</p>
              <p className="text-sm font-bold ">{orderAmountTotal}</p>
            </li>
          </ul>
        </div>

          {/* Contact Info */}
          <div className="px-5 py-6 text-gray-900 md:px-8">
            <div className="flow-root">
              <div className="-my-6 divide-y divide-gray-200">
                <div className="py-6">
                  <h2 className="text-base font-bold">Contact Information</h2>

                  <form onSubmit={handleSubmit} className="mt-6">
                    <div className="space-y-5">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <label htmlFor="name" className="text-sm font-medium">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                          placeholder="Full Name"
                        />
                      </div>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                          placeholder="Email"
                        />
                      </div>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <label htmlFor="contactNumber" className="text-sm font-medium">
                          Contact Number
                        </label>
                        <input
                          type="text"
                          id="contactNumber"
                          value={contactNumber}
                          onChange={(e) => setContactNumber(e.target.value)}
                          className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                          placeholder="Contact Number"
                        />
                      </div>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <label htmlFor="address" className="text-sm font-medium">
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                          placeholder="Address"
                        />
                      </div>
                      <div>
                        <button
                          type="submit"
                          
                          className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                          Get Started
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

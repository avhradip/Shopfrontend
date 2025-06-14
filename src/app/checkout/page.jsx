'use client';

//Next imports
// Import the clearCart action creator from the Redux cartSlice file
import { clearCart } from '@/Feature/cartSlice';

// Import the useRouter hook from Next.js for client-side navigation
import { useRouter } from 'next/navigation';

// Import React and useEffect/useState hooks for managing component state and lifecycle
import React, { useEffect, useState } from 'react';

// Import useDispatch to dispatch Redux actions and useSelector to access Redux state
import { useDispatch, useSelector } from 'react-redux';


//icons imports
import { IoCashOutline } from "react-icons/io5";
import { CiBank } from "react-icons/ci";
import { CgPaypal } from "react-icons/cg";
import { addAddress, cart, getAddress, placeOrder, removeAddress } from '../../Feature/userSlice';
import { Button } from '../../../src/Components/Ui/button';
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';

const Page = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [addnew, setAddNew] = useState(false);
  const [addressId, setAddressId] = useState(null)
  const [selectedPayment, setSelectedPayment] = useState('cash');
  const [form, setForm] = useState({
    street: '',
    state: '',
    city: '',
    zip: '',
    country: ''
  });

  const [isClient, setIsClient] = useState(false);

  const { items } = useSelector((state) => state.cart);
  const { address, cartData, loading } = useSelector((state) => state.user);

  const subtotal = Array.isArray(cartData)
    ? cartData.reduce((acc, cur) => acc + (parseFloat(cur?.product?.price || 0) * cur?.quantity), 0)
    : 0;

  const discount = Math.round(subtotal * 0.2);
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (address.length === 0) {
      setAddNew(true)
    }
  }, [address])

  useEffect(() => {
    dispatch(getAddress())
    dispatch(cart())
  }, [dispatch])



  const placeOrderFun = ({ id: addressId, paymentMethod:selectedPayment }) => {
    
    toast.promise(
      dispatch(placeOrder({ id: addressId, paymentMethod: selectedPayment })).unwrap().then(() => {
        router.push('/')
      }),
      {
        loading: 'plese weight...',
        success: <b>order plased</b>,
        error: <b>Failed to plased order.</b>,
      }
    );
  };

  const addAddressFun = async (form) => {
    toast.promise(
      dispatch(addAddress(form)).unwrap().then(() => {
        dispatch(getAddress())
        setAddNew(false)
        setForm({
          street: '',
          state: '',
          city: '',
          zip: '',
          country: ''
        })
      }),
      {
        loading: 'Adding...',
        success: <b>address added</b>,
        error: <b>Failed to add address.</b>,
      }
    );
  }

  const removeAddressFun = async (id) => {
    toast.promise(
      dispatch(removeAddress(id)).unwrap().then(() => {
        dispatch(getAddress())
        setAddressId(null)
      }),
      {
        loading: 'Removing...',
        success: <b>Item removed!</b>,
        error: <b>Failed to remove item.</b>,
      }
    );
  };


  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;


  // const total = items.reduce((acc, cur) => acc + cur.price * cur.qty, 0); // Fix here

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Shipping Form */}
        <div className="space-y-4 ">
          {address.length > 0 ?
            addnew ? (
              <button
                className="bg-white border-2 text-red-600 text-sm px-2 rounded border-red-600"
                onClick={() => {
                  setAddNew(false)
                  setForm({
                    street: '',
                    state: '',
                    city: '',
                    zip: '',
                    country: ''
                  })
                }} // Cancel -> hide form
              >
                Cancel
              </button>
            ) : (
              <button
                className="bg-white border-2 text-blue-500 text-sm px-2 rounded border-blue-500"
                onClick={() => {
                  setAddNew(true)
                  setAddressId(null)
                }} // Add New -> show form
              >
                Add New
              </button>
            ) : ("")
          }

          <div className={` ${addnew ? "hidden" : "block"}`}>
            <p className='text-[25px] font-semibold'>Select Address</p>
            {address?.map(item => (
              <div key={item._id} className={`flex p-4 border-2 mb-2 rounded-2xl ${addressId ? "bg-gray-300 border-2 border-gray-200" : "bg-white"} `} onClick={() => {
                setAddressId(item._id)
              }}>
                <div className='flex flex-wrap gap-10 '>
                  <div>
                    <h1 className='text-[15px] font-semibold'>City</h1>
                    <p>{item?.city}</p>
                  </div>
                  <div>
                    <h1 className='text-[15px] font-semibold'>country</h1>
                    <p>{item?.country}</p>
                  </div>
                  <div>
                    <h1 className='text-[15px] font-semibold'>state</h1>
                    <p>{item?.state}</p>
                  </div>
                  <div>
                    <h1 className='text-[15px] font-semibold'>street</h1>
                    <p>{item?.street}</p>
                  </div>
                  <div>
                    <h1 className='text-[15px] font-semibold'>zip</h1>
                    <p>{item?.zip}</p>
                  </div>
                </div>
                <MdDelete size={40} className='text-red-600' onClick={(e) => {
                  removeAddressFun(item._id)
                  e.stopPropagation()
                }} />
              </div>
            ))}
          </div>
          <div className={`${addnew ? "block" : "hidden"} space-y-4`}>
            <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>

            {['street', 'state', 'city', 'zip', 'country'].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            ))}
            <Button
              className="w-full"
              onClick={() => addAddressFun(form)}
            >
              Add
            </Button>

          </div>

          <div className="flex justify-between gap-4">
            {[
              { value: 'cash', icon: <IoCashOutline className={`text-3xl ${selectedPayment === "cash" ? "text-green-500" : "text-black"} `} />, label: 'Cash' },
              { value: 'bank', icon: <CiBank className={`text-3xl ${selectedPayment === "bank" ? " text-blue-500" : "text-black"}`} />, label: 'Bank' },
              { value: 'paypal', icon: <CgPaypal className={`text-3xl ${selectedPayment === "paypal" ? " text-purple-500" : "text-black"}`} />, label: 'PayPal' }
            ].map(({ value, icon, label }) => (
              <label key={value} className="flex flex-col items-center cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={value}
                  className="hidden peer"
                  onChange={(e) => setSelectedPayment(e.target.value)}
                />
                {icon}
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
          <Button
            type="submit"
            className="w-full h-10 p-2"
            onClick={() => {
              placeOrderFun({ id: addressId, paymentMethod: selectedPayment })
            }}
          >
            Place Order
          </Button>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cartData.length > 0 && cartData?.map((item) => (
            <div key={item._id} className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={item?.product?.image[0]}
                  alt={item?.title || 'product'}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item?.title}</p>
                  <p className="text-sm text-gray-500">Qty: {item?.quantity}</p>
                </div>
              </div>
              <p>${(item?.product?.price * item?.quantity).toFixed(2)}</p>
            </div>
          ))}
          <hr className="my-4" />
          <div className="flex justify-between font-semibold text-lg">
            <p>Total:</p>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

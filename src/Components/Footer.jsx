"use client";

import React, { useEffect, useState } from "react";
import { IoIosMail } from "react-icons/io";
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";
import Image from "next/image";
function Footer() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="bg-gray-200 mt-40 md:mt-30 flex flex-col gap-20 relative ">
      
      <div className="w-full flex justify-center px-4">
        <div className="bg-black text-white rounded-2xl w-full max-w-6xl px-10 py-10 md:py-14 flex flex-col md:flex-row justify-between items-center gap-8 mx-14 absolute top-[-100] ">
          <p className="text-2xl md:text-3xl font-extrabold max-w-md text-center md:text-left">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </p>

          <div className="flex flex-col gap-4 w-full max-w-md">
            <div className="flex items-center bg-white rounded-full overflow-hidden">
              <div className="p-3 text-gray-600">
                <IoIosMail size={24} />
              </div>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-white text-black px-2 py-3 border-0 outline-none rounded-r-full"
              />
            </div>
            <button className="bg-white text-black rounded-full py-3 font-medium hover:bg-gray-200 transition">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-10 pt-40">
        <div className="flex flex-wrap gap-10">

          <div className="md:col-span-1 space-y-3 w-64">
            <p className="text-xl font-extrabold">SHOP.CO</p>
            <p className="text-sm text-gray-600">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className="flex gap-4 mt-2 text-black text-sm">
              <div className="h-7 w-7 flex items-center justify-center border-1 border-gray-300 rounded-full bg-white ">
                <FaTwitter />
              </div>
              <div className="h-7 w-7 flex items-center justify-center border-1 border-gray-300 rounded-full bg-black text-white ">
                <FaFacebookF />
              </div>
              <div className="h-7 w-7 flex items-center justify-center border-1 border-gray-300 rounded-full bg-white ">
                <FaInstagram />
              </div>
              <div className="h-7 w-7 flex items-center justify-center border-1 border-gray-300 rounded-full bg-white ">
                <FaGithub />
              </div>
            </div>
          </div>


          <div>
            <p className="font-semibold mb-3 text-sm">COMPANY</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>About</li>
              <li>Features</li>
              <li>Works</li>
              <li>Career</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-3 text-sm">HELP</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Customer Support</li>
              <li>Delivery Details</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-3 text-sm">FAQ</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Account</li>
              <li>Manage Deliveries</li>
              <li>Orders</li>
              <li>Payments</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-3 text-sm">RESOURCES</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Free eBooks</li>
              <li>Development Tutorial</li>
              <li>How to - Blog</li>
              <li>Youtube Playlist</li>
            </ul>
          </div>
        </div>

        <hr className="border-t border-gray-300 my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center border-t mt-10 pt-6 text-sm text-gray-500">
          <p>Shop.co © 2000–2023, All Rights Reserved</p>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Image src="/visa.png" alt="visa" width={40} height={24} />
            <Image src="/mastercard.png" alt="mastercard" width={40} height={24} />
            <Image src="/paypal.png" alt="paypal" width={40} height={24} />
            <Image src="/applepay.png" alt="applepay" width={40} height={24} />
            <Image src="/gpay.png" alt="gpay" width={40} height={24} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

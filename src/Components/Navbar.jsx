"use client";

import { useRouter } from "next/navigation";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { LuShoppingCart } from "react-icons/lu";
import { IoMdContact } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { RiAdminFill } from "react-icons/ri";
import { MdKeyboardArrowDown, MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setMenuOpen } from "../Feature/stateSlice";
import { Avatar, AvatarFallback, AvatarImage } from "./Ui/avatar";
import { CiHeart } from "react-icons/ci";
import { useEffect, useState } from "react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./Ui/navigation-menu";
import { getAllCatagoris } from "../Feature/prodectSlice";


export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false)
  const { user, cartData, wishlistItems } = useSelector(state => state.user)
  const { catagoris } = useSelector(state => state.product)
  const { menuOpen } = useSelector(state => state.state)
  const dispatch = useDispatch()

  const itemCount = cartData && cartData?.length || 0
  const itemCount2 = wishlistItems && wishlistItems?.wishlistedItems?.length || 0
  // console.log(wishlestItems)

  useEffect(() => {
    dispatch(getAllCatagoris())
  }, [])


  return (
    <header className="w-full shadow-sm sticky top-0 z-50 bg-white">
      <div className="flex items-center justify-between py-[1%] md:px-[5%] px-4">

        <div className="flex items-center gap-2">
          <button className="lg:hidden block" onClick={() => dispatch(setMenuOpen())} aria-label="Toggle Menu">
            <IoIosMenu className="text-2xl" />
          </button>
          <span
            onClick={() => router.push("/")}
            className="text-2xl font-extrabold cursor-pointer"
          >
            SHOP.CO
          </span>
        </div>



        <nav className="hidden lg:flex items-center gap-2 text-sm font-medium">

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <span className="flex items-center gap-1 hover:text-gray-500">
                    Shop
                  </span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  {catagoris?.map((item) => (
                    <NavigationMenuLink
                      key={item}
                      className="w-52 px-3 hover:bg-gray-100 cursor-pointer block text-[10px]"
                      onClick={() => router.push(`/productbycategory/${(item)}`)}
                    >
                      {item.split('_').join(" ")}
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <span onClick={() => router.push('/onsale')} className="hover:text-gray-500 cursor-pointer">On Sale</span>
          <span onClick={() => router.push('/newarrivals')} className="hover:text-gray-500 cursor-pointer">New Arrivals</span>
          <span onClick={() => router.push('/oders')} className="hover:text-gray-500 cursor-pointer">Oders</span>
        </nav>

        <div className="flex items-center gap-1 cursor-pointer">
          {user?.type === "admin" &&
            <div className="cursor-pointer border-1 border-black px-4 py-2 rounded-xl" onClick={() => router.push('/admin')}>
              <RiAdminFill />
            </div>
          }
          <div className="hidden md:flex items-center w-60 bg-gray-100 px-3 py-1 rounded-full" onClick={() => router.push('/search')}>
            <HiMagnifyingGlass className="text-gray-600" />
            <p>Search for products...</p>
          </div>
          <HiMagnifyingGlass className="md:hidden block text-2xl" onClick={() => router.push('/search')} />
          <div className="flex">
            <CiHeart size={30} onClick={() => router.push('/whishlist')} />
            <p className="relative left-0 bg-gray-200 w-4.5 h-4.5 flex items-center justify-center rounded-full text-[10px]">{itemCount2}</p>
          </div>
          <div className="flex">
            <LuShoppingCart className="text-2xl abselute" onClick={() => router.push('/cart')} />
            <p className="relative left-0 bottom-2 bg-gray-200 w-4.5 h-4.5 flex items-center justify-center rounded-full text-[10px]">{itemCount}</p>
          </div>

          <Avatar onClick={() => router.push('/profile')}>
            <AvatarImage src={user?.profilePicture} />
            <AvatarFallback><IoMdContact className="text-2xl" /></AvatarFallback>
          </Avatar>
        </div>
      </div>


      <div
        className={`
        fixed top-0 left-0 z-40 h-full w-1/2 bg-white transition-transform duration-300 ease-in-out lg:hidden
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-4 flex justify-between border-b">
          <p
            className="text-xl font-semibold"
            onClick={() => {
              router.push('/')
              dispatch(setMenuOpen())
            }
            }>SHOP.CO</p>
          <button onClick={() => dispatch(setMenuOpen())} aria-label="Close Menu" >
            <MdClose className="text-2xl" />
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center mt-10 space-y-6 text-lg font-medium">
          <span onClick={() => {
            router.push('/catagoris')
            dispatch(setMenuOpen())
          }} className="hover:text-gray-500">Shop</span>
          <span onClick={() => {
            router.push('/onsale')
            dispatch(setMenuOpen())
          }} className="hover:text-gray-500">On Sale</span>
          <span onClick={() => {
            router.push('/newarrivals')
            dispatch(setMenuOpen())
          }} className="hover:text-gray-500">New Arrivals</span>
          <span onClick={() => {
            router.push('/oders')
            dispatch(setMenuOpen())
          }} className="hover:text-gray-500">Oders</span>
        </nav>
      </div>
    </header>
  );
}

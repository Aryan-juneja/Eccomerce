'use client';
import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import getCookies from '../utility/cookies'
import Image from 'next/image';
const Navbar = () => {
  const router = useRouter();
  const products = useSelector((state) => state.cart);
  const total = products.reduce((acc, product) => {
    const totalPrice = product.salePrice > 0 ? product.salePrice : product.price;
    return acc + totalPrice * product.quantity;
  }, 0);

  const cookiesGetting = async () => {
    try {
      const cookie = await getCookies('next-auth.session-token'); // Ensure getCookies is an async function
      console.log(cookie)
      if (cookie) {
        toast.success("Logged Out Successfully");
        signOut({ redirect: false }); // Sign out without redirecting
        // setTimeout(() => {
        //   router.push('/');
        // }, 5000); // Delay of 5 seconds before redirecting
      } else {
        toast.error("No session found.");
      }
    } catch (error) {
      toast.error("Error logging out.");
    }
  };

  const { data: session, status } = useSession();
  const admin = session?.user?.role === 'admin';
  console.log(session?.user)
  console.log(admin)
  const image = session?.user?.image;
  const userLoggedIn = status === 'authenticated';

  return (
    <div className="navbar bg-base-100 fixed top-0 left-0 right-0 z-50">
      <div className="flex-1">
        <Link href={'/'} className="btn btn-ghost text-xl">Ecommerce</Link>
      </div>
      <div className="hidden md:flex flex-row justify-between">
        <ul className="menu menu-horizontal p-0 gap-3">
          <li className="text-lg">
            <Link href="/">Home</Link>
          </li>
          <li className="text-lg">
            <Link href="/Products">Products</Link>
          </li>
          <li className="text-lg">
            <Link href="/about">About-Us</Link>
          </li>
          <li className="text-lg">
            <Link href="/contactUs">Contact-Us</Link>
          </li>
        </ul>
      </div>

      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className={` ${userLoggedIn ? "indicator mr-2" : "hidden" }`} >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">{products.length}</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className={` ${products.length > 0 ? '' : 'hidden'}  text-lg font-bold`}>
                {products.length} Items
              </span>
              <span className="text-info">${total}</span>
              <div className="card-actions">
                <Link href={'/viewCart'}>
                  <button className="btn btn-primary btn-block">View cart</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {userLoggedIn ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
              <Image
    alt="User avatar"
    src={image || '/user.png'}
    width={40} // Set the width according to your design
    height={40} // Set the height according to your design
    className="rounded-full" // Ensure the image is styled as a circle
/>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href={'/profile'} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              {admin && (
                <li>
                  <Link href={'/admin/dashboard'}>Admin Dashboard</Link>
                </li>
              )}
              <li>
                <button onClick={()=>cookiesGetting()}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link href={'/sign-up'} className="btn btn-ghost text-lg">
            SignUp
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;



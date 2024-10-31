import Image from 'next/image';
import React from 'react'

const Cards = () => {
  return (
    
        <>
          <div className="mt-4 my-3 p-3">
            <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
              <figure className="image-container">
                <Image src="2.jpg" alt="aryan" className="card-image"/>
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  Shoes
                  <div className="badge badge-secondary">Free</div>
                </h2>
                <p>Aryan</p>
                <div className="card-actions justify-between">
                  <div className="badge badge-outline">6000</div>
                  <div className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200">
                    Buy Now
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }


export default Cards

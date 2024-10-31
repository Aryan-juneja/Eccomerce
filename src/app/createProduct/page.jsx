'use client'
import React, { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [onSale, setOnSale] = useState(false);
  const [salePrice, setSalePrice] = useState(0);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageUrl !== '') {
      try {
        await axios.post('/api/createProduct', {
          imageUrl,
          name,
          stock,
          price,
          purchasePrice,
          onSale,
          salePrice,
        });
        toast.success('Product created successfully');
        setImageUrl('');
        setName('');
        setStock(0);
        setPrice(0);
        setPurchasePrice(0);
        setOnSale(false);
        setSalePrice(0);
        router.replace('/admin/dashboard');
      } catch (error) {
        toast.error('Error creating product');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-semibold text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="stock" className="block font-semibold text-gray-700">
              Stock:
            </label>
            <input
              type="number"
              id="stock"
              placeholder="Enter Stock Value"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block font-semibold text-gray-700">
              Price:
            </label>
            <input
              type="number"
              id="price"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="purchasePrice" className="block font-semibold text-gray-700">
              Purchase Price:
            </label>
            <input
              type="number"
              id="purchasePrice"
              placeholder="Enter Purchase Price"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="onSale"
              checked={onSale}
              onChange={(e) => setOnSale(e.target.checked)}
              className="w-5 h-5 text-blue-500 rounded focus:ring-blue-400"
            />
            <label htmlFor="onSale" className="ml-2 text-gray-700">
              On Sale:
            </label>
          </div>
          {onSale && (
            <div>
              <label htmlFor="salePrice" className="block font-semibold text-gray-700">
                Sale Price:
              </label>
              <input
                type="number"
                id="salePrice"
                placeholder="Enter Sale Price"
                value={salePrice}
                onChange={(e) => setSalePrice(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="imageUrl" className="block font-semibold text-gray-700">
              Image URL:
            </label>
            <CldUploadWidget
              uploadPreset='testing'
              onSuccess={(result) => setImageUrl(result.info.url)}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                  className="w-full px-4 py-2 mt-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Upload an Image
                </button>
              )}
            </CldUploadWidget>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;

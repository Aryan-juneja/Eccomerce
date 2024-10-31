'use client'
import ProductProfitChart from '../../../../components/ProductProfitChart';
import ProductOrderChart from '../../../../components/ProductOrderChart';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [productData, setProductData] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/products');
        const response2 = await axios.get('/api/analytics');
        setProductData(response.data.orders);
        setProduct(response2.data.orders);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Analytics</h1>
      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex-1  md:h-[375px]">
          {productData.length > 0 ? <ProductProfitChart data={product} /> : <p>Loading...</p>}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex-1  md:h-[375px]">
          {productData.length > 0 ? <ProductOrderChart data={productData} /> : <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

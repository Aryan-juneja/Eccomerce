'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchTransactions();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/api/getAllTransactions');
      setTransactions(response.data);
    } catch (error) {
      toast.error('Error fetching transactions');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Transaction History</h1>
      <div className="overflow-x-auto max-h-[700px]">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Transaction ID</th>
              <th className="py-2">User ID</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Payment ID</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction._id}>
                <td className="border px-4 py-2">{transaction._id}</td>
                <td className="border px-4 py-2">{transaction.user}</td>
                <td className="border px-4 py-2">${transaction.amount}</td>
                <td className="border px-4 py-2">{transaction.paymentId}</td>
                <td className="border px-4 py-2">{new Date(transaction.transactionDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTransactions;

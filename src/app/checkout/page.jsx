'use client';
import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/router instead of next/navigation
import Script from 'next/script';
import { emptyCart } from '../../features/cart/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const Checkout = () => {
  

  // Log user ID to ensure it is correct

  const router = useRouter();
  const cartProducts = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState(cartProducts);
  const [formFields, setFormFields] = useState({
    name: '',
    pincode: '',
    address: '',
    phoneNumber: '',
    city: ''
  });

  const calculateTotalPrice = () => {
    return cartItems.reduce((acc, product) => {
      const totalPrice = product.salePrice > 0 ? product.salePrice : product.price;
      return acc + (totalPrice * product.quantity);
    }, 0);
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (formFields.address === '' || formFields.name === '' || formFields.phoneNumber === '' || formFields.pincode === '') {
      alert('Please fill all the fields');
      return false;
    }

    const addressInfo = {
      name: formFields.name,
      pincode: formFields.pincode,
      address: formFields.address,
      phoneNumber: formFields.phoneNumber,
      city: formFields.city,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    };

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
      amount: (calculateTotalPrice()*100).toString(), // Amount in paise
      currency: "USD",
      order_receipt: 'order_rcptid_' + formFields.name,
      name: "Ecommerce",
      description: "Order for " + formFields.name,
      handler: async function (response) {
        const paymentId = response.razorpay_payment_id;
        const info = {
          orderItems: cartItems,
          addressInfo: addressInfo,
          totalPrice: calculateTotalPrice(),
        };
        const transactionInfo={
          paymentId: paymentId,
          amount:calculateTotalPrice(),
          
        }

        try {
          const res = await axios.post('/api/order/create-order', info);
          const res2 = await axios.post('/api/order/create-transaction', transactionInfo);
          if(!res && !res2) {
            alert('Something went wrong. Please try again later')
          }
          // Handle successful order creation
          dispatch(emptyCart());
          router.push('/');
          toast.success("Order Placed Successfully");
        } catch (error) {
          console.error('Error creating order:', error);
          // Handle error, show user feedback
        }
      },
      theme: {
        color: "#3399cc"
      }
    };

    const pay = new window.Razorpay(options);
    pay.open();
  };

  const changeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value
    }));
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="max-w-md mx-auto mt-10 p-6 bg-gray-500 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Cart Details</h2>
          <ul className="mb-4">
            {cartItems.map((item) => (
              <li key={item._id} className="flex justify-between border-b py-2">
                <span>{item.name} (x{item.quantity})</span>
                <span>${item.salePrice > 0 ? item.salePrice * item.quantity : item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>${calculateTotalPrice()}</span>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Payment Details</h2>
        </div>
        <TextField
          name="name"
          label="Name"
          value={formFields.name}
          onChange={changeInput}
          fullWidth
          margin="normal"
          className="mb-4"
        />
        <TextField
          name="pincode"
          label="Pincode"
          value={formFields.pincode}
          onChange={changeInput}
          fullWidth
          margin="normal"
          className="mb-4"
        />
        <TextField
          name="address"
          label="Address"
          value={formFields.address}
          onChange={changeInput}
          fullWidth
          margin="normal"
          className="mb-4"
        />
        <TextField
          name="city"
          label="City"
          value={formFields.city}
          onChange={changeInput}
          fullWidth
          margin="normal"
          className="mb-4"
        />
        <TextField
          name="phoneNumber"
          label="Phone Number"
          value={formFields.phoneNumber}
          onChange={changeInput}
          fullWidth
          margin="normal"
          className="mb-6"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={placeOrder}
          className="w-full"
        >
          Place Order
        </Button>
      </div>
    </>
  );
};

export default Checkout;

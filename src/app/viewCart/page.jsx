'use client'

import { useSelector, useDispatch } from "react-redux";
import { addProduct, removeProduct, valueUpdate, valueDecrement } from "../../features/cart/cartSlice";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import Image from "next/image";

const CartPage = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.cart);
    const total = products.reduce((acc, product) => {
        const totalPrice = product.salePrice > 0 ? product.salePrice : product.price;
        return acc + (totalPrice * product.quantity);
    }, 0);

    const addToCart = (id,name, image, stock, price, salePrice) => {
        const result = products.find((product) => product.id === id);
        if (result) {
            dispatch(valueUpdate(id));
            toast.success("Product added to cart");
        } else {
            dispatch(addProduct({ id,name, image, stock, price, salePrice, quantity: 1 }));
            toast.success("Product added to cart");
        }
    }

    const deleteToCart = (id) => {
        const result = products.find((product) => product.id === id);
        if (result) {
            if (result.quantity > 1) {
                dispatch(valueDecrement(id)); // Assuming you have a valueDecrement action in your cartSlice
            } else {
                dispatch(removeProduct(id)); // Assuming removeProduct action removes the product entirely when quantity is 1
            }
            toast.error("Product removed from cart");
        } else {
            toast.error("Kindly add that product first");
        }
    }

    const router = useRouter();
    if(products.length==0){
        router.push('/')
    }
    return (
        <div className="bg-gray-700 py-10 h-dvh">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between mb-8">
                    <h1 className="text-2xl font-bold">Shopping Cart</h1>
                    <Link href="/" className="text-blue-600 hover:underline">Continue Shopping</Link>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <div key={product.id} className="bg-gray-600 rounded-xl shadow-md overflow-hidden pt-2 ">
                            <Image src={product.image} alt={product.name} className="w-full h-48 object-contain" />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold">{product.name}</h2>
                                <p className="text-gray-300">${product.salePrice? product.salePrice :product.price}</p>
                                <div className="mt-1 flex items-center justify-start gap-4">
                                    <button onClick={() => addToCart(product.id,product.name, product.image, product.stock, product.price, product.salePrice)} className="text-blue-500 text-3xl">+</button>
                                    <span className="text-lg font-bold pt-1">{product.quantity}</span>
                                    <button  onClick={() => deleteToCart(product.id)} className="text-red-500 text-3xl">-</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-right">
                    <p className="text-xl font-semibold">Total: ${total}</p>
                    <Link href={'/checkout'}>
                    <button  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Checkout</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartPage;

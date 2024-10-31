'use client'
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addProduct,removeProduct,valueUpdate,valueDecrement} from "../features/cart/cartSlice";
import Image from "next/image";
const Trending = () => {
  
  const dispatch = useDispatch();
  const products = useSelector(state=> state.cart);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const addToCart =(id,name,image,stock,price,salePrice)=>{
    console.log(products)
    const result =products.find((product)=>product.id === id);
    if(result){
      dispatch(valueUpdate(id));
      toast.success("Product added to cart")
    }
     else{
      dispatch(addProduct({id,name,image,stock,price,salePrice,quantity:1}));
      toast.success("Product   added to cart")
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
  useEffect(() => {
    
    const fetchTrendingProducts = async () => {
      try {
        setLoading(true);
        const products = await axios.get("/api/getSaleProduct");
   
        setTrendingProducts(products.data);
      } catch (error) {
        toast.error("Fetching results error");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  if (loading) {
    return <div className="flex justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }
  return (
    <div>
      <h1 className='font-bold text-4xl mt-3 ml-3'>Trending</h1>
      <div className='w-full bg-gray-700 mt-3'>
        <div className="w-full max-w-screen-3xl overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {trendingProducts.map((product,key) => (
              
              <div key={key} className="p-2">
                <div className="card bg-base-100 w-full shadow-2xl">
                  <figure className="h-64">
                    <Image
                      src={product.imageUrl}
                      alt={`${key}`}
                      className="h-full w-full object-contain"
                      width={300} // Specify the width
                      height={300} // Specify the height
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      {product.name}
                      <div className="badge badge-secondary">SALE</div>
                    </h2>
                    <p>
                      <span className="text-xl font-bold">Price:</span> 
                      <span className="line-through text-red-400 pl-2 pr-2 text-lg">{product.price}$</span> 
                      <span className="text-green-400 text-lg">{product.salePrice}$</span>
                    </p>
                    <div className="card-actions justify-end">
                      <div className="badge badge-outline hover:bg-black hover:text-white cursor-pointer w-20 text-lg p-4" onClick={()=>addToCart(product._id,product.name,product.imageUrl,product.stock,product.price,product.salePrice)}>Add</div>
                      <span className="text-lg font-bold mx-4">{products.find(p => p.id === product._id)?.quantity }</span>
                      <div className="badge badge-outline hover:bg-black hover:text-white cursor-pointer w-20 text-lg p-4" onClick={()=>deleteToCart(product._id)}>Minus</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trending;

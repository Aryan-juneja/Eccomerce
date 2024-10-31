'use client';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


const Page = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');
  const [onSale, setOnSale] = useState(false);
  const [salePrice, setSalePrice] = useState(0);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/getAllProducts');
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        }
      } catch (error) {
        toast.error('Error fetching products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const router = useRouter();

  const handleUpdate = (id) => {
    const productToUpdate = products.find(product => product._id === id);
    setSelectedProduct(productToUpdate);
    setName(productToUpdate.name);
    setPrice(productToUpdate.price);
    setStock(productToUpdate.stock);
    setOnSale(productToUpdate.onSale);
    setSalePrice(productToUpdate.salePrice);
    setOpenPopup(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...selectedProduct,
      name,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      onSale,
      salePrice: parseFloat(salePrice),
      imageUrl: image || selectedProduct.imageUrl,
    };

    try {
      const response = await axios.post(`/api/updateProduct/${selectedProduct._id}`, updatedProduct);
      const updatedProducts = products.map(product =>
        product._id === selectedProduct._id ? response.data : product
      );
      setProducts(updatedProducts);
      toast.success('Product updated successfully!');
      setOpenPopup(false);
      router.refresh();
    } catch (error) {
      toast.error('Error updating product');
      console.error('Update Product Error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post(`/api/deleteProduct/${id}`);
      setProducts(products.filter(product => product._id !== id));
      toast.success('Product deleted successfully!');
    } catch (error) {
      toast.error('Error deleting product');
      console.error('Delete Product Error:', error);
    }
  };

  return (
    <div className="mt-4 h-[calc(100vh-180px)] overflow-x-auto">
  {loading ? (
    <div className="flex justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="border-b border-gray-200 text-left">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Stock</th>
            <th className="py-2 px-4">On Sale</th>
            <th className="py-2 px-4">Sale Price</th>
            <th className="py-2 px-4">Image</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">{product.price}</td>
              <td className="py-2 px-4">{product.stock}</td>
              <td className="py-2 px-4">{product.onSale ? 'True' : 'False'}</td>
              <td className="py-2 px-4">{product.onSale ? product.salePrice : '-'}</td>
              <td className="py-2 px-4">
                <Image src={product.imageUrl} className="w-20 h-20 object-cover rounded-md" alt={product.name} />
              </td>
              <td className="py-2 px-4 flex gap-2 items-center">
                <button
                  className="bg-gray-100 text-gray-800 rounded-md px-2 py-1 hover:bg-gray-300"
                  onClick={() => handleUpdate(product._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-gray-100 text-gray-800 rounded-md px-2 py-1 hover:bg-gray-300"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

  );
}

export default Page;

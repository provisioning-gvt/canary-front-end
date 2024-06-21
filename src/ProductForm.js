import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const ProductForm = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://node-js-server.azurewebsites.net/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error("There was an error fetching the products!", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editId) {
        await axios.put(`https://node-js-server.azurewebsites.net/api/products/${editId}`, { name, price });
        setEditId(null);
      } else {
        await axios.post('https://node-js-server.azurewebsites.net/api/products', { name, price });
      }
      setName('');
      setPrice('');
      fetchProducts();
    } catch (error) {
      console.error("There was an error submitting the product!", error);
    }
  };

  const handleEdit = (product) => {
    setName(product.name);
    setPrice(product.price);
    setEditId(product.id);
  };

  return (
    <div className="container">
      <h2>Product Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label></label>
          </div>
        <div>
          <label>Price:</label>
          <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      <h2>Products List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
              <button onClick={() => handleEdit(product)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductForm;
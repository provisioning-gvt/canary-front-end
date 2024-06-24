import React from 'react';
import './App.css';
import ProductForm from './ProductForm';

function App() {
  return (
    <div className="product-form">
      <header className="product-form">
        <h1>(THIS IS PURELY A TEST APP) Product Management</h1>
      </header>
      <main>
        <ProductForm />
      </main>
    </div>
  );
}

export default App;
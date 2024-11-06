'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';








export default function ProductForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = (e:any) => {
    e.preventDefault();
    
    // Store product details in local storage
    const storedProducts = localStorage.getItem('products');
    const products = storedProducts ? JSON.parse(storedProducts) : []; 
    products.push({ name, description });
    localStorage.setItem('products', JSON.stringify(products));

    // Navigate to the products page
    router.push('/products');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

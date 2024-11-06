'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductDetail() {
  const params = useParams();
  const id = params.id; // Access the path parameter 'id'
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      // Retrieve products from local storage
      const storedProducts = localStorage.getItem('products');
      if (storedProducts){
        const products = storedProducts ? JSON.parse(storedProducts) : [];
        const foundProduct = products.find((prod:any) => prod.id === id);
        setProduct(foundProduct);

      }
      
    }
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-3xl font-bold">{product['name']}</h1>
      <p>{product['description']}</p>
    </div>
  );
}

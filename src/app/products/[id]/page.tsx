'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
interface Product {
  id: string; // Adjust the type as needed, e.g., `number` if `id` is numeric
  name: string;
  price: number;
  description:string
  // Add other fields that are part of the product structure
}
export default function ProductDetail() {
  const params = useParams();
  const id = params.id; // Access the path parameter 'id'
  const [product, setProduct] = useState<Product | null>(null);

  

  useEffect(() => {
    if (id) {
      // Retrieve products from local storage
      const storedProducts = localStorage.getItem('products');
      if (storedProducts){
        const products: Product[] = JSON.parse(storedProducts) || [];
        const foundProduct = products.find((prod: Product) => prod.id === id);
        setProduct(foundProduct??null);

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

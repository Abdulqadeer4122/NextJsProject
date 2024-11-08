'use client'; 
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
export default function Products() {


    
  const [products, setProducts] = useState([]);
   // Handle view details with dynamic routing


   const router=useRouter()
   const handleDetail = (productId:string) => {
    router.push(`/products/${productId}`);
  };


  useEffect(() => {
    // Access localStorage safely inside useEffect
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []); // Only run on client mount

  return (
    <>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map((product, index) => (
          <div key={index}>
            <Card>
            <CardHeader>
                <CardTitle>{product['name']}</CardTitle>
                <CardDescription>{product['description']}</CardDescription>
            </CardHeader>
            <CardContent>
                <p></p>
            </CardContent>
            <CardFooter>
                <Button onClick={() => handleDetail(product['id'])}>Check Detail</Button>
            </CardFooter>
            </Card>

          </div>
        ))
      )}
    </>
  );
}

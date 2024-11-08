"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function ProductInput() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Generate a unique ID for the product
    const id = uuidv4();

    // Store product details in local storage
    const storedProducts = localStorage.getItem('products');
    const products = storedProducts ? JSON.parse(storedProducts) : []; 
    products.push({ id, name, price, description });
    localStorage.setItem('products', JSON.stringify(products));

    // Navigate to the products page
    router.push('/products');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4 p-4 flex flex-col items-center">
        <Card className="mx-auto max-w-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Enter Product Detail</CardTitle>
            <CardDescription>Enter the product detail, name, and description</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              </div>
              <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Price</Label>
                <Input
                  id="price"
                  type="text"
                  placeholder="price"
                  value={name}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  type="text"
                  placeholder="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}

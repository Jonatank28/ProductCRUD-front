'use client';

import AddProduct from "@/components/AddProduct";
import ListProduct from "@/components/ListProduct";
import axios from "axios";
import { useEffect, useState } from "react";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function Home() {
  const [data, setData] = useState<Product[]>([]);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3333/findAll");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <main className="min-h-screen w-screen justify-center">
      <div className="container mx-auto w-7/12">
        <h1 className="pt-6 text-2xl font-bold text-center">Projeto CRUD</h1>
        <AddProduct getData={getData} />
        <ListProduct data={data} getData={getData} />
      </div>
    </main>
  );
}

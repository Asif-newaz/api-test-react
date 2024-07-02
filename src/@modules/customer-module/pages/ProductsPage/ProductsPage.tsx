"use client";

import { Button } from "@/components/ui/button";
import { Suspense, useEffect, useState } from "react";
import { ProductsCard } from "../../presentation/components/ProductsCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsPage() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  console.log(data);

  const getData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v2/web/products?page=${page}&limit=5`
    );
    const result = await response.json();
    setData(result?.payload);
  };

  useEffect(() => {
    try {
      getData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [page]);

  return (
    <div className="bg-slate-950 h-screen">
      <div className="pt-5">
        <h5 className="text-center text-2xl text-white">
          API integration for DH product!
        </h5>
        <Suspense
          fallback={
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          }
        >
          <ul className="pt-10 flex justify-center gap-6">
            {data?.map((item, index) => (
              <li key={index}>
                <ProductsCard
                  imgSource={`${process.env.NEXT_PUBLIC_BASE_URL}/${item?.images?.full}`}
                  name={item?.name}
                  price={item.selling_price}
                />
              </li>
            ))}
          </ul>
        </Suspense>
        <div className="pt-10 flex justify-center gap-4 text-white">
          <div
            className="border p-2 rounded-md hover:text-red-500 cursor-pointer"
            onClick={() => setPage(1)}
          >
            1
          </div>
          <div
            className="border p-2 rounded-md hover:text-red-500 cursor-pointer"
            onClick={() => setPage(2)}
          >
            2
          </div>
          <div
            className="border p-2 rounded-md hover:text-red-500 cursor-pointer"
            onClick={() => setPage(3)}
          >
            3
          </div>
          <div
            className="border p-2 rounded-md hover:text-red-500 cursor-pointer"
            onClick={() => setPage(4)}
          >
            4
          </div>
          <div
            className="border p-2 rounded-md hover:text-red-500 cursor-pointer"
            onClick={() => setPage(5)}
          >
            5
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center">
          <Button
            onClick={getData}
            className="mt-10 bg-white text-black hover:text-black hover:bg-white"
          >
            Click me to get data!
          </Button>
        </div>
      </div>
    </div>
  );
}

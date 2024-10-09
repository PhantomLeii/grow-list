"use client";

import React from "react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import ItemModalForm from "@/components/ItemModalForm";
import { Spinner } from "flowbite-react";
import ItemCard from "@/components/ui/Card";

export default function List() {
  const { id }: { id: string } = useParams();
  const list = useQuery(api.lists.getList, { id });

  // if (list === 403) {
  //   return (
  //     <div className="container h-[calc(100vh-80px)] w-full flex justify-center items-center">
  //       <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
  //         You are not allowed to view this list
  //       </h1>
  //       <p>
  //         Go to{" "}
  //         <Link href="/" className="text-blue-600 hover:underline">
  //           Home
  //         </Link>
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div className="container h-[calc(100vh-80px)] w-full flex flex-col justify-start items-start  max-w-4xl py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-2 w-full">
        <div className="w-full md:w-1/2">
          <h1 className="text-start text-3xl font-bold text-gray-900 dark:text-white">
            {list?.name}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-900">
            {list?.description}
          </p>
        </div>
        <ItemModalForm />
      </div>
      <div className="w-full flex flex-col mt-8 justify-start items-start gap-2">
        {list === undefined && (
          <div className="w-full h-full grid place-items-center">
            <Spinner color="blue" />
          </div>
        )}

        {list?.items?.length === 0 && (
          <p className="text-lg text-neutral-400 text-center md:text-start w-full">
            You have no items in this list.
          </p>
        )}

        {list?.items?.map((item) => (
          <ItemCard
            key={item.itemName}
            name={item.itemName}
            description={item.itemDescription || ""}
          />
        ))}
      </div>
    </div>
  );
}

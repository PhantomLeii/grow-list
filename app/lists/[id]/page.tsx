"use client";

import React from "react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import ItemModalForm from "@/components/ItemModalForm";
import { Spinner } from "flowbite-react";
import ItemCard from "@/components/ui/Card";
import { Id } from "@/convex/_generated/dataModel";

export default function List() {
  const { id }: { id: Id<"lists"> } = useParams();
  const list = useQuery(api.lists.getList, { id });
  const items = useQuery(api.items.getAllItems, { listID: id });
  
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
        <ItemModalForm id={id} />
      </div>

      <div className="w-full flex flex-col mt-8 justify-start items-start gap-2">
        {items === undefined && (
          <div className="w-full h-full grid place-items-center">
            <Spinner color="blue" />
          </div>
        )}

        {items?.length === 0 && (
          <p className="text-lg text-neutral-400 text-center md:text-start w-full">
            You have no items in this list.
          </p>
        )}

        {items?.map(item => (
          <ItemCard
            name={item.name}
          />
        ))}
      </div>
    </div>
  );
}

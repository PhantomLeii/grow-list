"use client";

import React from "react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import ItemModalForm from "@/components/ItemModalForm";

export default function List() {
  const { id }: { id: string } = useParams();
  const list = useQuery(api.lists.getList, { id });

  return (
    <div className="container h-[calc(100vh-80px)] w-full flex flex-col justify-start items-start  max-w-4xl py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-2 w-full">
        <ItemModalForm />
      </div>
      <div className="w-full flex flex-col mt-8 justify-start items-start gap-2">
        item list
      </div>
    </div>
  );
}

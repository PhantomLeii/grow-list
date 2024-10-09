"use client";

import { Card, Badge } from "flowbite-react";

type ItemCardProps = {
  name: string;
  description: string;
  href: string;
  isPrivate: boolean;
}

export default function ItemCard({ name, description, href, isPrivate}: ItemCardProps) {
  return (
    <Card href={href} className="w-full relative">
      {isPrivate && <Badge color="gray" className="absolute top-0 right-0">Private</Badge>}
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {name}
      </h5>
      <p className="font-normal text-lg tracking-tight text-gray-700 dark:text-gray-400">
        {description}
      </p>
    </Card>
  );
}

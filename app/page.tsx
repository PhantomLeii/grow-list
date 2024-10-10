"use client";

import ListModalForm from "@/components/ListModalForm";
import Button from "@/components/ui/Button";
import ItemCard from "@/components/ui/Card";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Spinner } from "flowbite-react";

export default function Home() {
  const lists = useQuery(api.lists.getAllLists);

  return (
    <>
      <SignedOut>
        <OnBoarding />
      </SignedOut>

      <SignedIn>
        <div className="container h-[calc(100vh-80px)] w-full flex flex-col justify-start items-start  max-w-4xl py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-2 w-full">
            <ListModalForm />
          </div>
          <div className="w-full flex flex-col mt-8 justify-start items-start gap-2">
            {lists === undefined && (
              <div className="w-full h-full grid place-items-center">
                <Spinner color="blue" />
              </div>
            )}

            {lists?.length === 0 && (
              <p className="text-lg text-neutral-400 text-center md:text-start w-full">
                You have no lists yet. Create a new list.
              </p>
            )}

            {lists?.map((list) => (
              <ItemCard
                key={list._id}
                name={list.name}
                description={list.description || ""}
                href={`/lists/${list._id}`}
                isPrivate={list.isPrivate}
              />
            ))}
          </div>
        </div>
      </SignedIn>
    </>
  );
}

function OnBoarding() {
  return (
    <div className="container h-[calc(100vh-80px)] w-full flex flex-col justify-center items-center max-w-4xl">
      <p className="w-full text-lg md:text-center tracking-wide font-light uppercase mb-2">
        Make shopping feel like magic again!
      </p>
      <h1 className="text-5xl md:text-center font-extrabold">
        Transform your shopping experience with the{" "}
        <span className="text-blue-800">Greatest</span> tracking solution.
      </h1>
      <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-2 w-full">
        <Button as="a" size="lg" href="/sign-up" color="dark">
          Get Started
        </Button>
        <Button as="a" size="lg" href="/sign-in">
          Sign In
        </Button>
      </div>
    </div>
  );
}

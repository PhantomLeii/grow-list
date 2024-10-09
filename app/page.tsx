'use client';

import ModalForm from "@/components/ModalForm";
import Button from "@/components/ui/Button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();
  
  return (
    <>
      <SignedOut>
        <OnBoarding />
      </SignedOut>

      <SignedIn>
        <div className="container h-screen w-full flex flex-col justify-start items-start  max-w-4xl py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-2 w-full"> 
            <h1 className="text-3xl md:text-start font-extrabold w-full">
              Welcome back,<br />
              <span className="text-blue-800">{user?.firstName}</span>!
            </h1>
            <ModalForm />
          </div>
        </div>
      </SignedIn>
    </>
  );
}

export function OnBoarding() {
  return (
    <div className="container h-screen w-full flex flex-col justify-center items-center max-w-4xl">
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
  )
}
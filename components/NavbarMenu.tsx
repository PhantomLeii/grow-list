"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";
import Button from "./ui/Button";
import Link from "next/link";

export default function NavbarMenu() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <Navbar className="shadow-md min-h-20 grid place-items-center fixed top-0 w-full z-[1000]">
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          GrowList
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 gap-2">
        <SignedIn>
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" img={user?.imageUrl} rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="block text-xs mb-4">@{user?.username}</span>
              <span className="block truncate text-sm font-medium">
                {user?.emailAddresses[0].emailAddress}
              </span>
            </Dropdown.Header>
            <Dropdown.Item><Link href="/">Dashboard</Link></Dropdown.Item>
            <Dropdown.Item><Link href="/lists">Earnings</Link></Dropdown.Item>
            <Dropdown.Item><Link href="/settings">Settings</Link></Dropdown.Item>
            <Dropdown.Divider />
            <SignOutButton>
              <Dropdown.Item className="hover:font-extrabold hover:text-red-700 dark:text-red-700">
                Sign out
              </Dropdown.Item>
            </SignOutButton>
          </Dropdown>
        </SignedIn>
        <SignedOut>
          <Button as="a" href="/sign-in" size="md" color="gray">
            Sign In
          </Button>
        </SignedOut>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active={pathname === "/"}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/about" active={pathname.includes("/about")}>
          About
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

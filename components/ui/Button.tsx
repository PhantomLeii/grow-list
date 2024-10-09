"use client";

import React from "react";
import { Button as DefaultButton } from "flowbite-react";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  isProcessing?: boolean;
  pill?: boolean;
  color?:
    | "blue"
    | "gray"
    | "dark"
    | "light"
    | "success"
    | "failure"
    | "warning"
    | "purple";
  size?: "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  as?: "a" | "span";
  href?: string;
  className?: string;
};

export default function Button({
  children,
  onClick,
  isProcessing,
  pill = false,
  color = "blue",
  size = "md",
  disabled = false,
  as = "span",
  href,
  className,
}: ButtonProps) {
  return (
    <DefaultButton
      as={as === "a" ? Link : as === "span" ? "span" : "span"}
      onClick={onClick}
      isProcessing={isProcessing}
      pill={pill}
      color={color}
      size={size}
      className={
        "flex items-center gap-2 w-full md:w-auto cursor-pointer " +
        className
      }
      aria-disabled={disabled}
      href={href}
    >
      {children}
    </DefaultButton>
  );
}

"use client";

import {
  Button,
  Card,
  Checkbox,
  CustomFlowbiteTheme,
  Modal,
} from "flowbite-react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

type ItemModalProps = {
  name: string;
  description?: string;
  id: Id<"items">;
};

const CardTheme: CustomFlowbiteTheme["card"] = {
  root: {
    base: "flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800",
    children: "flex h-full flex-row justify-start items-center gap-4 p-6",
  },
};

const ModalTheme: CustomFlowbiteTheme["modal"] = {
  root: {
    base: "fixed inset-x-0 top-0 z-[1001] h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
  },
};

export default function ItemModal({ name, description, id }: ItemModalProps) {
  const [openModal, setOpenModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const removeItem = useMutation(api.items.removeItem);

  async function handleRemove() {
    setIsProcessing(true);

    const res = await removeItem({ id });

    if (res === 400) {
      setError("Couldn't remove item. Try again.");
      return;
    }

    setIsProcessing(false);
    setOpenModal(false);
  }

  return (
    <>
      <Card className="w-full" theme={CardTheme}>
        <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
        <h5
          className="text-lg tracking-tight text-gray-900 dark:text-white hover:underline cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          {checked ? <del>{name}</del> : <span>{name}</span>}
        </h5>
      </Card>

      <Modal
        theme={ModalTheme}
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-start">
            <h5 className="mb-5 text-2xl font-bold text-gray-200">{name}</h5>
            <p className="text-lg mb-5 text-gray-400 tracking-tight">
              {description}
            </p>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleRemove()}
                disabled={isProcessing}
                isProcessing={isProcessing}
              >
                Remove
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

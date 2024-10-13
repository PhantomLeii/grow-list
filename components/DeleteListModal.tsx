"use client";

import { CustomFlowbiteTheme, Modal } from "flowbite-react";
import Button from "./ui/Button";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from 'next/navigation'
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";

const ModalFormTheme: CustomFlowbiteTheme["modal"] = {
  root: {
    base: "fixed inset-x-0 top-0 z-[1001] h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
  },
};

export default function DeleteListModal({ id }: { id: Id<"lists"> }) {
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const deleteList = useMutation(api.lists.deleteList);

  async function handleSubmit() {
    setIsProcessing(true);

    const res = await deleteList({ id });
    if (res === 400) {
      setError("Couldn't delete list. Try again");
      return;
    }

    setIsProcessing(false);
    setOpenModal(false);

    router.push('/')
  }

  return (
    <>
      <Button as="span" onClick={() => setOpenModal(!openModal)} color="failure">
        <TrashIcon />
        <span>Delete</span>
      </Button>

      <Modal
        theme={ModalFormTheme}
        show={openModal}
        position="center"
        size="md"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Are you sure you want to delete this list?
            </h3>

            {error && (
              <p className="text-red-600 tracking-tight w-full text-center">
                {error}
              </p>
            )}

            <div className="w-full flex flex-col justify-center items-center gap-2">
              <Button
                color='failure'
                onClick={() => handleSubmit()}
                isProcessing={isProcessing}
                disabled={isProcessing}
              >
                Delete
              </Button>
              <p className="hover:underline text-center text-neutral-400 hover:text-neutral-700 cursor-pointer" onClick={() => setOpenModal(false)}>Cancel</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

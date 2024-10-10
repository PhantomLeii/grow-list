"use client";

import {
  Checkbox,
  CustomFlowbiteTheme,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";
import Button from "./ui/Button";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

const ModalFormTheme: CustomFlowbiteTheme["modal"] = {
  root: {
    base: "fixed inset-x-0 top-0 z-[1001] h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
  },
};

export default function ItemModalList({ id }: { id: Id<"lists"> }) {
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const createItem = useMutation(api.items.createItem);

  async function handleSubmit() {
    setIsProcessing(true);

    const res = await createItem({ ...formData, listID: id });

    if (res === 400) {
      setError("Couldn't add item. Try again.");
      return;
    }

    setFormData({
      name: "",
      description: "",
    });

    setIsProcessing(false);
    setOpenModal(false);
  }

  return (
    <>
      <Button as="span" onClick={() => setOpenModal(!openModal)} color="dark">
        Add Item
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
              Add New Item
            </h3>
            {error && (
              <p className="text-red-600 tracking-tight w-full text-center">
                {error}
              </p>
            )}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="item" value="Item" />
              </div>
              <TextInput
                id="item"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="desription" value="Description" />
              </div>
              <TextInput
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <div className="w-full">
              <Button
                onClick={() => handleSubmit()}
                isProcessing={isProcessing}
                disabled={isProcessing}
              >
                Add
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

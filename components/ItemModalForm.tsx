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

const ModalFormTheme: CustomFlowbiteTheme["modal"] = {
  root: {
    base: "fixed inset-x-0 top-0 z-[1001] h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
  },
};

export default function ItemModalList() {
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    item: "",
    description: "",
  });

  function handleSubmit() {
    console.log(formData);

    setFormData({
      item: "",
      description: "",
    });

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
                value={formData.item}
                onChange={(e) =>
                  setFormData({ ...formData, item: e.target.value })
                }
                placeholder="Milk"
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
                placeholder="Get the douglasdale brand"
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

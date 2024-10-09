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

export default function ModalForm() {
  const [openModal, setOpenModal] = useState(false);
  const createList = useMutation(api.lists.createList);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isPrivate: false,
  });

  async function handleSubmit() {
    const res = await createList({ ...formData });

    if (res !== 201) {
      setError("Could not create list. Try again.");
    }

    setFormData({
      name: "",
      description: "",
      isPrivate: false,
    });

    setOpenModal(false);
  }

  return (
    <>
      <Button as="span" onClick={() => setOpenModal(!openModal)} color="dark">
        New List
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
              Create a New List
            </h3>
            {error && (
              <p className="text-red-600 tracking-tight w-full text-center">
                {error}
              </p>
            )}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Braai Essentials"
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
                placeholder="All the essentials for our braii this weekend"
                required
              />
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="private">Private</Label>
                <Checkbox
                  id="private"
                  checked={formData.isPrivate}
                  onChange={(e) =>
                    setFormData({ ...formData, isPrivate: e.target.checked })
                  }
                />
              </div>
            </div>

            <div className="w-full">
              <Button onClick={() => handleSubmit()}>Create List</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

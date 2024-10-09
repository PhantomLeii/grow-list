
"use client";

import { Checkbox, CustomFlowbiteTheme, Label, Modal, TextInput } from "flowbite-react";
import Button from "./ui/Button";
import { useRef, useState } from "react";

const ModalFormTheme: CustomFlowbiteTheme["modal"] = {
  root: {
    base: "fixed inset-x-0 top-0 z-[1001] h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full"
  }
}

export default function ModalForm() {
  const [openModal, setOpenModal] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button as='span' onClick={() => setOpenModal(!openModal)} color='dark'>
        New List
      </Button>

      <Modal theme={ModalFormTheme} show={openModal} position="center" size="md" popup onClose={() => setOpenModal(false)} initialFocus={nameInputRef}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create a New List</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput id="name" ref={nameInputRef} placeholder="Braai Essentials" required />
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="private">Private</Label>
                <Checkbox id="private" />
              </div>
            </div>

            <div className="w-full">
              <Button onClick={() => {}}>Create List</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

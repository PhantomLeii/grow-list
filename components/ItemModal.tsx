"use client";

import {
  Button,
  Card,
  Checkbox,
  CustomFlowbiteTheme,
  Modal,
} from "flowbite-react";
import { useState } from "react";
import { HiPencil } from "react-icons/hi";

type ItemModalProps = {
  name: string;
  description?: string;
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

export default function ItemModal({ name, description }: ItemModalProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Card
        className="w-full"
        theme={CardTheme}
        onClick={() => setOpenModal(true)}
      >
        <Checkbox />
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
      </Card>

      <Modal
        theme={ModalTheme}
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        className=""
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-start">
            <h5 className="mb-5 text-2xl font-bold text-gray-500">{name}</h5>
            <p className="text-lg mb-5 text-gray-400 tracking-tight">
              {description}
            </p>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => setOpenModal(false)}>
                Delete
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

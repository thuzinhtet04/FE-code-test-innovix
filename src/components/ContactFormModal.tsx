// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
import { ContactForm } from "./ContactForm";
import type { Contact, ContactFormData } from "../types/contacts";
import { useEffect, useRef } from "react";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ContactFormData) => void;
  contact?: Contact;
  isLoading?: boolean;
}

export function ContactFormModal({
  isOpen,
  onClose,
  onSubmit,
  contact,
  isLoading,
}: ContactFormModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeBtnRef.current?.focus();
    console.log(contact, "contact at modal");
  }, [isOpen, contact]);
  const handleSubmit = (data: ContactFormData) => {
    onSubmit(data);
  };

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-hidden={isOpen ? "false" : "true"}
      className={`${
        isOpen ? "flex" : "hidden"
      } overflow-y-auto overflow-x-hidden bg-black/50 fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="w-full max-w-2xl max-h-full m-auto focus-visible:border-2 rounded-lg focus-visible:border-blue-600 "
        tabIndex={-1}
        ref={closeBtnRef}
        aria-labelledby="CreateNewContactTitle"
      >
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 p-5">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b mb-2 rounded-t dark:border-gray-600 border-gray-200">
            <h3
              id="CreateNewContactTitle"
              className="text-xl font-semibold text-gray-900 dark:text-white"
            >
              Create New Contact
            </h3>
            <button
              onClick={onClose}
              type="button"
              ref={closeBtnRef}

              aria-label="Close modal"
              className="text-red-500  bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <ContactForm
            contact={contact ?? undefined}
            onSubmit={handleSubmit}
            onCancel={onClose}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

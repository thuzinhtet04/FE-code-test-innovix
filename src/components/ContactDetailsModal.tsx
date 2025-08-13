import { Calendar, Mail, User, UserCheck, Bell, UserStar } from "lucide-react";
import type { Contact } from "../types/contacts";
import { useEffect, useRef } from "react";

interface ContactDetailsModalProps {
  contact: Contact | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ContactDetailsModal({
  contact,
  isOpen,
  onClose,
}: ContactDetailsModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [isOpen]);
  if (!contact) return null;

  return (
    <div
      onClick={onClose}
      id="default-modal"
      aria-hidden={isOpen ? "false" : "true"}
      className={`${
        isOpen ? "flex" : "hidden"
      } overflow-y-auto overflow-x-hidden bg-black/50  fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className=" p-4 w-full max-w-2xl max-h-full rounded-lg dark:bg-gray-500 m-auto "
        role="dialog"
        aria-modal={true}
        aria-labelledby="ModalTitle"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between    rounded-t dark:border-gray-600 border-gray-200">
            <h3
              id="ModalTitle"
              className="text-xl font-semibold text-gray-900 dark:text-white"
            >
              Contact Details of {contact.lastName}
            </h3>
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close modal"
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-8 w-8 text-primary"></User>
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {contact.firstName} {contact.lastName}
              </h2>
              <p className="text-muted-foreground flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                {contact.email}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div
                className="p-4 border bg-gray-400 rounded-lg 
                "
              >
                <div className="flex items-center space-x-2 mb-2">
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Role</span>
                </div>
                <span>{contact.role}</span>
              </div>
            </div>
            <div>
              <div className="p-4 border bg-gray-400 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Gender</span>
                </div>
                <p>{contact.gender}</p>
              </div>
            </div>
            <div>
              <div className="p-4 border bg-gray-400 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Birth Date</span>
                </div>
                <p>{new Date(contact.birthDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <div className="p-4 border bg-gray-400 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <UserStar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Status</span>
                </div>
                <span>{contact.isActive ? "Active" : "Inactive"}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="p-4 border bg-gray-400 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Newsletter Subscription</span>
                </div>
                <span>
                  {contact.newsletter ? "Subscribed" : "Not Subscribed"}
                </span>
              </div>
            </div>
          </div>

          {(contact.createdAt || contact.updatedAt) && (
            <div>
              <div className="p-4 border bg-gray-400 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  {contact.createdAt && (
                    <div>
                      <span className="font-medium">Created:</span>

                      {new Date(contact.createdAt).toLocaleString()}
                    </div>
                  )}
                  {contact.updatedAt && (
                    <div>
                      <span className="font-medium">Updated:</span>
                      {new Date(contact.updatedAt).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

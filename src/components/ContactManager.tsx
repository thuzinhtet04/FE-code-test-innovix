import { useCallback, useState } from "react";
import { Plus } from "lucide-react";
import { ContactTable } from "./ContactTable";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";

import { ContactDetailsModal } from "./ContactDetailsModal";
import {
  useGetContactsQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} from "../services/api/contacts";
import type {
  Contact,
  ContactFormData,
  ContactFormDataWithId,
} from "../types/contacts";
import toast from "react-hot-toast";
import ContactFormModal from "./ContactFormModal";



type ModalType = "create" | "edit" | "view" | "delete" | null;

export function ContactManager() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const [createContact, { isLoading: isCreating }] = useCreateContactMutation();
  const [updateContact, { isLoading: isUpdating }] = useUpdateContactMutation();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  const {
    data: contactsResponse,
    isLoading: isLoadingContacts,
    isError,
    error,
  } = useGetContactsQuery();
  const contacts = contactsResponse?.contacts || [];

  const openModal = useCallback((type: ModalType, contact?: Contact) => {
    setActiveModal(type);
    setSelectedContact(contact || null);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setSelectedContact(null);
  }, []);


  const handleCreateContact = useCallback(
    async (data: ContactFormData) => {
      try {
         await createContact(data).unwrap();
        toast.success("Contact created successfully!");
        closeModal();
      } catch (error) {
        console.error("Create contact error:", error);
        toast.error("Failed to create contact. Please try again.");
      }
    },
    [createContact, closeModal]
  );

  const handleUpdateContact = useCallback(
    async (data: ContactFormData) => {
      if (!selectedContact) return;
      const updatedContact: ContactFormDataWithId = {
        id: selectedContact.id,
        ...data,
      };
      try {
        await updateContact(updatedContact).unwrap();
        toast.success("Contact updated successfully!");
        closeModal();
      } catch (error) {
        console.error("Update contact error:", error);
        toast.error("Failed to update contact. Please try again.");
      }
    },
    [updateContact, closeModal, selectedContact]
  );

  const handleDeleteContact = useCallback(async () => {
    if (!selectedContact) return;

    try {
      await deleteContact(selectedContact.id).unwrap();
      toast.success("Contact deleted successfully!");
      closeModal();
    } catch (error) {
      console.error("Delete contact error:", error);
      toast.error("Failed to delete contact. Please try again.");
    }
  }, [deleteContact, selectedContact, closeModal]);


  const handleViewContact = (contact: Contact) => {
    openModal("view", contact);
  };

  const handleEditContact = (contact: Contact) => {
    openModal("edit", contact);
  };

  const handleDeleteContactClick = (contact: Contact) => {
    openModal("delete", contact);
  };

  return (
    <div className="space-y-6">
      {/* Header*/}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Contact Management
          </h2>
          <p className="text-muted-foreground">
            Manage your contacts with full CRUD operations
          </p>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => openModal("create")}
            className="py-2.5 px-5 me-2 flex items-center  mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 focus:z-10 focus-visible:ring-2 focus-visible:ring-gray-100 dark:focus-visible:ring-gray-700 dark:bg-blue-600 dark:text-gray-200 dark:border-gray-600 "
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>Add Contact</span>
          </button>
        </div>
      </div>
      {/* Contacts list */}
      <ContactTable
        contacts={contacts}
        isLoading={isLoadingContacts}
        isError={isError}
        error={error}
        onView={handleViewContact}
        onEdit={handleEditContact}
        onDelete={handleDeleteContactClick}
      />
      {/* Create/Edit Modal */}
      {(activeModal === "create" || activeModal === "edit") && (
        <ContactFormModal
          onClose={closeModal}
          onSubmit={
            activeModal === "create" ? handleCreateContact : handleUpdateContact
          }
          contact={activeModal === "edit" ? selectedContact! : undefined}
          isLoading={isCreating || isUpdating}
        />
      )}
      {/*  Details */}
      {activeModal === "view" && (
        <ContactDetailsModal contact={selectedContact} onClose={closeModal} />
      )}
      {/* Delete Confirmation */}
      {activeModal === "delete" && (
        <DeleteConfirmationModal
          onClose={closeModal}
          onConfirm={handleDeleteContact}
          contact={selectedContact}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}

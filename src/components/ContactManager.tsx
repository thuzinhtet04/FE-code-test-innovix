import { useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
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
import { ContactFormModal } from "./ContactFormModal";

import toast from "react-hot-toast";

type ModalType = "create" | "edit" | "view" | "delete" | null;

export function ContactManager() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  //   const { toast } = useToast();

  // RTK Query hooks
  const {
    data: contactsResponse,
    isLoading: isLoadingContacts,
    isError, error
  } = useGetContactsQuery();
  const [createContact, { isLoading: isCreating }] = useCreateContactMutation();
  const [updateContact, { isLoading: isUpdating }] = useUpdateContactMutation();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  const contacts = contactsResponse?.contacts || [];

  // Modal handlers
  const openModal = (type: ModalType, contact?: Contact) => {
    setActiveModal(type);
    setSelectedContact(contact || null);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedContact(null);
  };

  // CRUD operations
  const handleCreateContact = async (data: ContactFormData) => {
    try {
      const resData = await createContact(data).unwrap();
      console.log(resData, "response creatte contact");
      toast.success("Contact created successfully!");
      closeModal();
    } catch (error) {
      console.error("Create contact error:", error);
      toast.error("Failed to create contact. Please try again.");
    }
  };

  const handleUpdateContact = async (data: ContactFormData) => {
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
  };

  const handleDeleteContact = async () => {
    if (!selectedContact) return;

    try {
      await deleteContact(selectedContact.id).unwrap();
      toast.success("Contact deleted successfully!");
      closeModal();
    } catch (error) {
      console.error("Delete contact error:", error);
      toast.error("Failed to delete contact. Please try again.");
    }
  };

  // Table event handlers
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
    

      {/* Header with Add Button */}
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
            className="py-2.5 px-5 me-2 flex items-center  mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-blue-600 dark:text-gray-200 dark:border-gray-600 "
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>Add Contact</span>
          </button>
        </div>
      </div>

      {/* Contact Table */}
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
      <ContactFormModal
        isOpen={activeModal === "create" || activeModal === "edit"}
        onClose={closeModal}
        onSubmit={
          activeModal === "create" ? handleCreateContact : handleUpdateContact
        }
        contact={activeModal === "edit" ? selectedContact! : undefined}
        isLoading={isCreating || isUpdating}
      />

      {/* View Details Modal */}
      <ContactDetailsModal
        contact={selectedContact}
        isOpen={activeModal === "view"}
        onClose={closeModal}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={activeModal === "delete"}
        onClose={closeModal}
        onConfirm={handleDeleteContact}
        contact={selectedContact}
        isLoading={isDeleting}
      />
    </div>
  );
}

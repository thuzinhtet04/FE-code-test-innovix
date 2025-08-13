export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "Admin" | "User" | "Viewer";
  gender: "Male" | "Female" | "Other";
  isActive: boolean;
  newsletter: boolean;
  birthDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: "Admin" | "User" | "Viewer";
  gender: "Male" | "Female" | "Other";
  isActive: boolean;
  newsletter: boolean;
  birthDate: Date;
}
export type ContactFormDataWithId = ContactFormData & { id: string };


export interface ContactsResponse {
  contacts: Contact[];
}

export interface ContactResponse {
  contact: Contact;
}



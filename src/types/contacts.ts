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

export type ContactFormDataWithId = ContactFormData & { id: string };

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

export interface ContactsResponse {
  contacts: Contact[];
  total: number;
}

export interface ContactResponse {
  contact: Contact;
}

export interface ContactApiResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  newsletter: boolean;
  role: "Admin" | "User" | "Viewer";
  gender: "Male" | "Female" | "Other";
  birthDate: string; // comes from API as string
  createdAt: string;
  updatedAt: string;
}

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Contact,
  ContactApiResponse,
  ContactFormData,
  ContactResponse,
  ContactFormDataWithId,
  ContactsResponse,
} from "../../types/contacts";

// Mock API base URL - replace with your actual API endpoint
const API_BASE_URL = "http://localhost:3000";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["contact"],
  endpoints: (builder) => ({
    getContacts: builder.query<ContactsResponse, void>({
      query: () => "/users",
      transformResponse: (
        response: ContactApiResponse[]
      ): ContactsResponse => ({
        contacts: response.map((user) => ({
          id: user.id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          gender: user.gender,
          isActive: user.isActive,
          newsletter: user.newsletter,

          birthDate: user.birthDate,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })),
        total: response.length,
      }),
      providesTags: ["contact"],
    }),
    getContact: builder.query<ContactResponse, string>({
      query: (id) => `/users/${id}`,
      transformResponse: (response: ContactApiResponse): ContactResponse => ({
        contact: {
          id: response.id.toString(),
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          role: response.role,
          gender: response.gender,
          isActive: response.isActive,
          newsletter: response.newsletter,
          birthDate: response.birthDate,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      }),
      providesTags: (_result, _error, id) => [{ type: "contact", id }],
    }),
    createContact: builder.mutation<Contact, ContactFormData>({
      query: (contact: ContactFormData) => ({
        url: "/users",
        method: "POST",
        body: contact,
      }),
      transformResponse: (response: ContactApiResponse): Contact => ({
        id: response.id.toString(),
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        role: response.role,
        gender: response.gender,
        isActive: response.isActive,
        newsletter: response.newsletter,
        birthDate: response.birthDate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
      invalidatesTags: ["contact"],
    }),
    updateContact: builder.mutation<Contact, ContactFormDataWithId>({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: ContactApiResponse): Contact => ({
        id: response.id.toString(),
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        role: response.role,
        gender: response.gender,
        isActive: response.isActive,
        newsletter: response.newsletter,

        birthDate: response.birthDate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),

      invalidatesTags: ["contact"],
    }),
    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactsApi;

import { configureStore } from "@reduxjs/toolkit";
import { contactsApi } from "../services/api/contacts";

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});



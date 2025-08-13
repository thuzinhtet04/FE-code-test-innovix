import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import Select from "react-select";
import type { Contact, ContactFormData } from "../types/contacts";
import "react-datepicker/dist/react-datepicker.css";
import z from "zod";
import { useEffect } from "react";
import Loading from "./Loading";

interface ContactFormProps {
  contact?: Contact;
  onSubmit: (data: ContactFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const roleOptions = [
  { value: "Admin", label: "Admin" },
  { value: "User", label: "User" },
  { value: "Viewer", label: "Viewer" },
];

export function ContactForm({
  contact,
  onSubmit,
  onCancel,
  isLoading = false,
}: ContactFormProps) {
  const contactSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    role: z.enum(["Admin", "User", "Viewer"], {
      message: "Please select a role",
    }),
    gender: z.enum(["Male", "Female", "Other"], {
      message: "Please select a gender",
    }),
    isActive: z.boolean(),
    newsletter: z.boolean(),
    birthDate: z.date({
      message: "Birth date is required",
    }),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const SampleContact: ContactFormData = {
    firstName: "",
    lastName: "",
    email: "",
    role: "User",
    gender: "Male",
    isActive: true,
    newsletter: true,
    birthDate: new Date(),
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: SampleContact,
  });
  useEffect(() => {
    if (contact) {
      reset({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        role: contact.role,
        gender: contact.gender,
        isActive: contact.isActive,
        newsletter: contact.newsletter ?? false,
        birthDate: new Date(contact.birthDate),
      });
    }
  }, [reset, contact]);

  const handleFormSubmit = (data: ContactFormData) => {
   
    onSubmit(data);
    reset(SampleContact);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div>
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First name <span className="text-red-500">*</span>
              </label>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="firstName"
                    aria-describedby={
                      errors.firstName ? "firstName-error" : undefined
                    }
                    className={`bg-gray-50 border ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark: dark:`}
                    placeholder="Enter first name"
                  />
                )}
              />
            </div>

            {errors.firstName && (
              <p
                id="firstName-error"
                className="text-sm text-red-500"
                role="alert"
              >
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Name <span className="text-red-500">*</span>
            </label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="lastName"
                  aria-describedby={
                    errors.lastName ? "lastName-error" : undefined
                  }
                  className={`bg-gray-50 border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark: dark:`}
                  placeholder="Enter first name"
                />
              )}
            />
            {errors.lastName && (
              <p
                id="lastName-error"
                className="text-sm text-red-500"
                role="alert"
              >
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="email"
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`bg-gray-50 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark: dark:`}
                placeholder="Enter first name"
              />
            )}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-red-500" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Role Select */}
        <div className="space-y-2">
          <label
            htmlFor="role"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Role <span className="text-red-500">*</span>
          </label>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={roleOptions}
                value={roleOptions.find(
                  (option) => option.value === field.value
                )}
                onChange={(option) => field.onChange(option?.value)}
                placeholder="Select a role"
                className={errors.role ? "react-select-error" : ""}
                classNamePrefix="react-select"
                aria-describedby={errors.role ? "role-error" : undefined}
              />
            )}
          />
          {errors.role && (
            <p id="role-error" className="text-sm text-red-500" role="alert">
              {errors.role.message}
            </p>
          )}
        </div>

        {/* Gender */}
        <div className="space-y-3">
          <label
            htmlFor=""
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Gender <span className="text-red-500">*</span>
          </label>

          <div className=" flex gap-2 items-center ">
            <div className="flex items-center ">
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="male"
                    type="radio"
                    value="Male"
                    checked={field.value == "Male"}
                    name="gender"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300     dark:bg-gray-700 dark:border-gray-600"
                  />
                )}
              />

              <label
                htmlFor="male"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Male
              </label>
            </div>
            <div className="flex items-center">
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="female"
                    type="radio"
                    value="Female"
                    name="gender"
                    checked={field.value === "Female"}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300     dark:bg-gray-700 dark:border-gray-600"
                  />
                )}
              />
              <label
                htmlFor="female"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Female
              </label>
            </div>

            <div className="flex items-center">
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="other"
                    type="radio"
                    value="Other"
                    name="gender"
                    checked={field.value === "Other"}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300     dark:bg-gray-700 dark:border-gray-600"
                  />
                )}
              />
              <label
                htmlFor="other"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Other
              </label>
            </div>
          </div>

          {errors.gender && (
            <p id="gender-error" className="text-sm text-red-500" role="alert">
              {errors.gender.message}
            </p>
          )}
        </div>

        {/* Birthday */}
        <div className="space-y-2">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="birthDate"
          >
            Birth Date <span className="text-red-500">*</span>
          </label>
          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                dateFormat="MM/dd/yyyy"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                maxDate={new Date()}
                placeholderText="Select birth date"
                className={`w-full px-3 py-2 text-white border rounded-md ${
                  errors.birthDate ? "border-red-500" : "border-gray-300"
                }`}
                aria-describedby={
                  errors.birthDate ? "birthDate-error" : undefined
                }
              />
            )}
          />
          {errors.birthDate && (
            <p
              id="birthDate-error"
              className="text-sm text-red-500"
              role="alert"
            >
              {errors.birthDate.message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <div className="flex items-center">
                  <input
                    id="isActive"
                    type="checkbox"
                    onChange={field.onChange}
                    checked={field.value}
                    aria-checked={field.value === true ? true : false}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm     dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="isActive"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Is Active
                  </label>
                </div>
              )}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Controller
              name="newsletter"
              control={control}
              render={({ field }) => (
                <input
                  id="newsletter"
                  type="checkbox"
                  onChange={field.onChange}
                  checked={field.value}
                  aria-checked={field.value === true ? true : false}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm     dark:bg-gray-700 dark:border-gray-600"
                />
              )}
            />
            <label
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="newsletter"
            >
              Subscribe to Newsletter
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none focus-visible:border-2 focus-visible:border-black  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => {
              onCancel();
              reset();
            }}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none focus-visible:border-2 focus-visible:border-black bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            {isLoading ? (
              <div>
                <Loading />
                Saving
              </div>
            ) : contact ? (
              "Update Contact"
            ) : (
              "Create Contact"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

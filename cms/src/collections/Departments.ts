import type { CollectionConfig } from "payload";
import { validateSlug } from "../fields/validation";

export const Departments: CollectionConfig = {
  slug: "departments",
  labels: {
    singular: "Department",
    plural: "Departments",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "order", "updatedAt"],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  defaultSort: "order",
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true, validate: validateSlug },
    { name: "description", type: "textarea", required: true },
    { name: "order", type: "number", defaultValue: 99 },
    { name: "icon", type: "text" },
    {
      name: "responsibilities",
      type: "json",
      admin: {
        description: "List of strings shown in the detail sidebar.",
      },
    },
    {
      name: "content",
      type: "textarea",
      admin: { description: "Markdown body of the department page." },
    },
  ],
};

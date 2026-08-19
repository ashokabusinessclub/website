import type { CollectionConfig } from "payload";

export const Sponsors: CollectionConfig = {
  slug: "sponsors",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "year", "order", "updatedAt"],
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
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "logo", type: "text" },
    { name: "description", type: "textarea" },
    { name: "website", type: "text" },
    { name: "year", type: "text" },
    { name: "order", type: "number", defaultValue: 99 },
    {
      name: "content",
      type: "textarea",
      admin: { description: "Optional markdown body." },
    },
  ],
};
import type { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "category", "featured", "updatedAt"],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  defaultSort: "-date",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "date", type: "date", required: true },
    { name: "category", type: "text" },
    { name: "cover", type: "text" },
    { name: "location", type: "text" },
    { name: "description", type: "textarea" },
    { name: "featured", type: "checkbox", defaultValue: false },
    { name: "applyUrl", type: "text" },
    {
      name: "content",
      type: "textarea",
      admin: { description: "Markdown body of the event page." },
    },
  ],
};
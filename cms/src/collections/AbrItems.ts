import type { CollectionConfig } from "payload";

export const AbrItems: CollectionConfig = {
  slug: "abr-items",
  labels: {
    singular: "Ashoka Business Review Article",
    plural: "Ashoka Business Review",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type", "date", "author", "updatedAt"],
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
    { name: "author", type: "text" },
    { name: "type", type: "text", defaultValue: "Publication" },
    { name: "cover", type: "text" },
    {
      name: "tags",
      type: "json",
      admin: { description: "List of tag strings." },
    },
    { name: "excerpt", type: "textarea" },
    {
      name: "content",
      type: "textarea",
      admin: { description: "Markdown body of the article." },
    },
  ],
};
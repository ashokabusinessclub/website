import type { CollectionConfig } from "payload";
import { validateSlug } from "../fields/validation";

export const NibblMenu: CollectionConfig = {
  slug: "nibbl-menu",
  labels: {
    singular: "Menu Item",
    plural: "nibbl. Menu",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "price", "available", "order", "updatedAt"],
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
    {
      name: "category",
      type: "select",
      required: true,
      defaultValue: "Nostalgic Classics",
      options: [
        { label: "Nostalgic Classics", value: "Nostalgic Classics" },
        { label: "Signature Pop-Up Specials", value: "Signature Pop-Up Specials" },
        { label: "2025 Upcoming Menu", value: "2025 Upcoming Menu" },
        { label: "Menu archive", value: "Menu archive" },
      ],
    },
    { name: "note", type: "textarea", admin: { description: "Short description or flavor notes." } },
    { name: "price", type: "text", admin: { description: "Optional price (e.g. ₹120)." } },
    { name: "tag", type: "text", admin: { description: "Optional category/badge tag (e.g. Campus Favourite, 14 New SKUs)." } },
    { name: "available", type: "checkbox", defaultValue: true },
    { name: "order", type: "number", defaultValue: 99 },
    {
      name: "content",
      type: "textarea",
      admin: { description: "Optional markdown description or recipe notes." },
    },
  ],
};

import type { CollectionConfig } from "payload";
import { validateHttpsUrl, validateImageReference, validateSlug } from "../fields/validation";

export const Sponsors: CollectionConfig = {
  slug: "sponsors",
  labels: {
    singular: "Sponsor / Partner",
    plural: "Sponsors & Partners",
  },
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
    { name: "slug", type: "text", required: true, unique: true, index: true, validate: validateSlug },
    {
      name: "logoImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Upload primary logo (used for light mode or universal display).",
      },
    },
    {
      name: "logoDarkImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Upload optional dark mode logo (if different from light mode).",
      },
    },
    {
      name: "logo",
      type: "text",
      validate: validateImageReference,
      admin: {
        description: "Direct URL or static fallback path (e.g. /uploads/sponsors/xyz.svg). Used if no logo image is uploaded.",
      },
    },
    {
      name: "logoDark",
      type: "text",
      validate: validateImageReference,
      admin: {
        description: "Direct URL or static fallback path for dark mode.",
      },
    },
    { name: "description", type: "textarea" },
    { name: "website", type: "text", validate: validateHttpsUrl },
    { name: "year", type: "text" },
    { name: "order", type: "number", defaultValue: 99 },
    {
      name: "content",
      type: "textarea",
      admin: { description: "Optional markdown body." },
    },
  ],
};

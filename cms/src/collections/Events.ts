import type { CollectionConfig } from "payload";
import { validateHttpsUrl, validateImageReference, validateSlug } from "../fields/validation";

export const Events: CollectionConfig = {
  slug: "events",
  labels: {
    singular: "Event",
    plural: "Events & Calendar",
  },
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
    { name: "slug", type: "text", required: true, unique: true, index: true, validate: validateSlug },
    { name: "date", type: "date", required: true },
    { name: "category", type: "text" },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Upload event cover image (preferred).",
      },
    },
    {
      name: "cover",
      type: "text",
      validate: validateImageReference,
      admin: {
        description: "Or provide an external/fallback image URL or path.",
      },
    },
    { name: "location", type: "text" },
    { name: "description", type: "textarea" },
    { name: "featured", type: "checkbox", defaultValue: false },
    { name: "applyUrl", type: "text", validate: validateHttpsUrl },
    {
      name: "content",
      type: "textarea",
      admin: { description: "Markdown body of the event page." },
    },
  ],
};

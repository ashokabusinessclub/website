import type { CollectionConfig } from "payload";

export const AbrItems: CollectionConfig = {
  slug: "abr-items",
  labels: {
    singular: "ABR Article",
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
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Upload cover image for this article (preferred).",
      },
    },
    {
      name: "cover",
      type: "text",
      admin: {
        description: "Or provide an external/fallback image URL or path.",
      },
    },
    {
      name: "images",
      type: "array",
      labels: {
        singular: "Article Image",
        plural: "Article Images / Gallery",
      },
      admin: {
        description:
          "Upload images to include in this article. You can also embed them directly inside the Markdown content using ![Caption](/api/media/file/filename.ext) or the image URL.",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "caption",
          type: "text",
          admin: { description: "Optional caption shown under the image." },
        },
        {
          name: "alt",
          type: "text",
          admin: { description: "Accessibility alt text." },
        },
      ],
    },
    {
      name: "tags",
      type: "json",
      admin: { description: "List of tag strings (e.g. [\"Finance\", \"Tech\"])." },
    },
    { name: "excerpt", type: "textarea" },
    {
      name: "content",
      type: "textarea",
      admin: {
        description:
          "Markdown body of the article. Embed images using markdown: ![Alt Text](/api/media/file/filename.ext) or full URL.",
      },
    },
  ],
};
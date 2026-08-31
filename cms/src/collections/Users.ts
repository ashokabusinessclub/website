import type { CollectionConfig } from "payload";
import { adminOnly, adminOnlyField, adminOrSelf } from "../access/users";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: "User",
    plural: "Admin Users",
  },
  auth: true,
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "role", "updatedAt"],
  },
  access: {
    read: adminOrSelf,
    create: adminOnly,
    update: adminOrSelf,
    delete: adminOnly,
  },
  fields: [
    {
      name: "role",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      defaultValue: "editor",
      access: {
        create: adminOnlyField,
        read: adminOnlyField,
        update: adminOnlyField,
      },
    },
  ],
};

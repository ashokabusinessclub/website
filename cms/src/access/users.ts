import type { Access, FieldAccess } from "payload";

type CmsUser = {
  collection: "users";
  id: number | string;
  role?: "admin" | "editor" | null;
};

function currentUser(req: Parameters<Access>[0]["req"]): CmsUser | null {
  return (req.user as CmsUser | null | undefined) ?? null;
}

export const isAdmin = (req: Parameters<Access>[0]["req"]): boolean => {
  const user = currentUser(req);
  return user?.collection === "users" && user.role === "admin";
};

export const adminOnly: Access = ({ req }) => isAdmin(req);

export const adminOrSelf: Access = ({ req }) => {
  const user = currentUser(req);
  if (!user || user.collection !== "users") return false;
  if (user.role === "admin") return true;

  return {
    id: {
      equals: user.id,
    },
  };
};

export const adminOnlyField: FieldAccess = ({ req }) => isAdmin(req);

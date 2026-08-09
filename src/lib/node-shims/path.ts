export const extname = (p: string) => {
  const i = p.lastIndexOf(".");
  return i < 0 ? "" : p.slice(i);
};
export const basename = (p: string) => p.split("/").pop() ?? "";
export const dirname = (p: string) => p.split("/").slice(0, -1).join("/");
export const join = (...parts: string[]) => parts.join("/");
export const resolve = (...parts: string[]) => parts.join("/");
export default { extname, basename, dirname, join, resolve };

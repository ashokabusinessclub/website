export const readFileSync = () => "";
export const existsSync = () => false;
export const statSync = () => ({ isFile: () => false });
export default { readFileSync, existsSync, statSync };

import { iPermission } from "./permissions.interface";

declare global {
  namespace Express {
    interface Request {
      userId: number | undefined;
      permissions: iPermission[];
    }
  }
}

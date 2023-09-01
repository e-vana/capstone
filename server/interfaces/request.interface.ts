import { iPermission } from "./permissions.interface";

declare global {
  namespace Express {
    interface Request {
      userId: string | undefined;
      permissions: iPermission[];
    }
  }
}

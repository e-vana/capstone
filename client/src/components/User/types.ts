import { FunctionComponent } from "react";
import { iUser } from "../../interfaces/user.interface";

interface UserCardProps {
  user: Omit<iUser, "password">;
}

export type UserCardComponent = FunctionComponent<UserCardProps>;

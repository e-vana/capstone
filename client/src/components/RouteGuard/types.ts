import { FunctionComponent } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export type AuthGuardComponent = FunctionComponent<AuthGuardProps>;

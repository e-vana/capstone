import { FunctionComponent } from "react";

interface ErrorMessageProps {
  code: number;
  message: string;
}

export type ErrorMessageComponent = FunctionComponent<ErrorMessageProps>;

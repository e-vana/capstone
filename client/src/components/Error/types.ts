import { StackProps } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface ErrorMessageProps extends StackProps {
  code: number;
  message: string;
}

export type ErrorMessageComponent = FunctionComponent<ErrorMessageProps>;

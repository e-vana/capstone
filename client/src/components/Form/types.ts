import { ButtonProps } from "@chakra-ui/react";
import { FunctionComponent, ReactNode } from "react";

interface MultiStepFormProps {
  children: ReactNode;
}

interface MultiStepProgressProps {
  progress: number;
}

interface MultiStepButtonProps extends ButtonProps {}

export type MultiStepFormComponent = FunctionComponent<MultiStepFormProps>;
export type MultiStepProgressComponent =
  FunctionComponent<MultiStepProgressProps>;
export type MultiStepButtonComponent = FunctionComponent<MultiStepButtonProps>;

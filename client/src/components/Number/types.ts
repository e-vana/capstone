import { InputProps } from "@chakra-ui/react";
import { Dispatch, FunctionComponent, SetStateAction } from "react";

interface NumberWheelProps extends InputProps {
  getter: number;
  setter: Dispatch<SetStateAction<number>>;
}

export type NumberWheelComponent = FunctionComponent<NumberWheelProps>;

import { BoxProps, StackProps } from "@chakra-ui/react";
import { FunctionComponent } from "react";

export interface iTab {
  route: string;
  icon: () => React.ReactNode;
}

interface TabProps {
  item: iTab;
}

interface ToolBarProps extends StackProps {}

export type TabComponent = FunctionComponent<TabProps>;
export type ToolBarComponent = FunctionComponent<ToolBarProps>;

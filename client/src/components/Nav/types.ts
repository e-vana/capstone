import { FunctionComponent } from "react";

export interface iTab {
  route: string;
  icon: () => React.ReactNode;
}

interface TabProps {
  item: iTab;
}

export type TabComponent = FunctionComponent<TabProps>;

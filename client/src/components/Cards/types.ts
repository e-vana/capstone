import { FunctionComponent, ReactNode } from "react";

interface TitleCardProps {
  children: ReactNode;
}

interface TitleCardHeaderProps {
  children: ReactNode;
  isLoading: boolean;
}

interface TitleCardFooterProps {
  children: ReactNode;
}

export type TitleCardComponent = FunctionComponent<TitleCardProps>;
export type TitleCardHeaderComponent = FunctionComponent<TitleCardHeaderProps>;
export type TitleCardFooterComponent = FunctionComponent<TitleCardFooterProps>;

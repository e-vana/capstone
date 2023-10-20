import { FunctionComponent } from "react";

interface MemberListProps {
  members: {
    name: string;
  }[];
}

export type MemberListComponent = FunctionComponent<MemberListProps>;

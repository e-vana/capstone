import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { iExpenseJoinEventJoinTeamJoinOrgJoinUser } from "../../interfaces/expenses.interface";
import { StackProps } from "@chakra-ui/react";

interface ExpenseTableProps {
  expenses: iExpenseJoinEventJoinTeamJoinOrgJoinUser[] | undefined;
}

interface ExpenseTableRowProps {
  expense: iExpenseJoinEventJoinTeamJoinOrgJoinUser;
}

interface ExpenseCardsProps {
  expenses: iExpenseJoinEventJoinTeamJoinOrgJoinUser[] | undefined;
}

interface ExpenseCardProps {
  expense: iExpenseJoinEventJoinTeamJoinOrgJoinUser;
}

interface ExpenseFilterProps {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

interface ExpenseTotalProps extends StackProps {
  children: React.ReactNode;
}

interface ExpenseModalProps {
  onClose: () => void;
  isOpen: boolean;
  expense: iExpenseJoinEventJoinTeamJoinOrgJoinUser;
}

export type ExpenseTableComponent = FunctionComponent<ExpenseTableProps>;
export type ExpenseTableRowComponent = FunctionComponent<ExpenseTableRowProps>;
export type ExpenseCardsComponent = FunctionComponent<ExpenseCardsProps>;
export type ExpenseCardComponent = FunctionComponent<ExpenseCardProps>;
export type ExpenseFilterComponent = FunctionComponent<ExpenseFilterProps>;
export type ExpenseTotalComponent = FunctionComponent<ExpenseTotalProps>;
export type ExpenseModalComponent = FunctionComponent<ExpenseModalProps>;

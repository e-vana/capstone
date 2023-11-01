import ExpenseCard from "./ExpenseCard";
import { ExpenseCardsComponent } from "./types";

const ExpenseCards: ExpenseCardsComponent = ({ expenses }) => {
  return expenses?.map((expense) => <ExpenseCard expense={expense} />);
};

export default ExpenseCards;

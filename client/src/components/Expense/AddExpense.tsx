import { ReactNode, useState } from "react";
import { useToast, Flex } from "@chakra-ui/react";
import { MultiPartFormButton } from "../Form/MultiStepButtons";
import { AddExpenseComponent, iDetails, iOrgFormData } from "./types";
import TileModal from "../Tile/TileModal";
import MultiStepForm from "../Form/MultiStepForm";
import NumberWheel from "../Number/NumberWheel";
import ExpenseAmount from "./ExpenseAmount";
import ExpenseOrg from "./ExpenseOrg";
import ExpenseDetails from "./ExpenseDetails";
import MultiStepProgress from "../Form/MultiStepProgress";
import { DEFAULT_AMOUNT, DEFAULT_DATA, DEFAULT_DETAILS } from "./utils";
import { useMutation } from "react-query";
import { iCreateExpense } from "../../interfaces/expenses.interface";
import { createExpenseForAnEvent } from "../../api/expenses.api";

const AddExpense: AddExpenseComponent = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [step, setStep] = useState<number>(1);
  const [progress, setProgress] = useState<number>(33.33);
  const [amount, setAmount] = useState<number>(DEFAULT_AMOUNT);
  const [orgData, setOrgData] = useState<iOrgFormData>(DEFAULT_DATA);
  const [details, setDetails] = useState<iDetails>(DEFAULT_DETAILS);

  const mutation = useMutation((data: iCreateExpense) => {
    return createExpenseForAnEvent(
      orgData.orgID,
      orgData?.teamID!, //eslint-disable-line
      orgData?.eventID!, //eslint-disable-line
      data
    );
  });

  const validateFormData = (
    amount: number,
    data: iOrgFormData,
    details: iDetails
  ): string[] => {
    const errors: string[] = [];

    if (!amount || amount === DEFAULT_AMOUNT) errors.push("Amount is required");
    if (!data.orgID) errors.push("Organization is Required");
    if (!data.teamID) errors.push("Team is Required");
    if (!data.eventID) errors.push("Event is Required");
    if (!details.name) errors.push("Name of Expense is Required");
    if (!details.description) errors.push("Description of Expense is Required");
    if (!details.type) errors.push("Type of Expense is Required");
    if (!details.url) errors.push("Image of Receipt is Required");

    return errors;
  };

  const handleSubmit = () => {
    if (orgData.teamID && orgData.eventID) {
      mutation.mutate({
        amount: amount,
        description: details.description,
        expense_name: details.name,
        expense_type: details.type,
        receipt_url: details.url,
      });
      console.log("Submitted data: ", {
        amount,
        details,
        orgData,
      });
      onClose();
      setAmount(0.0);
      setOrgData({ orgID: -1, teamID: undefined, eventID: undefined });
      setProgress(33.33);
    }
  };

  if (mutation.isSuccess) {
    toast({
      status: "success",
      title: "Successfully added expense!",
    });
    mutation.reset();
  }

  if (mutation.status === "error") {
    toast({
      status: "error",
      title: "Error adding expense, please try again",
    });
    mutation.reset();
  }

  const handleStepForward = () => {
    setStep(step + 1);
    if (step === 3) {
      setProgress(100);
    } else {
      setProgress(progress + 33.33);
    }
  };

  const handleStepBackward = () => {
    setStep(step - 1);
    setProgress(progress - 33.33);
  };

  const FormRender: { [key: number]: ReactNode } = {
    1: (
      <ExpenseAmount>
        <NumberWheel getter={amount} setter={setAmount} />
      </ExpenseAmount>
    ),
    2: <ExpenseDetails details={details} setDetails={setDetails} />,
    3: <ExpenseOrg data={orgData} setData={setOrgData} />,
  };

  return (
    <TileModal isOpen={isOpen} onClose={onClose}>
      <MultiStepForm>
        {FormRender[step]}

        <Flex
          width={"100%"}
          justifyContent={"space-between"}
          height={"100%"}
          gap={5}
        >
          <Flex width={"100%"} gap={5}>
            <MultiPartFormButton
              isDisabled={step <= 1}
              onClick={handleStepBackward}
            >
              Back
            </MultiPartFormButton>
            <MultiPartFormButton
              onClick={handleStepForward}
              isDisabled={step >= 3}
            >
              Next
            </MultiPartFormButton>
          </Flex>
          {step == 3 && (
            <MultiPartFormButton
              onClick={handleSubmit}
              isDisabled={validateFormData(amount, orgData, details).length > 0}
            >
              Submit
            </MultiPartFormButton>
          )}
        </Flex>
      </MultiStepForm>
      <MultiStepProgress progress={progress} />
    </TileModal>
  );
};

export default AddExpense;

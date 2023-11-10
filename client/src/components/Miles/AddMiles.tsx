import { Flex, Stack, useToast } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { useMutation } from "react-query";
import { createMilesForAnEvent } from "../../api/miles.api";
import { MultiPartFormButton } from "../Form/MultiStepButtons";
import { AddMileageComponent } from "./types";
import { iCreateMiles } from "../../interfaces/miles.interface";
import { iOrgFormData } from "../Expense/types";
import { DEFAULT_DATA } from "../Expense/utils";
import TileModal from "../Tile/TileModal";
import MultiStepForm from "../Form/MultiStepForm";
import MileageForm from "./MileageForm";
import ExpenseOrg from "../Expense/ExpenseOrg";
import MultiStepProgress from "../Form/MultiStepProgress";

const DEFAULT_MILEAGE: iCreateMiles = {
  mileage: 0,
  date_traveled: "",
};

const AddMiles: AddMileageComponent = ({ isOpen, onClose }) => {
  const [mileage, setMileage] = useState<iCreateMiles>(DEFAULT_MILEAGE);
  const [data, setData] = useState<iOrgFormData>(DEFAULT_DATA);
  const [step, setStep] = useState<number>(1);
  const [progress, setProgress] = useState<number>(45);

  const toast = useToast();

  const isDisabled =
    mileage.mileage === DEFAULT_MILEAGE.mileage ||
    mileage.date_traveled === DEFAULT_MILEAGE.date_traveled;

  const addMilesQuery = useMutation((milesData: iCreateMiles) => {
    return createMilesForAnEvent(
      data.orgID,
      data?.teamID!, //eslint-disable-line
      data?.eventID!, //eslint-disable-line
      milesData
    );
  });

  const handleStepForward = () => {
    setStep(step + 1);
    if (step === 2) {
      setProgress(100);
    } else {
      setProgress(progress + 45);
    }
  };

  const handleStepBackward = () => {
    setStep(step - 1);
    setProgress(progress - 45);
  };

  const handleSubmit = () => {
    if (data.orgID && data.teamID) {
      addMilesQuery.mutate(mileage);
      console.log("Submitted data: ", {
        data,
        mileage,
      });
      onClose();
      setMileage(DEFAULT_MILEAGE);
      setData(DEFAULT_DATA);
      setProgress(45);
    }
  };

  if (addMilesQuery.isSuccess) {
    toast({
      status: "success",
      title: "Added Miles!",
    });
    addMilesQuery.reset();
  }

  if (addMilesQuery.status === "error") {
    toast({
      status: "error",
      title: "Error posting miles, please try again",
    });
    addMilesQuery.reset();
  }

  const FormRender: { [key: number]: ReactNode } = {
    1: <MileageForm mileage={mileage} setMileage={setMileage} />,
    2: <ExpenseOrg data={data} setData={setData} />,
  };

  return (
    <TileModal isOpen={isOpen} onClose={onClose}>
      <MultiStepForm>
        <Stack gap={5}>
          {FormRender[step]}
          <Flex
            width={"100%"}
            justifyContent={"space-between"}
            height={"100%"}
            gap={5}
          >
            <Flex width={"100%"} gap={5}>
              <MultiPartFormButton
                onClick={handleStepBackward}
                isDisabled={step <= 1}
              >
                Back
              </MultiPartFormButton>
              <MultiPartFormButton
                onClick={handleStepForward}
                isDisabled={step >= 2}
              >
                Next
              </MultiPartFormButton>
            </Flex>
            {step === 2 && (
              <MultiPartFormButton
                onClick={handleSubmit}
                isDisabled={isDisabled}
              >
                Submit
              </MultiPartFormButton>
            )}
          </Flex>
        </Stack>
      </MultiStepForm>
      <MultiStepProgress progress={progress} />
    </TileModal>
  );
};

export default AddMiles;

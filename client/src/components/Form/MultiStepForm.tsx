import { Stack } from "@chakra-ui/react";
import { MultiStepFormComponent } from "./types";

const MultiStepForm: MultiStepFormComponent = ({ children }) => {
  return (
    <>
      <Stack
        minH={{ base: "90vh", md: "500px" }}
        justifyContent={"space-between"}
        py={6}
      >
        {children}
      </Stack>
    </>
  );
};

export default MultiStepForm;

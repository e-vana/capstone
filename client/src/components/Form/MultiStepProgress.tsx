import { Progress } from "@chakra-ui/react";
import { MultiStepProgressComponent } from "./types";

const MultiStepProgress: MultiStepProgressComponent = ({ progress }) => {
  return (
    <Progress
      hasStripe
      value={progress}
      isAnimated
      colorScheme="purple"
      rounded={"full"}
      size={"sm"}
      my={5}
    />
  );
};

export default MultiStepProgress;

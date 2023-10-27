import { Button } from "@chakra-ui/react";
import { MultiStepButtonComponent } from "./types";

export const MultiPartFormButton: MultiStepButtonComponent = ({
  children,
  ...rest
}) => {
  return (
    <Button
      colorScheme="purple"
      variant={"solid"}
      rounded={"full"}
      width={"100%"}
      {...rest}
    >
      {children}
    </Button>
  );
};

import { Stack } from "@chakra-ui/react";
import { OrganizationContainerComponent } from "./types";

const OrganizationContainer: OrganizationContainerComponent = ({
  children,
}) => {
  return (
    <Stack flex={1} justify={"start"} width={"100%"}>
      {children}
    </Stack>
  );
};

export default OrganizationContainer;

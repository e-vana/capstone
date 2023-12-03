import { Heading, Stack } from "@chakra-ui/react";
import { MilesTotalComponent } from "./types";

const MilesTotal: MilesTotalComponent = ({ children, ...rest }) => {
  return (
    <Stack width={"100%"} height={"100%"}>
      <Heading size={"sm"}>Total Mileage:</Heading>
      <Stack width={"100%"} rounded={"lg"} overflowX={"hidden"} {...rest}>
        {children}
      </Stack>
    </Stack>
  );
};

export default MilesTotal;

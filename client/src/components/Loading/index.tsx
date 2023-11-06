import { Spinner, Stack } from "@chakra-ui/react";

export const LoadingComponent = () => {
  return (
    <Stack
      w={"100%"}
      p={4}
      flex={1}
      justify={"center"}
      align={"center"}
      height={"100%"}
    >
      <Spinner color={"purple.400"} size={"xl"} />
    </Stack>
  );
};

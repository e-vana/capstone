import { Spinner, Stack } from "@chakra-ui/react";

export const LoadingComponent = () => {
  return (
    <Stack w={"100%"} p={4} flex={1} justify={"center"}>
      <Spinner color={"purple.500"} size={"xl"} />
    </Stack>
  );
};

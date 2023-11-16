import { Img, Spinner, Stack } from "@chakra-ui/react";

export const LoadingComponent = () => {
  return (
    <Stack
      w={"100%"}
      p={5}
      flex={1}
      justify={"end"}
      align={"center"}
      height={"100%"}
      position={"relative"}
    >
      <Stack
        height={"55%"}
        justify={"space-between"}
        align={"center"}
        padding={5}
      >
        <Spinner color={"purple.400"} size={"xl"} />
        <Img src="villagehoursbrand.png" width={"200px"} alignSelf={"center"} />
      </Stack>
    </Stack>
  );
};

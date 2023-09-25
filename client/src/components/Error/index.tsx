import { Button, Heading, Img, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ErrorMessageComponent } from "./types";

const ErrorMessage: ErrorMessageComponent = ({ code, message, ...rest }) => {
  return (
    <Stack align={"center"} {...rest}>
      <Heading size={"2xl"}>{code}</Heading>
      <Text fontSize={"xl"}>{message}</Text>
    </Stack>
  );
};

export const ErrorPage: ErrorMessageComponent = ({
  code,
  message,
  ...rest
}) => {
  return (
    <Stack
      {...rest}
      align={"center"}
      justify={"center"}
      gap={5}
      height={"100vh"}
      flex={1}
    >
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, purple.400, purple.600)"
        backgroundClip="text"
      >
        {code}
      </Heading>
      <Text>{message}</Text>
      <Img src={"/not-found.png"} width={"600px"} alignSelf={"center"} />
      <Button
        as={RouterLink}
        to={"/d"}
        colorScheme="purple"
        bgGradient="linear(to-r, purple.400, purple.500, purple.600)"
        color="white"
        variant="solid"
      >
        Go Home
      </Button>
    </Stack>
  );
};

export default ErrorMessage;

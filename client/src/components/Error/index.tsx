import { Heading, Stack, Text } from "@chakra-ui/react";
import { ErrorMessageComponent } from "./types";

const ErrorMessage: ErrorMessageComponent = ({ code, message, ...rest }) => {
  return (
    <Stack align={"center"} {...rest}>
      <Heading size={"2xl"}>{code}</Heading>
      <Text fontSize={"xl"}>{message}</Text>
    </Stack>
  );
};

export default ErrorMessage;

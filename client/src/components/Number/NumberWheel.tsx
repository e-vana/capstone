import {
  Flex,
  Input,
  Stack,
  Heading,
  useNumberInput,
  useColorModeValue,
} from "@chakra-ui/react";
import { NumberWheelComponent } from "./types";

export const NumberWheel: NumberWheelComponent = ({ getter, setter }) => {
  const handleChange = (num: string) => {
    setter(+num);
  };

  const { getInputProps } = useNumberInput({
    step: 1.0,
    defaultValue: getter,
    precision: 2,
    format: (val) => "$" + val,
    onChange: handleChange,
  });

  const input = getInputProps();

  return (
    <Stack flex={1} width={"100%"} alignItems={"center"}>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        background={useColorModeValue("gray.100", "whiteAlpha.400")}
        height={"250px"}
        rounded={"md"}
      >
        <Heading
          as={Input}
          width={"fit-content"}
          fontSize={"6xl"}
          type="number"
          background={"none"}
          border={"none"}
          justifyContent={"center"}
          textAlign={"center"}
          inputMode="numeric"
          height={"100%"}
          _focus={{
            boxShadow: "none",
            border: "none",
          }}
          {...input}
        />
      </Flex>
    </Stack>
  );
};

export default NumberWheel;

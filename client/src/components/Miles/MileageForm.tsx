import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
} from "@chakra-ui/react";
import { FaCar } from "react-icons/fa";
import { MileageFormComponent } from "./types";
import { CalendarIcon } from "@chakra-ui/icons";

const MileageForm: MileageFormComponent = ({ mileage, setMileage }) => {
  const handleAddMiles = (miles: number) => {
    setMileage({
      ...mileage,
      mileage: miles,
    });
  };

  const handleAddDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMileage({
      ...mileage,
      date_traveled: e.currentTarget.value,
    });
  };

  return (
    <Stack gap={5}>
      <Heading size={"md"}>Add Miles</Heading>
      <Flex direction={"column"} gap={3}>
        <FormControl isRequired>
          <FormLabel>Miles Traveled:</FormLabel>
          <InputGroup>
            <InputLeftAddon>
              <Icon as={FaCar} />
            </InputLeftAddon>
            <NumberInput
              placeholder="0.0"
              defaultValue={0.0}
              precision={2}
              step={0.5}
              min={0.1}
              value={mileage.mileage}
              onChange={(num) => handleAddMiles(+num)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Date:</FormLabel>
          <InputGroup>
            <InputLeftAddon>
              <Icon as={CalendarIcon} />
            </InputLeftAddon>
            <Input
              type="datetime-local"
              value={mileage.date_traveled}
              onChange={handleAddDate}
            />
          </InputGroup>
        </FormControl>
      </Flex>
    </Stack>
  );
};

export default MileageForm;

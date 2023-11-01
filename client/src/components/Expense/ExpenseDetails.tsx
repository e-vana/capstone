import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  Select,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { DetailsFormComponent } from "./types";
import { useRef } from "react";
import { BsUpload } from "react-icons/bs";
import { CheckIcon } from "@chakra-ui/icons";

const ExpenseDetails: DetailsFormComponent = ({ details, setDetails }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAddName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({
      ...details,
      name: e.currentTarget.value,
    });
  };

  const handleAddDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetails({
      ...details,
      description: e.currentTarget.value,
    });
  };

  const handleAddType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDetails({
      ...details,
      type: e.currentTarget.value,
    });
  };

  const handleClick = () => inputRef.current?.click();

  const handleAddURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDetails({
        ...details,
        url: file.name,
      });
    }
  };

  return (
    <Stack>
      <Heading size={"md"}>Expense Details</Heading>
      <Flex direction={"column"} gap={3}>
        <FormControl isRequired>
          <FormLabel>For:</FormLabel>
          <Input type="text" value={details.name} onChange={handleAddName} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Description:</FormLabel>
          <Textarea
            value={details.description}
            onChange={handleAddDescription}
          />
        </FormControl>
        <Flex gap={5}>
          <FormControl isRequired>
            <FormLabel>Type of Expense</FormLabel>
            <Select value={details.type} onChange={handleAddType}>
              <option value={"Other"} defaultChecked>
                Other
              </option>
              <option value={"Food"}>Food</option>
              <option value={"Clothing"}>Clothing</option>
              <option value={"Materials"}>Materials</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Reciept</FormLabel>
            <InputGroup
              aria-label="upload-receipt"
              onClick={handleClick}
              width={"100%"}
              height={"100px"}
              border={"1px dashed"}
              borderColor={"purple.400"}
              bgColor={useColorModeValue("white", "#151515")}
              cursor={"pointer"}
              rounded={"md"}
              transition={".1s ease-in"}
              _hover={{
                bgColor: useColorModeValue("gray.50", "#252525"),
              }}
            >
              <Stack
                width={"100%"}
                height={"100%"}
                align={"center"}
                justify={"center"}
              >
                {details.url ? (
                  <Icon as={CheckIcon} color={"green"} boxSize={6} />
                ) : (
                  <Icon as={BsUpload} boxSize={6} color={"purple.400"} />
                )}

                {details.url ? (
                  <Text fontSize={"sm"}>{details.url}</Text>
                ) : (
                  <Text fontSize={"sm"}>Upload</Text>
                )}
              </Stack>
              <Input
                type="file"
                onChange={handleAddURL}
                hidden
                ref={inputRef}
              />
            </InputGroup>
          </FormControl>
        </Flex>
      </Flex>
    </Stack>
  );
};

export default ExpenseDetails;

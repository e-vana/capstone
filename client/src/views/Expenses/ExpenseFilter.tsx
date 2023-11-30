import {
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { ExpenseFilterComponent } from "./types";

const ExpenseFilter: ExpenseFilterComponent = ({ filter, setFilter }) => {
  const handleSetFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.currentTarget.value);
  };

  return (
    <InputGroup
      height={"100%"}
      alignItems={"center"}
      width={{ base: "100%", md: "30%" }}
    >
      <InputLeftElement color={useColorModeValue("gray.400", "whiteAlpha.300")}>
        <Icon as={SearchIcon} />
      </InputLeftElement>
      <Input
        rounded={"full"}
        placeholder="Search Activity"
        value={filter}
        onChange={handleSetFilter}
      />
    </InputGroup>
  );
};

export default ExpenseFilter;

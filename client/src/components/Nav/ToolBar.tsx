import {
  Box,
  HStack,
  Icon,
  useColorModeValue,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { HiHome } from "react-icons/hi2";
import {
  HiCog,
  HiMoon,
  HiSun,
  HiCurrencyDollar,
  HiClock,
} from "react-icons/hi";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { TabComponent, ToolBarComponent, iTab } from "./types";
import AddExpense from "../Expense/AddExpense";

const Tab: TabComponent = ({ item }) => {
  const location = useLocation();
  const color = useColorModeValue(
    location.pathname === item.route ? "purple.500" : "gray.500",
    location.pathname === item.route ? "purple.400" : "gray.400"
  );
  return (
    <RouterLink to={item.route}>
      {item.route === "/home/user" ? (
        <>{item.icon}</>
      ) : (
        <Icon as={item.icon} boxSize={7} color={color} />
      )}
    </RouterLink>
  );
};

const ToolBar: ToolBarComponent = ({ ...rest }) => {
  const { toggleColorMode } = useColorMode();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const TOOL_BAR_ITEMS: iTab[] = [
    {
      route: "/d",
      icon: HiHome,
    },
    {
      route: "/d/settings",
      icon: HiCog,
    },
    {
      route: "/d/expenses",
      icon: HiClock,
    },
  ];
  return (
    <HStack
      {...rest}
      width={"100%"}
      minH={"60px"}
      borderColor={useColorModeValue("gray.200", "gray.900")}
      bg={useColorModeValue("#ffffff", "#121212")}
      zIndex={5}
    >
      <HStack width={"100%"} px={5} justify={"space-around"} align={"center"}>
        {TOOL_BAR_ITEMS.map((item) => (
          <Tab item={item} key={item.route} />
        ))}
        <Box>
          <Icon
            as={HiCurrencyDollar}
            boxSize={7}
            color={useColorModeValue("gray.500", "gray.400")}
            cursor={"pointer"}
            onClick={onOpen}
          />
        </Box>
        <Box>
          <Icon
            as={useColorModeValue(HiMoon, HiSun)}
            color={useColorModeValue("gray.500", "gray.400")}
            boxSize={7}
            cursor={"pointer"}
            _hover={{
              color: useColorModeValue("purple.500", "purple.300"),
            }}
            onClick={toggleColorMode}
          />
        </Box>
        <AddExpense isOpen={isOpen} onClose={onClose} />
      </HStack>
    </HStack>
  );
};

export default ToolBar;

import { HStack, IconButton, Icon, useColorModeValue } from "@chakra-ui/react";
import { HiHome } from "react-icons/hi2";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { TabComponent, ToolBarComponent, iTab } from "./types";
import AddExpenseButton from "../Expense/AddExpenseButton";
import ToggleTheme from "./ToggleTheme";
import AddMilesButton from "../Miles/AddMilesButton";

const Tab: TabComponent = ({ item }) => {
  const location = useLocation();
  const variant = location.pathname === item.route ? "solid" : "ghost";
  return (
    <RouterLink to={item.route}>
      {item.route === "/home/user" ? (
        <>{item.icon}</>
      ) : (
        <IconButton
          aria-label="change page"
          colorScheme="purple"
          variant={variant}
        >
          <Icon as={item.icon} boxSize={5} />
        </IconButton>
      )}
    </RouterLink>
  );
};

const ToolBar: ToolBarComponent = ({ ...rest }) => {
  const TOOL_BAR_ITEMS: iTab[] = [
    {
      route: "/d",
      icon: HiHome,
    },
  ];
  return (
    <HStack
      {...rest}
      width={"100%"}
      minH={"60px"}
      borderColor={useColorModeValue("blackAlpha.300", "whiteAlpha.300")}
      bg={useColorModeValue("#ffffff", "#121212")}
      zIndex={5}
    >
      <HStack width={"100%"} px={5} justify={"space-around"} align={"center"}>
        {TOOL_BAR_ITEMS.map((item) => (
          <Tab item={item} key={item.route} />
        ))}
        <AddExpenseButton
          aria-label="add-expense"
          display={{ base: "flex", md: "none" }}
        />
        <AddMilesButton
          aria-label="add-miles"
          display={{ base: "flex", md: "none" }}
        />
        <ToggleTheme
          aria-label="toggle theme"
          display={{ base: "flex", md: "none" }}
        />
      </HStack>
    </HStack>
  );
};

export default ToolBar;

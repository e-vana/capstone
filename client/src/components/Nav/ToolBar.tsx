import { HStack, Icon, useColorModeValue } from "@chakra-ui/react";
import { HiQrCode, HiUserCircle, HiHome } from "react-icons/hi2";
import { HiCog } from "react-icons/hi";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { TabComponent, iTab } from "./types";

const TOOL_BAR_ITEMS: iTab[] = [
  {
    route: "/home",
    icon: HiHome,
  },
  {
    route: "/home/qr",
    icon: HiQrCode,
  },
  {
    route: "/home/user",
    icon: HiUserCircle,
  },
  {
    route: "/home/settings",
    icon: HiCog,
  },
];

const Tab: TabComponent = ({ item }) => {
  const location = useLocation();

  return (
    <RouterLink to={item.route}>
      <Icon
        as={item.icon}
        boxSize={7}
        color={useColorModeValue(
          location.pathname === item.route ? "purple.500" : "gray.500",
          location.pathname === item.route ? "purple.400" : "gray.400"
        )}
      />
    </RouterLink>
  );
};

const ToolBar = () => {
  return (
    <HStack
      position={"sticky"}
      bottom={0}
      left={0}
      width={"100%"}
      display={{ base: "flex", md: "none" }}
      minH={"60px"}
      borderTop={"1px solid"}
      borderColor={"gray.100"}
    >
      <HStack width={"100%"} px={5} justify={"space-around"}>
        {TOOL_BAR_ITEMS.map((item) => (
          <Tab item={item} key={item.route} />
        ))}
      </HStack>
    </HStack>
  );
};

export default ToolBar;

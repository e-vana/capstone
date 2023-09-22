import {
  Box,
  Text,
  Heading,
  HStack,
  Icon,
  useColorModeValue,
  useColorMode,
  useDisclosure,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  Stack,
} from "@chakra-ui/react";
import { HiQrCode, HiHome } from "react-icons/hi2";
import { HiCog, HiMoon, HiSun } from "react-icons/hi";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { TabComponent, ToolBarComponent, iTab } from "./types";
import UserTile from "../Tile/UserTile";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const TOOL_BAR_ITEMS: iTab[] = [
    {
      route: "/home",
      icon: HiHome,
    },

    {
      route: "/home/settings",
      icon: HiCog,
    },
  ];
  return (
    <HStack
      {...rest}
      width={"100%"}
      minH={"60px"}
      borderColor={useColorModeValue("gray.200", "gray.900")}
      bg={useColorModeValue("#ffffff", "#303030")}
    >
      <HStack width={"100%"} px={5} justify={"space-around"} align={"center"}>
        {TOOL_BAR_ITEMS.map((item) => (
          <Tab item={item} key={item.route} />
        ))}
        <Box>
          <Icon
            as={HiQrCode}
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
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          border={"none"}
          boxShadow={"none"}
          bg={useColorModeValue("white", "#303030")}
        >
          <ModalCloseButton />
          <ModalBody py={5}>
            <Stack
              width={"100%"}
              align={"center"}
              minH={"400px"}
              justify={"space-between"}
              spacing={5}
            >
              <Heading size={"md"} alignSelf={"start"}>
                Your Tile
              </Heading>
              <UserTile />
              <Text
                alignSelf={"center"}
                background={"gray.200"}
                padding={2}
                rounded={"md"}
              >
                Check in with this code!
              </Text>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </HStack>
  );
};

export default ToolBar;

import {
  IconButton,
  Stack,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  Text,
  Drawer,
  DrawerContent,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Img,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiSettings,
  FiMenu,
  FiChevronDown,
  FiGlobe,
} from "react-icons/fi";
import { FaRoad } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { IconType } from "react-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/Auth/userReducer";
import AddExpenseButton from "../Expense/AddExpenseButton";
import AddMilesButton from "../Miles/AddMilesButton";
import ToggleTheme from "./ToggleTheme";

interface LinkItemProps {
  name: string;
  to: string;
  icon: IconType;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  link: string;
  children: React.ReactNode;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", to: "/d", icon: FiHome },
  { name: "Organizations", to: "organizations", icon: FiGlobe },
  { name: "Events", to: "/d/events", icon: FiCompass },
  { name: "Expenses", to: "/d/expenses", icon: FiTrendingUp },
  { name: "Miles", to: "/d/miles", icon: FaRoad },
  { name: "Settings", to: "/d/settings", icon: FiSettings },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "#121212")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.100", "whiteAlpha.300")}
      boxShadow={useColorModeValue("lg", "none")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Img
          src={useColorModeValue(
            "/villagehoursbrand.png",
            "/villagehoursbranddark.png"
          )}
          width={"160px"}
        />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          link={link.to}
          onClick={onClose}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  const iconColor = useColorModeValue("purple.500", "purple.200");
  return (
    <Box
      as={RouterLink}
      to={link}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        transition={".1s ease-in"}
        _hover={{
          border: "1px solid",
          borderColor: "purple.400",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            as={icon}
            color={iconColor}
            _groupHover={{
              color: "purple.400",
            }}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { user } = useAppSelector((state) => state.user);
  const menuItemColors = {
    bgColor: "transparent",
    _hover: {
      bgColor: "purple.400",
    },
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSignout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "#121212")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "whiteAlpha.300")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Img
        display={{ base: "flex", md: "none" }}
        src={useColorModeValue(
          "/villagehoursbrand.png",
          "/villagehoursbranddark.png"
        )}
        width={"150px"}
      />

      <HStack spacing={{ base: 0, md: 3 }}>
        <AddExpenseButton
          aria-label="add-expense"
          display={{ base: "none", md: "flex" }}
        />
        <AddMilesButton
          aria-label="add-miles"
          display={{ base: "none", md: "flex" }}
        />
        <ToggleTheme
          aria-label="toggle theme"
          display={{ base: "none", md: "flex" }}
        />
        <Flex alignItems={"center"}>
          <Menu colorScheme="purple">
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  name={user?.first_name + " " + user?.last_name}
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user?.first_name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "#121212")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem as={RouterLink} to={"/d/settings"} {...menuItemColors}>
                Profile
              </MenuItem>
              <MenuItem as={RouterLink} to={"/d/settings"} {...menuItemColors}>
                Settings
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleSignout} {...menuItemColors}>
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const DashNav = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack minH="100vh" bg={useColorModeValue("white", "#121212")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Stack ml={{ base: 0, md: 60 }} flex={1} overflowX={"auto"}>
        {children}
      </Stack>
    </Stack>
  );
};

export default DashNav;

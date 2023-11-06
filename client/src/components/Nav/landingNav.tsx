import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerBody,
  DrawerCloseButton,
  HStack,
  Heading,
  useColorMode,
  Img,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";

export const LandingNav = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  return (
    <Box position={"sticky"} top={0} left={0}>
      <Flex
        bg={useColorModeValue("white", "#121212")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        position={"relative"}
        boxShadow={useColorModeValue("lg", "none")}
      >
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "space-between", md: "start" }}
          width={"100%"}
        >
          <Img
            width={{ base: "150px", md: "170px" }}
            src={useColorModeValue(
              "/villagehoursbrand.png",
              "/villagehoursbranddark.png"
            )}
          />

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        <Flex display={{ base: "none", md: "flex" }}>
          <Icon
            as={useColorModeValue(MoonIcon, SunIcon)}
            color={useColorModeValue("gray.500", "gray.100")}
            boxSize={6}
            cursor={"pointer"}
            _hover={{
              color: useColorModeValue("purple.500", "purple.300"),
            }}
            onClick={toggleColorMode}
          />
        </Flex>
        <Flex display={{ base: "flex", md: "none" }} zIndex={10}>
          <Box zIndex={12}>
            <IconButton
              onClick={onOpen}
              icon={<HamburgerIcon boxSize={6} />}
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Box>
        </Flex>
      </Flex>

      <Drawer isOpen={isOpen} onClose={onClose} placement="left" size={"full"}>
        <DrawerOverlay zIndex={1} position={"absolute"} />
        <DrawerContent
          position={"absolute"}
          bg={useColorModeValue("#ffffff", "#303030")}
        >
          <DrawerCloseButton />
          <DrawerBody mt={"60px"}>
            <MobileNav />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <Stack
      display={{ md: "none" }}
      width={"100%"}
      position={"relative"}
      height={"100%"}
      spacing={0}
    >
      <Heading size={"md"}>Heading</Heading>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <HStack
        position={"absolute"}
        width={"100%"}
        bottom={0}
        left={0}
        minH={"60px"}
        justify={"center"}
        borderTop={"1px solid"}
        borderColor={"gray.100"}
        py={5}
      >
        <Stack align={"center"}>
          <Icon
            as={useColorModeValue(MoonIcon, SunIcon)}
            color={useColorModeValue("gray.500", "gray.100")}
            boxSize={6}
            cursor={"pointer"}
            _hover={{
              color: useColorModeValue("purple.500", "purple.300"),
            }}
            onClick={toggleColorMode}
          />
          <Text>{useColorModeValue("DARK", "LIGHT")}</Text>{" "}
        </Stack>
      </HStack>
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle} width={"100%"}>
      <HStack
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
        width={"50%"}
        minWidth={"50%"}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </HStack>

      <Collapse in={isOpen} style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [];

import {
  Button,
  Flex,
  Heading,
  Highlight,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const HeroView = () => {
  return (
    <>
      <Stack
        minH={"calc(100vh - 60px)"}
        direction={{ base: "column-reverse", md: "row" }}
      >
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={6} w={"full"} maxW={"lg"}>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: useBreakpointValue({ base: "20%", md: "30%" }),
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "purple.400",
                  zIndex: -1,
                }}
                color={useColorModeValue("#303030", "whiteAlpha.800")}
              >
                Human Resources
              </Text>
              <br />{" "}
              <Text color={"purple.400"} as={"span"}>
                For Non-Profits
              </Text>{" "}
            </Heading>
            <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
              <Highlight
                query={"Larbster.io"}
                styles={{
                  color: "purple.400",
                }}
              >
                Larbster.io streamlines and empowers non-profits to effectively
                manage their workforce, optimize productivity, and enhance their
                mission-driven initiatives.
              </Highlight>
            </Text>
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Button
                as={RouterLink}
                rounded={"full"}
                bg={"purple.400"}
                color={"white"}
                _hover={{
                  bg: "purple.500",
                }}
                to={"/home"}
              >
                Add Organization
              </Button>
              <Button as={RouterLink} to={"/about"} rounded={"full"}>
                How It Works
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            src={
              "https://images.unsplash.com/photo-1522543558187-768b6df7c25c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            }
            draggable={false}
          />
        </Flex>
      </Stack>
    </>
  );
};

export default HeroView;

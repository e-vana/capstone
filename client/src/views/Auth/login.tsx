import { FormEvent, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "react-query";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { iUser } from "../../interfaces/user.interface";
import { loginUser } from "../../api/users.api";
import { LoginComponent } from "./types";
import { useAppSelector } from "../../app/hooks";

const Login: LoginComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const toast = useToast();
  const navigate = useNavigate();

  const { joinURL } = useAppSelector((state) => state.user);

  const mutation = useMutation((data: Pick<iUser, "email" | "password">) => {
    return loginUser(data);
  });

  const handleSubmit = () => {
    const data: Pick<iUser, "email" | "password"> = {
      email: email,
      password: password,
    };
    mutation.mutate(data);
  };

  if (mutation.isSuccess) {
    toast({
      status: "success",
      title: "Logging in",
    });
    if (!joinURL) {
      navigate("/d");
    } else {
      navigate(joinURL);
    }
    mutation.reset();
  }

  if (mutation.status === "error") {
    toast({
      status: "error",
      title: "error logging in",
    });
    mutation.reset();
  }

  return (
    <>
      <Helmet title="Login" />
      <Flex
        height={"100%"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("white", "#121212")}
        color={useColorModeValue("#303030", "whiteAlpha.800")}
        flex={1}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"} textAlign={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"}>
              to enjoy all of our cool{" "}
              <Text as={"span"} color={"purple.400"}>
                features
              </Text>{" "}
              ⚡️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "#121212")}
            boxShadow={useColorModeValue("lg", "none")}
            p={8}
            border={"1px solid"}
            borderColor={useColorModeValue("transparent", "whiteAlpha.300")}
          >
            <form onSubmit={(e: FormEvent) => e.preventDefault()}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox colorScheme="purple">Remember me</Checkbox>
                    <Text color={"purple.400"}>Forgot password?</Text>
                  </Stack>
                  <Button
                    type="submit"
                    bg={"purple.400"}
                    color={"white"}
                    _hover={{
                      bg: "purple.500",
                    }}
                    isLoading={mutation.isLoading}
                    onClick={handleSubmit}
                  >
                    Sign in
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    Don't have an account?{" "}
                    <Link as={RouterLink} to={"/register"} color={"purple.400"}>
                      Sign Up
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Login;

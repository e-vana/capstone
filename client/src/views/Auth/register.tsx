import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useMutation } from "react-query";
import { iUser } from "../../interfaces/user.interface";
import { registerUser } from "../../api/users.api";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const mutation = useMutation(
    (data: Omit<iUser, "created_at" | "updated_at">) => {
      return registerUser(data);
    }
  );

  const handleSubmit = () => {
    const data: Omit<iUser, "created_at" | "updated_at"> = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };
    mutation.mutate(data);
  };

  if (mutation.isSuccess) {
    toast({
      status: "success",
      title: "Created Account!",
    });
    navigate("/home");
    mutation.reset();
  }

  if (mutation.status === "error") {
    toast({
      status: "error",
      title: "error creating account",
    });
    mutation.reset();
  }

  return (
    <Flex
      height={"100%"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "#303030")}
      color={useColorModeValue("#303030", "whiteAlpha.800")}
      flex={1}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign up</Heading>
          <Text fontSize={"lg"}>
            to enjoy all of our cool{" "}
            <Text as={"span"} color={"purple.400"}>
              features
            </Text>{" "}
            ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "#505050")}
          boxShadow={useColorModeValue("lg", "none")}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.currentTarget.value)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.currentTarget.value)}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue("purple.500", "purple.400")}
                color={"white"}
                _hover={{
                  bg: useColorModeValue("purple.500", "purple.400"),
                }}
                isLoading={mutation.isLoading}
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link as={RouterLink} to={"/login"} color={"purple.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;

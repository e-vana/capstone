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
  List,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useMutation } from "react-query";
import { Helmet } from "react-helmet";
import { iUser } from "../../interfaces/user.interface";
import { registerUser } from "../../api/users.api";
import { RegisterComponent } from "./types";
import { useAppSelector } from "../../app/hooks";

const Register: RegisterComponent = () => {
  const { joinURL } = useAppSelector((state) => state.user);

  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const mutation = useMutation(
    (data: Omit<iUser, "id" | "created_at" | "updated_at">) => {
      return registerUser(data);
    }
  );

  const passwordErrors = [];

  if (!/[A-Z]/.test(password)) {
    passwordErrors.push("One capital letter is required");
  }

  if (!/[a-z]/.test(password)) {
    passwordErrors.push("One lowercase letter is required");
  }

  if (!/[\d/]/.test(password)) {
    passwordErrors.push("One digit is required");
  }

  if (!/[@!?=()]/.test(password)) {
    passwordErrors.push("One special character (@!?=()) is required");
  }

  if (password.length < 8 || password.length > 15) {
    passwordErrors.push("Password must be between 8 and 15 characters long");
  }

  if (
    confirmPassword !== password ||
    (password === "" && confirmPassword === "")
  ) {
    passwordErrors.push("Passwords must match");
  }

  const handleSubmit = (): void => {
    const data: Omit<iUser, "id" | "created_at" | "updated_at"> = {
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
      title: "error creating account",
    });
    mutation.reset();
  }

  return (
    <>
      <Helmet title="Register" />
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
            <form onSubmit={handleSubmit}>
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
                    <FormControl id="lastName" isRequired>
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
                <FormControl id="confirm-password" isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                  />
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <List
                    fontSize={"sm"}
                    color={useColorModeValue("red", "red.400")}
                  >
                    {passwordErrors.length > 0 && password !== "" && (
                      <>
                        <Text>Password needs the following: </Text>
                        <UnorderedList>
                          {passwordErrors.map((err) => (
                            <ListItem>{err}</ListItem>
                          ))}
                        </UnorderedList>
                      </>
                    )}
                  </List>
                  <Button
                    type="submit"
                    loadingText="Submitting"
                    size="lg"
                    bg={useColorModeValue("purple.500", "purple.400")}
                    color={"white"}
                    _hover={{
                      bg: useColorModeValue("purple.500", "purple.400"),
                    }}
                    isLoading={mutation.isLoading}
                    onClick={handleSubmit}
                    isDisabled={
                      passwordErrors.length > 0 || confirmPassword !== password
                    }
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
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Register;

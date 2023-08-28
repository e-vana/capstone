import { useQuery } from "react-query";
import { Link as RouterLink } from "react-router-dom";
import { Button, Spinner, Stack, useToast } from "@chakra-ui/react";
import { getUsers, waitWrapper } from "../api/users.api";
import { FunctionComponent } from "react";
import ErrorMessage from "../components/Error";
import UserCard from "../components/User/userCard";
import { iUser } from "../interfaces/user.interface";

const HomeView: FunctionComponent = () => {
  const toast = useToast();

  const {
    data: userData,
    isLoading: userIsLoading,
    isError: userIsError,
  } = useQuery("getUsers", waitWrapper(getUsers)); // waits for two seconds to test loader

  const renderState = {
    loading: (
      <Stack align={"center"} minH={"100vh"} justify={"center"}>
        <Spinner color={"green"} size={"xl"} />
      </Stack>
    ),
    error: (
      <ErrorMessage
        code={404}
        message="Cant find users. Make sure you start the server!"
      />
    ),
    success: () => (
      <Stack align={"center"} height={"100vh"} justify={"center"}>
        <Stack>
          {userData?.users &&
            userData.users.map((user: Omit<iUser, "password">) => (
              <UserCard key={user.email} user={user} />
            ))}
          {toast({
            status: "success",
            title: "Success",
          })}
          <Button as={RouterLink} to={"/test"}>
            Go To Test Page
          </Button>
        </Stack>
      </Stack>
    ),
  };

  if (userIsLoading) return renderState.loading;
  else if (userIsError) return renderState.error;
  else if (userData?.users) return renderState.success();
};

export default HomeView;

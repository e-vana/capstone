import { Stack, Spinner } from "@chakra-ui/react";
import { AuthGuardComponent } from "./types";
import { useAppDispatch } from "../../app/hooks";
import { useQuery } from "react-query";
import { getUser } from "../../api/users.api";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../features/Auth/userReducer";

const AuthGuard: AuthGuardComponent = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data, isError, isSuccess, isLoading } = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
  });

  const isAuthenticated =
    localStorage.getItem("token") && (isSuccess && data) != null;

  if (isLoading) {
    return (
      <Stack align={"center"} height={"100%"} flex={1} justify={"center"}>
        <Spinner color={"green"} size={"xl"} />
      </Stack>
    );
  } else if (isError || !isAuthenticated) {
    navigate("/login");
    return null;
  } else {
    dispatch(setUser(data!));
    return children;
  }
};

export default AuthGuard;

import { AuthGuardComponent } from "./types";
import { useAppDispatch } from "../../app/hooks";
import { useQuery } from "react-query";
import { getUser } from "../../api/users.api";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../features/Auth/userReducer";
import { LoadingComponent } from "../Loading";

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
    return <LoadingComponent />;
  } else if (isError || !isAuthenticated) {
    navigate("/login");
    return null;
  } else {
    dispatch(setUser(data!));
    return children;
  }
};

export default AuthGuard;

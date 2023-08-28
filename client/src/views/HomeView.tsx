import { useQuery } from "react-query";
import { Link as RouterLink } from "react-router-dom";
import { getUsers } from "../api/users.api";
import { FunctionComponent } from "react";
const HomeView: FunctionComponent = () => {
  const {
    data: userData,
    isLoading: userIsLoading,
    isError: userIsError,
  } = useQuery("getUsers", getUsers);

  const renderState = {
    loading: <h1>Loading...</h1>,
    error: <h1>Cant find users. Make sure you start the server!</h1>,
    success: () => (
      <>
        {userData?.users &&
          userData.users.map((user) => (
            <div key={user.email}>
              {user.first_name} {user.last_name}
            </div>
          ))}
        <RouterLink to={"/test"}>
          <button>Go To Test Page</button>
        </RouterLink>
      </>
    ),
  };

  if (userIsLoading) return renderState.loading;
  else if (userIsError) return renderState.error;
  else if (userData?.users) return renderState.success();
};

export default HomeView;

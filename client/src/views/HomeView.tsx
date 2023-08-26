import { useQuery } from "react-query";
import { getUsers } from "../api/users.api";
export default function HomeView() {
  const {
    data: userData,
    isLoading: userIsLoading,
    isError: userIsError,
  } = useQuery("getUsers", getUsers);
  return (
    <div>
      <h1>Hey Team!</h1>
      {userIsLoading && <h1>Loading...</h1>}
      {userIsError && <h1>Cant find users. Make sure you start the server!</h1>}
      {userData?.users &&
        userData.users.map((user) => (
          <div key={user.email}>
            {user.first_name} {user.last_name}
          </div>
        ))}
    </div>
  );
}

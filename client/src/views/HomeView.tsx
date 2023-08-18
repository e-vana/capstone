import { useQuery } from "react-query";
import { getTeamMembers } from "../api/example.api";
export default function HomeView() {
  const {
    data: teamMembersData,
    isLoading: teamMembersIsLoading,
    isError: teamMembersIsError,
  } = useQuery("getTeamMembers", getTeamMembers);
  return (
    <div>
      <h1>Hey Team!</h1>
      {teamMembersIsLoading && <h1>Loading...</h1>}
      {teamMembersIsError && <h1>Problem loading todos</h1>}
      {teamMembersData &&
        teamMembersData.teamMembers.map((teamMember) => (
          <div key={teamMember.name}>{teamMember.name}</div>
        ))}
    </div>
  );
}

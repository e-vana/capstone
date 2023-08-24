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
      {teamMembersIsError && (
        <h1>Cant find team members. Make sure you start the server!</h1>
      )}
      {teamMembersData?.teamMembers &&
        teamMembersData.teamMembers.map((teamMember) => (
          <div key={teamMember.name}>{teamMember.name}</div>
        ))}
    </div>
  );
}

import axios from "axios";

interface TeamMember {
  name: string;
}
interface GetTeamMembersResponse {
  teamMembers: TeamMember[];
}

export const getTeamMembers =
  async function (): Promise<GetTeamMembersResponse> {
    let response = await axios.get("http://localhost:3000");
    return response.data;
  };

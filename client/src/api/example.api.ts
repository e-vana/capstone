import axios from "axios";

interface TeamMember {
  name: string;
}
interface GetTeamMembersResponse {
  teamMembers: TeamMember[];
}

export const getTeamMembers =
  async function (): Promise<GetTeamMembersResponse> {
    let response = await axios.get(`${import.meta.env.VITE_BASE_URL}/test`);
    return response.data as GetTeamMembersResponse;
  };

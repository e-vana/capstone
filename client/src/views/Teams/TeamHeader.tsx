import { useContext } from "react";
import { Text, Button, Icon } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import {
  TitleCardContainer,
  TitleCardHeader,
  TitleCardFooter,
} from "../../components/Cards";
import { TeamContext } from "./TeamContext";
import { TeamHeaderComponent } from "./types";

export const TeamHeader: TeamHeaderComponent = ({ children }) => {
  const { teamData, teamLoading } = useContext(TeamContext);

  return (
    <TitleCardContainer>
      <TitleCardHeader isLoading={teamLoading}>{children}</TitleCardHeader>
      <Text textAlign={"center"}>Org: {teamData?.organization_id}</Text>
      <TitleCardFooter>
        <Button
          width={"100%"}
          variant={"outline"}
          rounded={"md"}
          gap={3}
          colorScheme="blue"
        >
          Manage
          <Icon as={SettingsIcon} />
        </Button>
      </TitleCardFooter>
    </TitleCardContainer>
  );
};

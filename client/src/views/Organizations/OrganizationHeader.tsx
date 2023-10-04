import { Icon, Button, Text, Heading, useDisclosure } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { HiQrCode } from "react-icons/hi2";
import TileModal from "../../components/Tile/TileModal";
import OrganizationTile from "../../components/Tile/OrganizationTile";
import { useContext } from "react";
import { OrganizationHeaderComponent, iOrgContext } from "./types";
import OrganizationContext from "./OrganizationContext";
import {
  TitleCardContainer,
  TitleCardFooter,
  TitleCardHeader,
} from "../../components/Cards";

const OrganizationHeader: OrganizationHeaderComponent = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { orgData, orgLoading } = useContext<iOrgContext>(OrganizationContext);

  return (
    <TitleCardContainer>
      <TitleCardHeader isLoading={orgLoading}>
        <Heading textAlign={"center"}>{children}</Heading>
        <Text fontSize={"sm"} align={"center"} width={"100%"}>
          You have {"1"} event(s) scheduled. {"1"} in progress and {"0"}{" "}
          completed.
        </Text>
      </TitleCardHeader>
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
        <Button
          width={"100%"}
          variant={"outline"}
          rounded={"md"}
          gap={3}
          colorScheme="green"
          onClick={onOpen}
        >
          View QR Code
          <Icon as={HiQrCode} />
        </Button>
      </TitleCardFooter>
      <TileModal isOpen={isOpen} onClose={onClose}>
        {orgData !== undefined && <OrganizationTile organization={orgData} />}
      </TileModal>
    </TitleCardContainer>
  );
};

export default OrganizationHeader;

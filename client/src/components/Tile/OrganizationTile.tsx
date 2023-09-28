import { Stack, Heading, Text, Button, Icon } from "@chakra-ui/react";
import { QRCodeSVG } from "qrcode.react";
import { OrganizationTileComponent } from "./types";
import { AiOutlinePrinter } from "react-icons/ai";

const OrganizationTile: OrganizationTileComponent = ({ organization }) => {
  return (
    <Stack width={"100%"} align={"center"} gap={5} paddingY={5}>
      <Heading>{organization.name}</Heading>
      <QRCodeSVG value={String(organization.id)} size={200} />
      <Text textDecor={"underline"} fontSize={"xs"}>
        Organization ID: {organization.id}
      </Text>
      <Text fontSize={"xs"} width={"80%"} textAlign={"center"}>
        Share the QR code or event link below with your participants to track
        their attendance and time committed to this event.
      </Text>
      <Button width={"100%"} gap={3} variant={"solid"}>
        Print
        <Icon as={AiOutlinePrinter} boxSize={5} />
      </Button>
    </Stack>
  );
};

export default OrganizationTile;

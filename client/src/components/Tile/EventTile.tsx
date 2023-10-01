import { Stack, Heading, Text, Button, Icon } from "@chakra-ui/react";
import { QRCodeSVG } from "qrcode.react";
import { EventTileComponent } from "./types";
import { AiOutlinePrinter } from "react-icons/ai";

const EventTile: EventTileComponent = ({ event }) => {
  return (
    <Stack width={"100%"} align={"center"} gap={5} paddingY={5}>
      <Heading>{event.event_name}</Heading>
      <QRCodeSVG value={String(event.event_id)} size={200} />
      <Text textDecor={"underline"} fontSize={"xs"}>
        Event ID: {event.event_id}
      </Text>
      <Text fontSize={"xs"} width={"80%"} textAlign={"center"}>
        Share or Scan the QR code to check members into this event.
      </Text>
      <Button width={"100%"} gap={3} variant={"solid"}>
        Print
        <Icon as={AiOutlinePrinter} boxSize={5} />
      </Button>
    </Stack>
  );
};

export default EventTile;

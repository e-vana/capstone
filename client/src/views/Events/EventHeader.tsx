import { Heading, Button, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { HiQrCode } from "react-icons/hi2";
import {
  TitleCardContainer,
  TitleCardFooter,
  TitleCardHeader,
} from "../../components/Cards";
import { useContext, useState } from "react";
import { EventHeaderComponent } from "./types";
import EventContext from "./EventContext";
import TileModal from "../../components/Tile/TileModal";
import EventTile from "../../components/Tile/EventTile";
import EditEventModal from "../../components/EditModal/EditEvent";
import { useLocation } from "react-router-dom";

const EventHeader: EventHeaderComponent = ({ children }) => {
  const { eventLoading, eventData } = useContext(EventContext);
  const { isOpen: qrCodeIsOpen, onOpen: qrCodeOnOpen, onClose: qrCodeOnClose } = useDisclosure();
  const { isOpen: manageEventIsOpen, onOpen: manageEventOnOpen, onClose: manageEventOnClose } = useDisclosure();
  
  return (
    <TitleCardContainer>
      <TitleCardHeader isLoading={eventLoading}>
        <Heading textAlign={"center"}>{children}</Heading>
        <Text textAlign={"center"}>Team: {eventData?.team_name}</Text>
        <TitleCardFooter>
          <Button
            width={"100%"}
            variant={"outline"}
            rounded={"md"}
            gap={3}
            colorScheme="blue"
            onClick={manageEventOnOpen}
          >
            Manage <Icon as={SettingsIcon} />
          </Button>
          <Button
            width={"100%"}
            variant={"outline"}
            rounded={"md"}
            gap={3}
            colorScheme="green"
            onClick={qrCodeOnOpen}
          >
            View QR Code
            <Icon as={HiQrCode} />
          </Button>
          <TileModal isOpen={qrCodeIsOpen} onClose={qrCodeOnClose}>
            {eventData !== undefined && (
              <EventTile
                event={eventData}
                eventURL={`${window.location.origin}/join/${eventData.organization_id}-${eventData.event_id}`}
              />
            )}
          </TileModal>
        </TitleCardFooter>
      </TitleCardHeader>
      <EditEventModal isOpen={manageEventIsOpen} onClose={manageEventOnClose} event={eventData} />
    </TitleCardContainer>
  );
};

export default EventHeader;

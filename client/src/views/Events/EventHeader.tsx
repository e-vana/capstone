import { Heading, Button, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { HiQrCode } from "react-icons/hi2";
import {
  TitleCardContainer,
  TitleCardFooter,
  TitleCardHeader,
} from "../../components/Cards";
import { useContext } from "react";
import { EventHeaderComponent } from "./types";
import EventContext from "./EventContext";
import TileModal from "../../components/Tile/TileModal";
import EventTile from "../../components/Tile/EventTile";
import { useLocation } from "react-router-dom";

const EventHeader: EventHeaderComponent = ({ children }) => {
  const { eventLoading, eventData } = useContext(EventContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
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
          <TileModal isOpen={isOpen} onClose={onClose}>
            {eventData !== undefined && (
              <EventTile
                event={eventData}
                eventURL={`${window.location.href}/join/${eventData.event_id}`}
              />
            )}
          </TileModal>
        </TitleCardFooter>
      </TitleCardHeader>
    </TitleCardContainer>
  );
};

export default EventHeader;

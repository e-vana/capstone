import {
  Stack,
  Card,
  Icon,
  CardFooter,
  Heading,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { EventCardsComponent } from "./types";
import { useAppSelector } from "../../app/hooks";

const EventCards: EventCardsComponent = () => {
  const { events, selectedOrg } = useAppSelector(
    (state) => state.organizations
  );

  const bgCardColor = useColorModeValue("white", "#505050");
  const textCardColor = useColorModeValue("blackAlpha.700", "white");

  return (
    <Stack display={{ base: "initial", md: "none" }}>
      {events.map((e) => (
        <Card backgroundColor={bgCardColor} color={textCardColor}>
          <CardFooter
            width={"100%"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Heading size={"sm"}>{e.event_name}</Heading>
            <Button
              colorScheme="purple"
              alignSelf={"end"}
              variant={"outline"}
              justifyContent={"space-between"}
              width={"50%"}
              as={RouterLink}
              to={"/d" + "/" + selectedOrg + "/" + e.event_id}
            >
              View Event <Icon as={ChevronRightIcon} />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </Stack>
  );
};

export default EventCards;

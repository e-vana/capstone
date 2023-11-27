import {
  Stack,
  Card,
  Icon,
  CardFooter,
  Heading,
  Button,
  ButtonGroup,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { EventCardsComponent } from "./types";
import { useAppSelector } from "../../app/hooks";
import AddToCalendar from "../../components/AddModal/Calendar/AddToCalendar";
import {format} from "date-fns";

const EventCards: EventCardsComponent = () => {
  const { events, selectedOrg } = useAppSelector(
    (state) => state.organizations
  );

  const bgCardColor = useColorModeValue("white", "#505050");
  const textCardColor = useColorModeValue("blackAlpha.700", "white");

  return (
    <Stack display={{ base: "initial", md: "none" }}>
      {events.map((e) => (
        <Card backgroundColor={bgCardColor} color={textCardColor} key={"CardEventID" + e.event_id}>
          <CardFooter
            width={"100%"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Heading size={"sm"}>{e.name}</Heading>
            <ButtonGroup variant='outline' spacing='6'>
            <Button
              colorScheme="purple"
              alignSelf={"end"}
              variant={"outline"}
              justifyContent={"space-between"}
              width={"50%"}
              as={RouterLink}
              to={"/d" + "/" + selectedOrg + "/" + e.id}
            >
              View Event <Icon as={ChevronRightIcon} />
            </Button>
            <AddToCalendar 
                name = {e?.event_name || e?.name}
                description= {e.event_description}
                location ={e.address_street + e.address_city + e.address_state + "" + e.address_zipcode}
                startDate= {format(new Date(e.start_time), "yyy-MM-dd")}
                endDate= {format(new Date(e.end_time), "yyy-MM-dd")}
                startTime= {new Date(e.start_time).toTimeString().slice(0,5)}
                endTime={new Date(e.end_time).toTimeString().slice(0,5)}
                />
              </ButtonGroup>
          </CardFooter>
        </Card>
      ))}
    </Stack>
  );
};

export default EventCards;

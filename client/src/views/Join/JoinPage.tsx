import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  ButtonGroup,
  useToast,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getEventInAnOrg } from "../../api/events.api";
import { iCreateHours } from "../../interfaces/hours.interface";
import { createHoursForAnEvent } from "../../api/hours.api";
import { formatSQLDate } from "../../hooks/formatDate";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addEventToJoin } from "../../features/Auth/userReducer";

const JoinPage = () => {
  const { joinId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useAppDispatch();

  if (!localStorage.getItem("token")) {
    dispatch(addEventToJoin(`/join/${joinId}`));
    navigate("/login");
  }

  // eslint-disable-next-line
  const joinData = joinId?.split("-")!;

  const { data } = useQuery("getEvent", () =>
    getEventInAnOrg(+joinData[0]!, +joinData[1]!)
  );

  const mutation = useMutation(
    (data: {
      orgId: number;
      teamId: number;
      eventId: number;
      hours: iCreateHours;
    }) =>
      createHoursForAnEvent(data.orgId, data.teamId, data.eventId, data.hours)
  );

  const handleJoin = useCallback(() => {
    if (data?.event) {
      mutation.mutate({
        orgId: data?.event.organization_id,
        teamId: data?.event.team_id,
        eventId: data?.event.event_id,
        hours: {
          start_time: new Date(Date.now()),
        },
      });
    } else {
      toast({
        status: "error",
        title: "Can not join event, please refresh",
      });
    }
  }, [data?.event, mutation, toast]);

  if (mutation.isSuccess) {
    toast({
      status: "success",
      title: "You are clocked in!",
    });
    mutation.reset();
    navigate(`/d/${data?.event.organization_id}/${data?.event.event_id}`);
  }

  if (mutation.status === "error") {
    toast({
      status: "error",
      title: "Could not clock in, please contact your administrator",
    });
  }

  useEffect(() => {
    if (localStorage.getItem("token") && data?.event && !mutation.isLoading) {
      handleJoin();
    }
  }, [data, handleJoin, mutation]);

  console.log(formatSQLDate(new Date(Date.now())));

  if (!localStorage.getItem("token")) {
    return (
      <Stack flex={1} align={"center"} justify={"center"}>
        <Card
          width={{ base: "95%", md: "30%" }}
          align={"center"}
          p={5}
          bg={useColorModeValue("white", "#404040")}
        >
          <CardBody textAlign={"center"}>
            <Text fontSize={"sm"}>
              <Text as={"span"} fontWeight={"bold"}>
                {data?.event.organization_name}{" "}
              </Text>
              would like you to join!
            </Text>
            <Heading size="lg">{data?.event.event_name}</Heading>
            <Text fontSize={"sm"}>{data?.event.event_description}</Text>
            <Text fontSize={"sm"}>{data?.event.address_state}</Text>
          </CardBody>
          <CardFooter width={"100%"} display={"flex"}>
            <ButtonGroup width={"100%"}>
              <Button width={"100%"} onClick={handleJoin} colorScheme="purple">
                Join
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </Stack>
    );
  } else {
    return null;
  }
};

export default JoinPage;

import {
  Tr,
  Td,
  Button,
  Card,
  CardBody,
  HStack,
  Stack,
  Heading,
  useColorModeValue,
  CardHeader,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { OrganizationItemComponent } from "./types";

export const OrganizationTd: OrganizationItemComponent = ({
  organization,
  ...rest
}) => {
  return (
    <Tr {...rest}>
      <Td>{organization.name}</Td>
      <Td>
        <Button as={RouterLink} to={"/d" + "/" + organization.id}>
          View More
        </Button>
      </Td>
    </Tr>
  );
};

export const OrganizationCard: OrganizationItemComponent = ({
  organization,
  ...rest
}) => {
  return (
    <Card {...rest} width={"100%"} bg={useColorModeValue("white", "#404040")}>
      <CardHeader>
        <Heading size={"md"}>{organization.name}</Heading>
      </CardHeader>
      <CardBody>
        <HStack width={"100%"} justify={"space-between"}>
          <Stack></Stack>
          <Button
            as={RouterLink}
            to={"/d" + "/" + organization.id}
            bg={useColorModeValue("purple.500", "purple.400")}
          >
            Go to Page
          </Button>
        </HStack>
      </CardBody>
    </Card>
  );
};

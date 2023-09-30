import {
  Card,
  CardHeader,
  Skeleton,
  CardFooter,
  Icon,
  HStack,
  Button,
  Text,
  Heading,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { HiQrCode } from "react-icons/hi2";
import TileModal from "../../components/Tile/TileModal";
import OrganizationTile from "../../components/Tile/OrganizationTile";
import { useContext } from "react";
import { OrganizationHeaderComponent, iOrgContext } from "./types";
import OrganizationContext from "./OrganizationContext";

const OrganizationHeader: OrganizationHeaderComponent = ({ children }) => {
  const cardBg = useColorModeValue("white", "#505050");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { orgData, orgLoading } = useContext<iOrgContext>(OrganizationContext);

  return (
    <Card width={"100%"} minHeight={"30%"} bg={cardBg} alignSelf={"start"}>
      <CardHeader
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        gap={3}
      >
        <Skeleton width={"100%"} height={"fit-content"} isLoaded={!orgLoading}>
          <Heading textAlign={"center"}>{children}</Heading>
        </Skeleton>
        <Text fontSize={"sm"} align={"center"} width={"75%"}>
          You have {"1"} event(s) scheduled. {"1"} in progress and {"0"}{" "}
          completed.
        </Text>
      </CardHeader>
      <CardFooter>
        <HStack width={"100%"} justifyContent={"space-between"}>
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
        </HStack>
      </CardFooter>
      <TileModal isOpen={isOpen} onClose={onClose}>
        {orgData !== undefined && <OrganizationTile organization={orgData} />}
      </TileModal>
    </Card>
  );
};

export default OrganizationHeader;

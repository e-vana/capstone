import { Button, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import { QRCodeSVG } from "qrcode.react";
import { useAppSelector } from "../../app/hooks";
import { AiOutlinePrinter } from "react-icons/ai";

const UserTile = () => {
  const { user } = useAppSelector((state) => state.user);

  if (user != undefined) {
    return (
      <Stack width="100%" align={"center"} gap={5} paddingY={5}>
        <Heading>{user.first_name}</Heading>
        <QRCodeSVG value={user?.first_name} size={200} />
        <Text fontSize={"xs"} width={"80%"} textAlign={"center"}>
          Share the QR code or event link below with your manager or peers to
          clock in.
        </Text>
        <Button width={"100%"} gap={3} variant={"solid"}>
          Print
          <Icon as={AiOutlinePrinter} boxSize={5} />
        </Button>
      </Stack>
    );
  } else {
    return (
      <Stack>
        <Heading>Not Found</Heading>
      </Stack>
    );
  }
};

export default UserTile;

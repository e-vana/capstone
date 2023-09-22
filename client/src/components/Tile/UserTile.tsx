import { Heading, Stack } from "@chakra-ui/react";
import { QRCodeSVG } from "qrcode.react";
import { useAppSelector } from "../../app/hooks";

const UserTile = () => {
  const { user } = useAppSelector((state) => state.user);

  if (user != undefined) {
    return (
      <Stack>
        <QRCodeSVG value={user?.first_name} size={200} />
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

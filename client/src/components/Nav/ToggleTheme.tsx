import {
  Tooltip,
  IconButton,
  Icon,
  useColorModeValue,
  useColorMode,
  IconButtonProps,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { HiMoon, HiSun } from "react-icons/hi2";

const ToggleTheme: FunctionComponent<IconButtonProps> = ({ ...rest }) => {
  const { toggleColorMode } = useColorMode();

  return (
    <Tooltip label="toggle theme">
      <IconButton
        icon={<Icon as={useColorModeValue(HiMoon, HiSun)} boxSize={5} />}
        colorScheme="purple"
        variant={"ghost"}
        cursor={"pointer"}
        onClick={toggleColorMode}
        {...rest}
      />
    </Tooltip>
  );
};

export default ToggleTheme;

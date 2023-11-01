import {
  Stack,
  FormLabel,
  FormControl,
  HStack,
  Switch,
  useColorMode,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";

const GeneralSettings = () => {
  const { setColorMode, colorMode } = useColorMode();

  return (
    <>
      <Helmet title="Settings" />
      <Stack flex={1}>
        <FormControl>
          <HStack align={"flex-center"} height={"100%"} p={5}>
            <Switch
              size={"lg"}
              colorScheme="purple"
              isChecked={colorMode === "dark" ? true : false}
              onChange={
                colorMode === "dark"
                  ? () => setColorMode("light")
                  : () => setColorMode("dark")
              }
            />
            <FormLabel>Dark Mode</FormLabel>
          </HStack>
        </FormControl>
      </Stack>
    </>
  );
};

export default GeneralSettings;

import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { StyleFunctionProps } from "@chakra-ui/styled-system";

const styles = {
  global: (props) => ({
    body: {
      bg: mode("#ffffff", "#121212")(props),
    },
  }),
};

const components = {
  Table: {
    defaultProps: {
      colorScheme: "purple",
    },
  },
  Button: {
    defaultProps: {
      rounded: "full",
      colorScheme: "purple",
      size: "sm",
    },
  },
};

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  styles,
  config,
  components,
});
export default theme;

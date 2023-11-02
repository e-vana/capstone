import { Card, useColorModeValue } from "@chakra-ui/react";
import { TitleCardComponent } from "./types";

const TitleCardContainer: TitleCardComponent = ({ children }) => {
  return (
    <Card
      width={"100%"}
      minH={"30%"}
      bg={useColorModeValue("white", "#121212")}
      alignSelf={"start"}
      border={"1px solid"}
      borderColor={"whiteAlpha.300"}
    >
      {children}
    </Card>
  );
};

export default TitleCardContainer;

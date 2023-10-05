import { Card, useColorModeValue } from "@chakra-ui/react";
import { TitleCardComponent } from "./types";

const TitleCardContainer: TitleCardComponent = ({ children }) => {
  return (
    <Card
      width={"100%"}
      minH={"30%"}
      bg={useColorModeValue("white", "#505050")}
      alignSelf={"start"}
    >
      {children}
    </Card>
  );
};

export default TitleCardContainer;

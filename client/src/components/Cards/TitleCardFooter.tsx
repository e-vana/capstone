import { CardFooter, HStack } from "@chakra-ui/react";
import { TitleCardFooterComponent } from "./types";

const TitleCardFooter: TitleCardFooterComponent = ({ children }) => {
  return (
    <CardFooter>
      <HStack width={"100%"} justifyContent={"space-between"}>
        {children}
      </HStack>
    </CardFooter>
  );
};

export default TitleCardFooter;

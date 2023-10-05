import { CardHeader, Skeleton } from "@chakra-ui/react";
import { TitleCardHeaderComponent } from "./types";

const TitleCardHeader: TitleCardHeaderComponent = ({ isLoading, children }) => {
  return (
    <CardHeader
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      gap={3}
    >
      <Skeleton width={"100%"} height={"fit-content"} isLoaded={!isLoading}>
        {children}
      </Skeleton>
    </CardHeader>
  );
};

export default TitleCardHeader;

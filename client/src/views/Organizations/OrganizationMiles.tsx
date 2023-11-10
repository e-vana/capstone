import { Stack, Flex, Heading } from "@chakra-ui/react";
import ExpenseFilter from "../Expenses/ExpenseFilter";
import MilesTable from "../Miles/MilesTable";
import { useContext, useState } from "react";
import OrganizationContext from "./OrganizationContext";
import { useQuery } from "react-query";
import { getMilesForAnOrganization } from "../../api/miles.api";

const OrganizationMiles = () => {
  const { orgData } = useContext(OrganizationContext);
  const [filter, setFilter] = useState<string>("");

  const { data: MileageData } = useQuery(
    ["getOrgMiles"],
    () => getMilesForAnOrganization(orgData?.id!) //eslint-disable-line
  );

  const filteredMiles = MileageData?.miles.filter((mileage) =>
    mileage.organization_name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Stack flex={1} height={"100%"}>
      <Flex display={{ base: "none", md: "flex" }} gap={3} flex={1}>
        <Stack
          width={"100%"}
          overflowY={"auto"}
          height={"fit-content"}
          maxH={"100%"}
        >
          <Heading size={"lg"}>My Activity</Heading>
          <ExpenseFilter filter={filter} setFilter={setFilter} />
          <MilesTable miles={filteredMiles} />
        </Stack>
      </Flex>
    </Stack>
  );
};

export default OrganizationMiles;

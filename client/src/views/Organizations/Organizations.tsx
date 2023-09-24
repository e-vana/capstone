import {
  Stack,
  Heading,
  IconButton,
  useDisclosure,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import AddOrg from "../../components/AddModal/AddOrg";
import { OrganizationsComponent } from "./types";
import { OrganizationTd, OrganizationCard } from "./OrganizationItem";

const Organizations: OrganizationsComponent = ({ organizations }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Stack w={"100%"} p={4} flex={1} height={"fit-content"}>
        <Heading as="h1" size={"lg"} mb={"20px"}>
          My Organizations
        </Heading>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Heading as="h4" size="xs" marginBottom={"5px"}>
            Select an Organization
          </Heading>
          <IconButton
            aria-label="Create new organization"
            icon={<AddIcon />}
            marginLeft={"5px"}
            marginBottom={"6px"}
            size="xs"
            onClick={onOpen}
          />
        </div>
        {organizations && (
          <>
            <TableContainer display={{ base: "none", md: "initial" }}>
              <Table variant={"simple"} width={"100%"}>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Options</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {organizations.map((org) => (
                    <>
                      <OrganizationTd organization={org} key={org.id} />
                    </>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <Stack display={{ base: "flex", md: "none" }} gap={5}>
              {organizations.map((org) => (
                <OrganizationCard organization={org} key={org.id} />
              ))}
            </Stack>
          </>
        )}
      </Stack>
      <AddOrg isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Organizations;

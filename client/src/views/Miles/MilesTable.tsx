import {
  Table,
  Text,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { MilesTableComponent } from "./types";
import MilesTableRow from "./MilesTableRow";

const MilesTable: MilesTableComponent = ({ miles }) => {
  return (
    <>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Organization</Th>
              <Th>Miles</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {miles ? (
              miles.map((mileage, index) => (
                <MilesTableRow miles={mileage} key={index} />
              ))
            ) : (
              <Text>No Miles Uploaded Yet!</Text>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MilesTable;

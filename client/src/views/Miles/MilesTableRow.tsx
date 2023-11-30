import { Td, Tr } from "@chakra-ui/react";
import { MilesTableRowComponent } from "./types";
import { formatSQLDate } from "../../hooks/formatDate";

const MilesTableRow: MilesTableRowComponent = ({ miles }) => {
  const formattedDate = formatSQLDate(new Date(miles.date_traveled));
  return (
    <>
      <Tr>
        <Td>{miles.organization_name}</Td>
        <Td>{miles.mileage}</Td>
        <Td>{formattedDate}</Td>
      </Tr>
    </>
  );
};

export default MilesTableRow;

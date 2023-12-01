import { atcb_action } from "add-to-calendar-button";
import { Button } from "@chakra-ui/react";


const AddToCalendar = function ({ name, description, location, startTime, endTime, startDate, endDate }:
  { name: string, description: string, location: string, startTime: string,
    endTime: string, startDate: string, endDate: string }) {
  
  const config = {
    name: name,
    description: description,
    location: location,
    startDate: startDate,
    endDate: endDate,
    startTime: startTime,
    endTime: endTime,
    options: ["Google|", "iCal|", "Apple|"],
  };

  const handleClick = () => { atcb_action(config) };
  return (
    <Button
      variant="solid"
      bgColor='#FAF5FF'
      size={"sm"}
      fontSize='11px'
      fontWeight='bold'
      onClick={handleClick}>
      Add to Calendar
    </Button>
  );
}

export default AddToCalendar;

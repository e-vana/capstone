import { atcb_action } from "add-to-calendar-button";
import {Button} from "@chakra-ui/react";


const AddToCalendar = function({name, description,location, startTime, endTime, startDate, endDate}){

  //  const formatdate =(date: Date)=> format(date, "yyy-mm-dd");
   
   
  //  const new_endDate: string = formatdate(endDate);



    const config = {
        name: name,
        description: description,
        location: location,
        startDate:startDate,
        endDate:endDate,
        startTime: startTime,
        endTime: endTime,
        options: ["Google|", "iCal|", "Apple|","Yahoo|"],
       
      };
    
                
       const handleClick = ()=> {
        
        console.log(name);
        console.log(startDate);
        console.log(endDate);
        console.log({endTime});
        console.log("yes clicked");
        atcb_action(config)

     }
    return(
        <Button
        variant="solid"
        size={"xs"}
        onClick={handleClick}> 
        Add to Calendar        
        </Button>
    );
}

export default AddToCalendar;
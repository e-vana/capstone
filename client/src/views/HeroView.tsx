import {
  Button,
  Flex,
  Heading,
  Highlight,
  Img,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Image,
  Box
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import organization from "/Users/johncrabtree/Documents/capstone/capstone/client/src/views/images/organization.png";
import tasks from "/Users/johncrabtree/Documents/capstone/capstone/client/src/views/images/tasks.png";
import events from "/Users/johncrabtree/Documents/capstone/capstone/client/src/views/images/events.png";
import qrcode from "/Users/johncrabtree/Documents/capstone/capstone/client/src/views/images/qrcode.png";
import expense from "/Users/johncrabtree/Documents/capstone/capstone/client/src/views/images/expense.png";


const HeroView = () => {

  function scrollToImage () {
    const imageRef = document.getElementById('Organize');
      if (imageRef) {
        window.scrollTo({
          top: imageRef.offsetWidth,
          behavior: "smooth",
        });
      }
  };

  return (
    <>
      <Stack
        minH={"calc(100vh - 60px)"}
        direction={{ base: "column-reverse", md: "row" }}
      >
        <Flex p={8} flex={0.5} align={"center"} justify={"center"}>
          <Stack spacing={6} w={"full"} maxW={"lg"}>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: useBreakpointValue({ base: "20%", md: "30%" }),
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "purple.400",
                  zIndex: -1,
                }}
                color={useColorModeValue("#303030", "whiteAlpha.800")}
              >
                Human Resources
              </Text>
              <br />{" "}
              <Text color={"purple.400"} as={"span"}>
                For Non-Profits
              </Text>{" "}
            </Heading>
            <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
              <Highlight
                query={"Larbster.io"}
                styles={{
                  color: "purple.400",
                }}
              >
                VillageHours streamlines and empowers non-profits to effectively
                manage their workforce, optimize productivity, and enhance their
                mission-driven initiatives.
              </Highlight>
            </Text>
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Button
                as={RouterLink}
                rounded={"full"}
                bg={"purple.400"}
                color={"white"}
                _hover={{
                  bg: "purple.500",
                }}
                to={"/register"}
              >
                Register Today
              </Button>
              <Button as={RouterLink} to={"/login"} rounded={"full"}>
                Login
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex
          flex={1}
          flexDir={"column"}
          bgImg={
            "https://images.unsplash.com/photo-1674076342825-f7e201dd8c8f?auto=format&fit=crop&q=80&w=2400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          bgSize={"cover"}
          bgPos={"center"}
          justify={"center"}
          backdropFilter={"auto"}
          backdropInvert={useColorModeValue("80%", "0%")}
          gap={3}
        >
          <Img
            src={useColorModeValue(
              "/villagehoursbrand.png",
              "/villagehoursbranddark.png"
            )}
            height={"fit-content"}
            alignSelf={"center"}
            width={{ base: "200px", md: "350px" }}
          />
          <Text
            color={useColorModeValue("gray.600", "gray.600")}
            alignSelf={"center"}
            fontSize={"xs"}
          >
            Uniting Hearts, Building Communities
          </Text>
        </Flex>
      </Stack>
      
<Box >
    
        
      <Flex flex={0} flexDir={"row"} alignItems={{ base: "center", md: "center"}} justifyContent={{base: "center", md: "center"}} zIndex={1}>
        <Stack direction={{base:"row", md:"row"}} spacing={0}>
          <Button display={{ base: 'none', md: 'inline-block' }} onClick={ scrollToImage } position={"absolute"} top={750}>Learn More</Button>
        </Stack>
      </Flex>

{/* organizations */}
      <Flex padding={20} flex={1} flexDir={"row"} justify={"center"}  maxHeight={{base: "600", md: "500"}}>
      <Stack minH={"calc(100vh - 60px)"}
        direction={{ base: "column-reverse", md: "row" }}  >
          <Box paddingTop={{base: "10", md: "0"}} paddingBottom={{base: "10", md: "0"}} width="100%">
              <Image height="425" width="auto" objectFit="cover" paddingLeft={{base: "0", md:"0"}} id="Organize"  src={organization} alt="" />
            </Box>
        <Text  textAlign="center" fontSize={{ base: "3xl", lg: "3xl" }} color={"gray.500"} fontWeight={"bold"}>
          <br />
          <br />
          <br />
              <Highlight
                query={"Larbster.io"}
                styles={{
                  color: "purple.400",
                  fontSize: "50",
                }}
              >
                Keep track of your organizations through one seemless productivity solution.         
              </Highlight>
            </Text>
      </Stack>
      </Flex>

      {/* events */}
      <Flex padding={20} flex={1} flexDir={"row"} justify={"center"}  maxHeight={{base: "600", md: "500"}}>
      <Stack minH={"calc(100vh - 60px)"}
        direction={{ base: "column-reverse", md: "row-reverse" }}  >
          <Box paddingTop={{base: "10", md: "0"}} paddingBottom={{base: "10", md: "0"}} width="100%">
              <Image height="425" width="auto" objectFit="cover" paddingLeft={{base: "0", md:"0"}} id="Organize"  src={events} alt="" />
            </Box>
        <Text textAlign="center" fontSize={{ base: "3xl", lg: "3xl" }} color={"gray.500"} fontWeight={"bold"}>
          <br />
          <br />
          <br />
              <Highlight
                query={"Larbster.io"}
                styles={{
                  color: "purple.400",
                  fontSize: "50",
                }}
              >
                Create and manage your organization's events with ease.         
              </Highlight>
            </Text>
      </Stack>
      </Flex>
      
{/* event tasks */}
      <Flex padding={20} flex={1} flexDir={"row"} justify={"center"}  maxHeight={{base: "600", md: "500"}}>
      <Stack minH={"calc(100vh - 60px)"}
        direction={{ base: "column-reverse", md: "row" }}  >
          <Box paddingTop={{base: "10", md: "0"}} paddingBottom={{base: "10", md: "0"}} width="100%">
        <Image height="425" width="auto" objectFit="cover" paddingLeft={{base: "0", md:"0"}} src={tasks} alt="" />
        </Box>
        <Text textAlign="center" fontSize={{ base: "3xl", lg: "3xl" }} color={"gray.500"} fontWeight={"bold"}>
          <br />
          <br />
          <br />
              <Highlight
                query={"Larbster.io"}
                styles={{
                  color: "purple.400",
                  fontSize: "50",
                }}
              >
                Optomize effiency by organizing event tasks.          
              </Highlight>
            </Text>
      </Stack>
      </Flex>
{/* expense tracking */}
      <Flex padding={20} flex={1} flexDir={"row"} justify={"center"}  maxHeight={{base: "600", md: "500"}}>
      <Stack minH={"calc(100vh - 60px)"}
        direction={{ base: "column-reverse", md: "row-reverse" }}  >

          <Box paddingTop={{base: "10", md: "0"}} paddingBottom={{base: "10", md: "0"}} width="100%"> 
          <Image height="425" width="auto" objectFit="cover" paddingRight={{base: "0", md:"0"}}  src={expense} alt="" />
          </Box>

        <Text textAlign="center" fontSize={{ base: "3xl", lg: "3xl" }} color={"gray.500"} fontWeight={"bold"}>
          <br />
          <br />
          <br />
              <Highlight
                query={"Larbster.io"}
                styles={{
                  color: "purple.400",
                  fontSize: "50",
                }}
              >
              Never lose a tax break again with detailed expense tracking.     
              </Highlight>
            </Text>
      </Stack>
      </Flex>
{/*log hours */}
      <Flex padding={20} flex={1} flexDir={"row"} justify={"center"}  maxHeight={{base: "600", md: "500"}}>
      <Stack minH={"calc(100vh - 60px)"}
        direction={{ base: "column-reverse", md: "row" }}  >
          <Box paddingTop={{base: "10", md: "0"}} paddingBottom={{base: "10", md: "0"}} width="100%">
          <Image height="425" width="auto" objectFit="cover" paddingLeft={{base: "0", md:"0"}}  src={qrcode} alt="" />
        </Box>
        <Text textAlign="center" fontSize={{ base: "3xl", lg: "3xl" }} color={"gray.500"} fontWeight={"bold"}>
          <br />
          <br />
          <br />
              <Highlight
                query={"Larbster.io"}
                styles={{
                  color: "purple.400",
                  fontSize: "50",
                }}
              >
                Manage your organization while empowering volunteers to self log hours.        
              </Highlight>
            </Text>
      </Stack>
      </Flex>


      <Flex margin={150} maxHeight="10" flex={0} flexDir={"row"} justify={"center"} zIndex={1}>
        <Stack direction={{base:"column", md:"column"}} spacing={1}>
          <Button as={RouterLink} to={"./ContactUs"} position={"relative"}>Contact Us</Button>
        </Stack>
      </Flex>
  
      </Box>
      
      
    

     
    </>
  );
};

export default HeroView;

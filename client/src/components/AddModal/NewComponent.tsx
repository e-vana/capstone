import { Button } from "@chakra-ui/react";
import { useAppSelector } from "../../app/hooks";

const NewComponent = () => {
  const { user } = useAppSelector((state) => state.user);

  return <Button onClick={() => alert(user?.email)}>Click Me</Button>;
};

export default NewComponent;

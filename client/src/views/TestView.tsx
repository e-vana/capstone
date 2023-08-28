import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  Heading,
  Stack,
  HStack,
  Button,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { increment, decrement, addByAmount } from "../features/counterReducer";

const TestView = () => {
  const count = useAppSelector((state) => state.counterReducer.value);
  const dispatch = useAppDispatch();
  const [amt, setAmt] = useState<number>(0);

  return (
    <Stack align={"center"}>
      <Heading>Count: {count}</Heading>
      <HStack>
        <Button onClick={() => dispatch(increment())}>Add +</Button>
        <Button onClick={() => dispatch(decrement())}>Subtract -</Button>
      </HStack>
      <HStack>
        <FormLabel>Add by amount</FormLabel>
        <Input
          type="number"
          value={amt}
          onChange={(e) => setAmt(+e.currentTarget.value)} // ts '+' turns string to number
        />
        <Button onClick={() => dispatch(addByAmount(amt))}>+</Button>
      </HStack>
    </Stack>
  );
};

export default TestView;

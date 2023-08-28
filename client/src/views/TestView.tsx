import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { increment, decrement, addByAmount } from "../features/counterReducer";

const TestView = () => {
  const count = useAppSelector((state) => state.counterReducer.value);
  const dispatch = useAppDispatch();
  const [amt, setAmt] = useState<number>(0);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addByAmount(amt));
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <div
        style={{
          display: "flex",
        }}
      >
        <button onClick={() => dispatch(increment())}>Add +</button>
        <button onClick={() => dispatch(decrement())}>Subtract -</button>
      </div>
      <div>
        <form onSubmit={handleFormSubmit}>
          <label>Add by amount</label>
          <input
            type="number"
            value={amt}
            onChange={(e) => setAmt(+e.currentTarget.value)} // ts '+' turns string to number
          />
          <button type="submit">+</button>
        </form>
      </div>
    </div>
  );
};

export default TestView;

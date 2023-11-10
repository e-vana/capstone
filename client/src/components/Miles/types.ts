import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { iCreateMiles } from "../../interfaces/miles.interface";

interface AddMileageProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MileageFormProps {
  mileage: iCreateMiles;
  setMileage: Dispatch<SetStateAction<iCreateMiles>>;
}

export type AddMileageComponent = FunctionComponent<AddMileageProps>;
export type MileageFormComponent = FunctionComponent<MileageFormProps>;

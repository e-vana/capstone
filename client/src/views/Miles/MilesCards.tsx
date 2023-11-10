import MilesCard from "./MilesCard";
import { MilesCardsComponent } from "./types";

const MilesCards: MilesCardsComponent = ({ miles }) => {
  return miles?.map((mileage) => <MilesCard mileage={mileage} />);
};

export default MilesCards;

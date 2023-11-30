import { MayHaveLabel } from "@nivo/pie";
import { FunctionComponent } from "react";

interface PieChartProps {
  convertedData: MayHaveLabel[];
  valueFormat?: string;
}

export type PieChartComponent = FunctionComponent<PieChartProps>;

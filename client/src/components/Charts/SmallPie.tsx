import { useColorModeValue } from "@chakra-ui/react";
import { ResponsivePie } from "@nivo/pie";
import { Theme } from "@nivo/core";
import { PieChartComponent } from "./types";

const SmallPie: PieChartComponent = ({ convertedData, valueFormat }) => {
  const COLORS = ["#9F7AEA", "#ED64A6", "#38B2AC"];
  const textColor = useColorModeValue("#303030", "#ffffff");
  const bgColor = useColorModeValue("#ffffff", "#303030");
  const theme: Theme = {
    tooltip: {
      container: {
        backgroundColor: bgColor,
      },
    },
    labels: {
      text: {
        fontSize: 13,
      },
    },
  };

  return (
    <ResponsivePie
      data={convertedData}
      margin={{ top: 0, right: 0, bottom: 60, left: 0 }}
      colors={COLORS}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      arcLabelsTextColor={textColor}
      arcLinkLabelsColor={textColor}
      valueFormat={valueFormat}
      motionConfig={"gentle"}
      activeOuterRadiusOffset={8}
      theme={theme}
    />
  );
};

export default SmallPie;

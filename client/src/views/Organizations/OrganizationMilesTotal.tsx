import { Card, CardBody, Skeleton, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getOrgMileageBreakdown } from "../../api/miles.api";
import { useParams } from "react-router-dom";
import MilesTotal from "../Miles/MilesTotal";
import SmallPie from "../../components/Charts/SmallPie";
import { TitleCardContainer } from "../../components/Cards";

const OrganizationMilesTotal = () => {
  const { organizationId } = useParams();
  const {
    data: MileageBreakdown,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["getOrgMileageBreakdown"],
    queryFn: () => getOrgMileageBreakdown(+organizationId!), //eslint-disable-line,
  });

  const convertedData = MileageBreakdown?.mileage_breakdown.map((mileage) => ({
    id: mileage.user_name,
    label: mileage.user_name,
    value: parseFloat(mileage.total_mileage),
  }));

  console.log(MileageBreakdown);

  return (
    <Skeleton isLoaded={!isLoading}>
      {isSuccess && convertedData ? (
        <TitleCardContainer>
          <CardBody>
            <MilesTotal height={150}>
              {convertedData && <SmallPie convertedData={convertedData} />}
            </MilesTotal>
          </CardBody>
        </TitleCardContainer>
      ) : (
        <Text>No Data Available</Text>
      )}
    </Skeleton>
  );
};

export default OrganizationMilesTotal;

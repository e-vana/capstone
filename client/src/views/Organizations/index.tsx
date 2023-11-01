import { FunctionComponent } from "react";
import { useQuery } from "react-query";
import { getOrganizations } from "../../api/organizations.api";
import ErrorMessage from "../../components/Error";
import { LoadingComponent } from "../../components/Loading";
import Organizations from "./Organizations";
import { useAppDispatch } from "../../app/hooks";
import { setOrgs } from "../../features/Organizations/organizationSlice";

const OrganizationView: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  
  const {
    data: orgData,
    isLoading: orgIsLoading,
    isError: orgIsError,
  } = useQuery({
    queryKey: ["getOrganizations"],
    queryFn: getOrganizations,
  });

  const renderState = {
    loading: <LoadingComponent />,
    error: (
      <ErrorMessage
        code={404}
        message="There's been an error locating your organizations. Please try again."
        flex={1}
      />
    ),
    //eslint-disable-next-line
    success: <Organizations organizations={orgData?.organizations!} />,
  };

  if (orgIsLoading) return renderState.loading;
  else if (orgIsError) return renderState.error;
  else if (orgData?.organizations) {
    dispatch(setOrgs(orgData.organizations));
    return renderState.success;
  } 
};

export default OrganizationView;

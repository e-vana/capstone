import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import {
  ColorModeScript,
  Stack,
  Box,
  theme,
  useColorModeValue,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import HomeView from "./views/HomeView";
import TestView from "./views/TestView";
import { store } from "./app/store";
import Login from "./views/Auth/login";
import Register from "./views/Auth/register";
import { LandingNav } from "./components/Nav/landingNav";
import HeroView from "./views/HeroView";
import DashNav from "./components/Nav/DashNav";
import ToolBar from "./components/Nav/ToolBar";
import AuthGuard from "./components/RouteGuard/AuthGuard";
import { ErrorPage } from "./components/Error";
import OrganizationPage from "./views/Organizations/OrganizationPage";
import EventPage from "./views/Events/EventPage";
import JoinPage from "./views/Join/JoinPage";
import TeamPage from "./views/Teams/TeamPage";
import ExpenseView from "./views/Expenses/ExpenseView";
import SettingsPage from "./views/Settings/SettingsPage";
import OrganizationView from "./views/Organizations";
import EventsView from "./views/Events";
import ContactUs from "./views/ContactUs";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const LandingNavOutlet = () => {
  return (
    <>
      <Helmet
        defaultTitle={import.meta.env.VITE_APP_NAME}
        titleTemplate={"%s | " + import.meta.env.VITE_APP_NAME}
      />
      <Stack
        position={"relative"}
        minH={"100vh"}
        flex={1}
        spacing={0}
        bg={useColorModeValue("#ffffff", "#101010")}
      >
        <LandingNav />
        <Outlet />
      </Stack>
    </>
  );
};

const DashNavOutlet = () => {
  return (
    <>
      <Helmet
        defaultTitle={import.meta.env.VITE_APP_NAME}
        titleTemplate={"%s | " + import.meta.env.VITE_APP_NAME}
      />
      <Box
        display={"flex"}
        flexDir={"column"}
        position={"relative"}
        height={"100vh"}
        bg={useColorModeValue("#ffffff", "#121212")}
      >
        <AuthGuard>
          <DashNav>
            <Outlet />
            <ToolBar
              display={{ base: "flex", md: "none" }}
              borderTop={"1px solid"}
              position={"sticky"}
              bottom={0}
              left={0}
            />
          </DashNav>
        </AuthGuard>
      </Box>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingNavOutlet />,
    children: [
      {
        path: "/",
        element: <HeroView />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/ContactUs",
        element: <ContactUs />,
      },
    ],

    errorElement: <ErrorPage code={404} message="Page Not Found" />,
  },
  {
    path: "/d",
    element: <DashNavOutlet />,
    children: [
      {
        path: "/d",
        element: <HomeView />,
      },
      {
        path: "/d/test",
        element: <TestView />,
      },
      {
        path: "/d/qr",
        element: <Stack flex={1}></Stack>,
      },
      {
        path: "/d/user",
        element: <Stack flex={1}></Stack>,
      },
      {
        path: "/d/settings",
        element: <SettingsPage />,
      },
      {
        path: "/d/organizations",
        element: <OrganizationView />,
      },
      {
        path: "/d/events",
        element: <EventsView />,
      },
      {
        path: "/d/:organizationId",
        element: <OrganizationPage />,
      },
      {
        path: "/d/:organizationId/:eventId",
        element: <EventPage />,
      },
      {
        path: "/d/:organizationId/teams/:teamId",
        element: <TeamPage />,
      },
      {
        path: "/d/expenses",
        element: <ExpenseView />,
      },
    ],
  },
  {
    path: "/join",
    element: <LandingNavOutlet />,
    children: [
      {
        path: "/join/:joinId",
        element: <JoinPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* On production, don't render react-query-devtools */}
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;

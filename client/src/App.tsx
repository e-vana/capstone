import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import {
  ChakraProvider,
  ColorModeScript,
  Stack,
  theme,
  useColorModeValue,
} from "@chakra-ui/react";
import HomeView from "./views/HomeView";
import TestView from "./views/TestView";
import { store } from "./app/store";
import Login from "./views/Auth/login";
import Register from "./views/Auth/register";
import { LandingNav } from "./components/Nav/landingNav";
import HeroView from "./views/HeroView";
import { DashNav } from "./components/Nav/DashNav";
import ToolBar from "./components/Nav/ToolBar";
import SettingsView from "./views/SettingsView";
import AuthGuard from "./components/RouteGuard/AuthGuard";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const LandingNavOutlet = () => {
  return (
    <Stack
      position={"relative"}
      minH={"100vh"}
      flex={1}
      spacing={0}
      bg={useColorModeValue("#ffffff", "#303030")}
    >
      <LandingNav />
      <Outlet />
    </Stack>
  );
};

const DashNavOutlet = () => {
  return (
    <Stack
      position={"relative"}
      height={"100vh"}
      minH={"100vh"}
      flex={1}
      spacing={0}
      bg={useColorModeValue("#ffffff", "#303030")}
    >
      <AuthGuard>
        <DashNav />
        <Outlet />
        <ToolBar />
      </AuthGuard>
    </Stack>
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
    ],
  },
  {
    path: "/home",
    element: <DashNavOutlet />,
    children: [
      {
        path: "/home",
        element: <HomeView />,
      },
      {
        path: "/home/test",
        element: <TestView />,
      },
      {
        path: "/home/qr",
        element: <Stack flex={1}></Stack>,
      },
      {
        path: "/home/user",
        element: <Stack flex={1}></Stack>,
      },
      {
        path: "/home/settings",
        element: <SettingsView />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider
          toastOptions={{
            defaultOptions: { position: "top-right", isClosable: true },
          }}
          theme={theme}
        >
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;

import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import HomeView from "./views/HomeView";
import TestView from "./views/TestView";
import { store } from "./app/store";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
  },
  {
    path: "/test",
    element: <TestView />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ChakraProvider
          toastOptions={{
            defaultOptions: { position: "bottom-right", isClosable: true },
          }}
        >
          <RouterProvider router={router} />
        </ChakraProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;

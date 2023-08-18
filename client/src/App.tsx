import { QueryClient, QueryClientProvider } from "react-query";
import HomeView from "./views/HomeView";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <HomeView></HomeView>
      </>
    </QueryClientProvider>
  );
}

export default App;

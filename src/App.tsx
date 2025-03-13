import { RouterProvider } from "react-router-dom";
import { Container } from "./components/Layout/Container";
import { router } from "./routes/router";
import { StackProvider } from "@teamsparta/stack-core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <Container>
      <StackProvider theme="sccLight">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </StackProvider>
    </Container>
  );
}

export default App;

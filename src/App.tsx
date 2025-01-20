import { RouterProvider } from "react-router-dom";
import { Container } from "./components/Layout/Container";
import { router } from "./routes/router";
import { StackProvider } from "@teamsparta/stack-core";

function App() {
  return (
    <Container>
      <StackProvider theme="sccLight">
        <RouterProvider router={router} />
      </StackProvider>
    </Container>
  );
}

export default App;

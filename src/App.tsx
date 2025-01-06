import { RouterProvider } from "react-router-dom";
import { Container } from "./components/Layout/Container";
import { router } from "./routes/router";

function App() {
  return (
    <Container>
      <RouterProvider router={router} />
    </Container>
  );
}

export default App;

import { type ReactElement } from "react";
import { Container } from "@mui/material";
import MainPage from "./pages/main/MainPage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";

function App(): ReactElement {
  return (
    <Container maxWidth="xl">
      <LoginPage></LoginPage>
    </Container>
  );
}

export default App;

import { RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { routes } from "./routes";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#8800ff",
      },
      secondary: {
        main: "#f44336",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={routes} />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;

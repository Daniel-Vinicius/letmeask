import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Routes from "./routes";

import { AppProvider } from "./contexts";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
        <ToastContainer autoClose={5000} />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;

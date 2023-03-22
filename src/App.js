import { ThemeProvider } from "@material-ui/core";
import React from "react";
import TagManager from "react-gtm-module";
import { hot } from "react-hot-loader/root";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { ReportBtnDialog } from "./components/Dialog/ReportBtnDialog";
import { ConfirmationDialogProvider } from "./contexts/ConfirmContext";
import { AuthDialog } from "./features/authentication/dialogs/AuthDialog";
import { NavigationContextProvider } from "./features/navigation/contexts/NavigationContext";
import OrderPreviewDialog from "./features/subscription/pricing/dialogs/OrderPreviewDialog";
import Routes from "./routes";
import { persistor, store } from "./store";
import theme from "./theme";

const tagManagerArgs = {
  gtmId: "GTM-P5FNZW5",
};
TagManager.initialize(tagManagerArgs);

function App() {
  window.dataLayer.push({
    event: "pageview",
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <ConfirmationDialogProvider>
            <NavigationContextProvider>
              <BrowserRouter>
                <Routes />
              </BrowserRouter>
            </NavigationContextProvider>
            <AuthDialog />

            <ToastContainer
              theme="dark"
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <ReportBtnDialog />
          </ConfirmationDialogProvider>
          <OrderPreviewDialog />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default hot(App);

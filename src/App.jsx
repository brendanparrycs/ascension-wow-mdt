import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import Page from "./components/Page";
import ToasterConfig from "./components/Modals/ToasterConfig";
import ErrorBoundary from "./components/Common/ErrorBoundary";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary>
          <ToasterConfig />
          <Page />
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
}

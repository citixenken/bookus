import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { AuthContextProvider } from "./context/AuthContext";
import { BookContextProvider } from "./context/BookContext";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";

// process.env.NODE_ENV === "production" &&

Sentry.init({
  dsn: "https://80a5923822054a9cb31b4ff0227f4e17@o4504670560780288.ingest.sentry.io/4504670567071744",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.5,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <BookContextProvider>
      <Router>
        <App />
      </Router>
    </BookContextProvider>
  </AuthContextProvider>
);

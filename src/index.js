// import pages
import * as Sentry from "@sentry/browser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

if (window.SENTRY_ENABLED) {
  Sentry.init({
    dsn: window.SENTRY_DSN,
    release: window.COMMIT_SHA,
    environment: window.SENTRY_ENV,
  });
}

ReactDOM.render(<App />, document.getElementById("root"));

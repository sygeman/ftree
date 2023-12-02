import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { App } from "./app.tsx";
import "@mantine/core/styles.css";
import "reactflow/dist/style.css";
import "./index.css";
import { ReactFlowProvider } from "reactflow";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <ReactFlowProvider>
        <App />
      </ReactFlowProvider>
    </MantineProvider>
  </React.StrictMode>
);

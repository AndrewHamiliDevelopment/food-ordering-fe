import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Appp from './Appp'

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found!");

createRoot(rootElement).render(
  <StrictMode>
    <Appp />
  </StrictMode>
);

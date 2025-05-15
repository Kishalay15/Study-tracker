import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import StudyTracker from "./StudyTracker";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StudyTracker />
  </StrictMode>
);

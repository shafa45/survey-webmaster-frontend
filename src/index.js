import React from "react";
import { createRoot } from "react-dom/client";
// import SurveyComponent from "./SurveyComponent";
import App from "./App";

const root = createRoot(document.getElementById("surveyElement"));
root.render(<App />);
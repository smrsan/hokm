import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Game from "./Game.jsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";

import "./misc/disableZooming.js";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Game />
    </StrictMode>
);
